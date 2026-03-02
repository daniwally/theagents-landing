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
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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

Los 6 agentes disponibles son:
- VERA: Agente de Diseño - Directora de arte 24/7
- MILO: Agente de Comunicación - Community manager estratégico  
- NORA: Agente de Marketing - CMO fraccionada
- OTTO: Agente de Gestión - Project manager impecable
- LENA: Agente de Administración - Back-office incansable
- ROCK: Agente de Ventas - Closer 24/7 (vos mismo)

Packs disponibles:
- Pack Agencia: Milo + Nora + Otto
- Pack E-commerce: Rock + Lena + Vera
- Pack Profesionales: Otto + Lena
- Pack Full: Los 6 agentes

Mantené respuestas cortas y conversacionales (2-3 oraciones máximo). Siempre terminá con una pregunta para mantener la conversación."""

# Chat sessions storage (in-memory for simplicity, persisted messages in MongoDB)
chat_instances = {}

async def get_or_create_chat(session_id: str) -> LlmChat:
    """Get existing chat or create new one with message history from DB"""
    if session_id not in chat_instances:
        chat = LlmChat(
            api_key=os.environ.get('EMERGENT_LLM_KEY'),
            session_id=session_id,
            system_message=ROCK_SYSTEM_PROMPT
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")
        
        # Load previous messages from DB
        messages = await db.chat_messages.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1).to_list(100)
        
        # Replay messages to rebuild context
        for msg in messages:
            if msg["role"] == "user":
                user_msg = UserMessage(text=msg["content"])
                # We need to add to history without re-calling the API
                chat._messages.append({"role": "user", "content": msg["content"]})
            elif msg["role"] == "assistant":
                chat._messages.append({"role": "assistant", "content": msg["content"]})
        
        chat_instances[session_id] = chat
    
    return chat_instances[session_id]

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

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
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
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
    trials = await db.trial_requests.find({}, {"_id": 0}).to_list(1000)
    return trials

@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_rock(chat_message: ChatMessage):
    """Chat with Rock, the sales agent"""
    session_id = chat_message.session_id or str(uuid.uuid4())
    
    try:
        chat = await get_or_create_chat(session_id)
        
        # Save user message to DB
        user_doc = {
            "session_id": session_id,
            "role": "user",
            "content": chat_message.message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.chat_messages.insert_one(user_doc)
        
        # Get response from Claude
        response = await chat.send_message(UserMessage(text=chat_message.message))
        
        # Save assistant response to DB
        assistant_doc = {
            "session_id": session_id,
            "role": "assistant",
            "content": response,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.chat_messages.insert_one(assistant_doc)
        
        return ChatResponse(response=response, session_id=session_id)
        
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error en el chat: {str(e)}")

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
