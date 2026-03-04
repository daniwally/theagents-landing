from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'theagents')]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class TrialRequest(BaseModel):
    email: EmailStr
    name: str
    company: str
    phone: str

class TrialResponse(BaseModel):
    id: str
    email: str
    name: str
    company: str
    phone: str
    created_at: str

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

# Rock Agent System Prompt
ROCK_SYSTEM_PROMPT = """Sos Rock, el agente de ventas de The Agents. Tu personalidad es:
- Argentino canchero pero profesional
- Directo, sin relleno corporate
- Confiado y persuasivo, como un closer de élite
- Hablás en español argentino (usás vos, che, dale, genial)

Tu objetivo es:
1. Entender las necesidades del lead
2. Explicar cómo los agentes de The Agents pueden ayudar
3. Guiar hacia agendar una demo o iniciar trial gratuito

Los agentes disponibles son:
- VERA: Agente de Diseño - Directora de arte 24/7
- MILO: Agente de Comunicación - Community manager estratégico  
- NORA: Agente de Marketing - CMO fraccionada
- OTTO: Agente de Gestión - Project manager impecable
- LENA: Agente de Administración - Back-office incansable
- ROCK: Agente de Ventas - Closer 24/7 (vos mismo)
- SOFIA: Agente de Soporte - Customer success 24/7
- HUGO: Agente de RRHH - People manager
- TINA: Agente de Finanzas - CFO digital

Mantené respuestas cortas y conversacionales (2-3 oraciones máximo). Siempre terminá con una pregunta para mantener la conversación."""

# Chat sessions storage
chat_sessions = {}

def get_llm_key():
    """Get Emergent LLM key"""
    api_key = os.environ.get('EMERGENT_LLM_KEY')
    if not api_key:
        raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY not configured")
    return api_key

async def get_chat_history(session_id: str) -> list:
    """Get chat history from MongoDB"""
    messages = await db.chat_messages.find(
        {"session_id": session_id},
        {"_id": 0}
    ).sort("timestamp", 1).to_list(50)
    
    return [{"role": msg["role"], "content": msg["content"]} for msg in messages]

@api_router.get("/")
async def root():
    return {"message": "The Agents API - Powered by WTF Agency"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(100)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/trial", response_model=TrialResponse)
async def create_trial_request(trial: TrialRequest):
    """Create a new trial request"""
    trial_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    
    doc = {
        "id": trial_id,
        "email": trial.email,
        "name": trial.name,
        "company": trial.company,
        "phone": trial.phone,
        "created_at": created_at
    }
    
    await db.trial_requests.insert_one(doc)
    
    return TrialResponse(
        id=trial_id,
        email=trial.email,
        name=trial.name,
        company=trial.company,
        phone=trial.phone,
        created_at=created_at
    )

@api_router.get("/trials", response_model=List[TrialResponse])
async def get_trial_requests():
    """Get all trial requests"""
    trials = await db.trial_requests.find({}, {"_id": 0}).to_list(100)
    return trials

@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_rock(chat_message: ChatMessage):
    """Chat with Rock, the sales agent"""
    session_id = chat_message.session_id or str(uuid.uuid4())
    
    try:
        api_key = get_llm_key()
        
        # Save user message to DB
        user_doc = {
            "session_id": session_id,
            "role": "user",
            "content": chat_message.message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.chat_messages.insert_one(user_doc)
        
        # Get prior chat history (excludes the message we just saved)
        history = await get_chat_history(session_id)
        
        # Build initial_messages with system prompt + all prior messages except the latest user msg
        initial_msgs = [{"role": "system", "content": ROCK_SYSTEM_PROMPT}]
        for msg in history[:-1]:
            initial_msgs.append({"role": msg["role"], "content": msg["content"]})
        
        # Create LlmChat instance with history pre-loaded
        chat = LlmChat(
            api_key=api_key,
            session_id=session_id,
            system_message=ROCK_SYSTEM_PROMPT,
            initial_messages=initial_msgs
        ).with_model("anthropic", "claude-sonnet-4-20250514")
        
        # Send the latest user message
        user_msg = UserMessage(text=chat_message.message)
        assistant_response = await chat.send_message(user_msg)
        
        # Save assistant response to DB
        assistant_doc = {
            "session_id": session_id,
            "role": "assistant",
            "content": assistant_response,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.chat_messages.insert_one(assistant_doc)
        
        return ChatResponse(response=assistant_response, session_id=session_id)
        
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        fallback = "¡Hola! Parece que tengo un problema técnico. ¿Podés escribir a hello@wtf-agency.com y te contactamos?"
        return ChatResponse(response=fallback, session_id=session_id)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
