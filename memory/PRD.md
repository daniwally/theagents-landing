# TheAgents.wtf - PRD

## Problema Original
Landing page para venta de agentes IA especializados para empresas latinoamericanas. Powered by WTF Agency.

## User Personas
- **CEOs y Dueños**: Buscan escalar operaciones sin aumentar headcount
- **Gerentes**: Necesitan automatizar tareas repetitivas de sus equipos
- **Target**: Argentina y Latinoamérica

## Requisitos Core (Estáticos)
- Paleta: Negro #000000 + Blanco #ffffff + Amarillo #FFD700
- Tipografía: Inter (Thin/Bold contrast)
- Estilo: Editorial premium, Vogue + SaaS moderno
- Mobile-first responsive
- Tono argentino canchero pero profesional

## Implementado

### Backend (/app/backend/server.py)
- FastAPI + MongoDB
- POST /api/trial - Captura leads (email, nombre, empresa, teléfono)
- GET /api/trials - Lista leads
- POST /api/chat - Demo con Rock usando Claude Sonnet 4 via emergentintegrations (EMERGENT_LLM_KEY)
- Persistencia de mensajes de chat en MongoDB

### Frontend (/app/frontend/src/)
- Header con navegación sticky + mobile hamburger
- Hero section: "Tu próximo equipo no tiene LinkedIn" + carrusel de imágenes
- Grid de 9 agentes con cards expandibles (Vera, Milo, Nora, Otto, Lena, Rock, Sofia, Hugo, Tina)
- Modales con detalles completos de cada agente
- Sección "Cómo funciona" - 4 pasos
- Pricing con 3 tiers (STARTER, PRO, ENTERPRISE)
- Sección WTF Agency con logos de clientes
- Dream Team section
- Chatbot demo con Rock (Claude Sonnet 4 real)
- Formulario de trial con validación
- Footer con CTAs
- Animaciones y microinteracciones
- Responsive mobile-first

### Integraciones
- Claude Sonnet 4 via emergentintegrations (EMERGENT_LLM_KEY) - FUNCIONANDO
- MongoDB para persistencia de datos

### Deployment
- Configurado para Railway (Procfile, railway.toml, railway.json)
- Dominio personalizado: theagents.wtf (DNS en GoDaddy)

## Backlog Priorizado

### P1 - Alta prioridad
- Integrar link real de Calendly cuando el cliente lo proporcione
- Agregar logos reales de clientes tier-1
- Analytics/tracking de conversión

### P2 - Mejoras
- A/B testing de headlines
- Testimoniales/case studies
- Video demo de los agentes
- Integración con CRM para leads
