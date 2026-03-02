# TheAgents.wtf - PRD

## Problema Original
Landing page para venta de agentes IA especializados para empresas latinoamericanas. Powered by WTF Agency.

## User Personas
- **CEOs y Dueños**: Buscan escalar operaciones sin aumentar headcount
- **Gerentes**: Necesitan automatizar tareas repetitivas de sus equipos
- **Target**: Argentina y Latinoamérica

## Requisitos Core (Estáticos)
- Paleta: Negro #000000 + Blanco #ffffff + Verde #00ff88
- Tipografía: Inter (Thin/Bold contrast)
- Estilo: Editorial premium, Vogue + SaaS moderno
- Mobile-first responsive
- Tono argentino canchero pero profesional

## Implementado (2 Marzo 2025)

### Backend (/app/backend/server.py)
- ✅ FastAPI + MongoDB
- ✅ POST /api/trial - Captura leads (email, nombre, empresa, teléfono)
- ✅ GET /api/trials - Lista leads
- ✅ POST /api/chat - Demo con Rock usando Claude Sonnet 4.5
- ✅ Persistencia de mensajes de chat en MongoDB

### Frontend (/app/frontend/src/)
- ✅ Header con navegación sticky + mobile hamburger
- ✅ Hero section: "Tu próximo equipo no tiene LinkedIn"
- ✅ Grid de 6 agentes con cards expandibles (Vera, Milo, Nora, Otto, Lena, Rock)
- ✅ Modales con detalles completos de cada agente
- ✅ Sección "Cómo funciona" - 4 pasos
- ✅ Packs por industria (Agencia, E-commerce, Profesionales, Full)
- ✅ Chatbot demo con Rock (Claude Sonnet 4.5 real)
- ✅ Formulario de trial con validación
- ✅ Footer con CTAs y logos placeholder
- ✅ Animaciones y microinteracciones
- ✅ Responsive mobile-first

### Integraciones
- ✅ Claude Sonnet 4.5 via emergentintegrations (EMERGENT_LLM_KEY)
- ⏳ Calendly (placeholder link)
- ⏳ Logos de clientes (placeholders)

## Backlog Priorizado

### P0 - Crítico
- Ninguno pendiente

### P1 - Alta prioridad
- Integrar link real de Calendly cuando el cliente lo proporcione
- Agregar logos reales de clientes tier-1
- Analytics/tracking de conversión

### P2 - Mejoras
- A/B testing de headlines
- Testimoniales/case studies
- Video demo de los agentes
- Integración con CRM para leads

## Próximas Acciones
1. Cliente provea link de Calendly real
2. Cliente provea logos de clientes
3. Configurar analytics (Google Analytics, Hotjar)
4. Crear landing pages específicas por industria/pack
