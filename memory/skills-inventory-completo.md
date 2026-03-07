# SKILLS INVENTORY COMPLETO - DORA

**Fecha:** 6 marzo 2026  
**Propósito:** Backup completo de skills instalados para evitar pérdida de contexto  
**Backup:** Incluido en cron nocturno  

## 🎯 **SKILLS WORKSPACE LOCAL** (~/.openclaw/workspace/skills/)

### ✅ **SKILLS ACTIVOS Y CONFIGURADOS:**

#### **1. finanzas-wally** 💰
- **Estado:** ✅ COMPLETAMENTE FUNCIONAL
- **Scripts:** check-vencimientos.sh, proceso-gasto.sh, resumen-visual.py, extracto-banco.sh
- **Integración:** Airtable API + Sheets + Telegram
- **Uso:** Sistema completo finanzas Wally

#### **2. gog** 📧
- **Estado:** ✅ CONFIGURADO OAuth
- **Funciones:** Gmail, Calendar, Drive, Contacts, Sheets, Docs
- **Account:** dora@wtf-agency.com
- **Uso:** Gestión completa Google Workspace

#### **3. nano-banana-pro** 🎨
- **Estado:** ✅ FUNCIONAL
- **Función:** Generación/edición de imágenes con Gemini 3 Pro
- **Formatos:** text-to-image + image-to-image, 1K/2K/4K
- **Uso:** Creación visual para WTF Agency

#### **4. openai-image-gen** 🖼️
- **Estado:** ✅ FUNCIONAL 
- **Función:** Batch generación imágenes vía OpenAI API
- **Features:** Random prompt sampler + galería HTML
- **Uso:** Generación masiva imágenes

#### **5. summarize** 📄
- **Estado:** ⚠️ CLI NO ENCONTRADO 
- **Función:** Resúmenes URLs, PDFs, imágenes, audio, YouTube
- **Issue:** Comando `summarize` no disponible
- **Alternativa:** Usar web_fetch + análisis directo

#### **6. nano-pdf** 📋
- **Estado:** ⚠️ REQUIERE INSTALACIÓN
- **Función:** Editar PDFs con instrucciones natural language
- **Comando:** `nano-pdf` no encontrado
- **Instalación:** `uv install nano-pdf`

#### **7. ai-ppt-generator** 📊
- **Estado:** ✅ PRESENTE (sin verificar funcionalidad)
- **Función:** Generación presentaciones automáticas
- **Uso:** Creación PPT/slides para WTF Agency

#### **8. shopify-admin-api** 🛒
- **Estado:** ✅ PRESENTE 
- **Función:** Gestión Shopify Plus (3 tiendas Wally)
- **Configuración:** Pendiente tokens
- **Uso:** Administración e-commerce

#### **9. goplaces** 📍
- **Estado:** ✅ PRESENTE
- **Función:** Google Places API (New) - búsqueda lugares
- **Uso:** Lookup lugares para clientes/proyectos

## 🌐 **SKILLS GLOBALES DISPONIBLES** (~/.npm-global/lib/node_modules/openclaw/skills/)

### ✅ **SKILLS CORE INSTALADOS:**

#### **Productividad & Comunicación:**
- **weather** 🌤️ - Clima actual + pronósticos (wttr.in + Open-Meteo)
- **tmux** 💻 - Control remoto sesiones tmux
- **skill-creator** 🛠️ - Crear/actualizar AgentSkills
- **openai-whisper-api** 🎤 - Transcripción audio vía Whisper
- **video-frames** 🎬 - Extracción frames/clips de videos (ffmpeg)
- **healthcheck** 🔒 - Security hardening y risk assessment

#### **Desarrollo & Tools:**
- **github** / **gh-issues** 💻 - Gestión GitHub
- **coding-agent** 👨‍💻 - Asistente de código
- **canvas** 🎨 - Control node canvases
- **session-logs** 📊 - Manejo logs de sesiones

#### **Comunicación & Social:**
- **discord** 💬 - Integración Discord
- **slack** 💼 - Integración Slack  
- **imsg** 📱 - iMessage (macOS)
- **bluebubbles** 📨 - Gestión mensajes

#### **Media & Content:**
- **sag** 🎵 - ElevenLabs TTS (voice storytelling)
- **spotify-player** 🎶 - Control Spotify
- **sonoscli** 🔊 - Control sistema Sonos
- **gifgrep** 🔍 - Búsqueda GIFs

#### **Productivity Apps:**
- **notion** 📝 - Gestión Notion
- **obsidian** 🧠 - Manejo Obsidian
- **bear-notes** 🐻 - Apple Bear Notes
- **apple-notes** / **apple-reminders** 🍎 - Apps Apple
- **things-mac** ✅ - Things 3 (macOS)
- **trello** 📌 - Gestión Trello

#### **Cloud & Services:**
- **1password** 🔑 - Gestión passwords
- **oracle** ☁️ - Oracle Cloud
- **clawhub** 🌐 - OpenClaw Hub
- **xurl** 🔗 - URL utilities

#### **Smart Home:**
- **openhue** 💡 - Philips Hue
- **camsnap** 📷 - Cámaras
- **eightctl** 🎛️ - Eight Sleep control

### ⚠️ **SKILLS PLATFORM-SPECIFIC** (pueden no funcionar en Linux):
- **mcporter** - Minecraft
- **ordercli** - Orders management
- **peekaboo** - Screen utilities
- **wacli** - WhatsApp CLI
- **voice-call** - Voice calls
- **blucli** - Bluetooth
- **blogwatcher** - Blog monitoring
- **songsee** - Song recognition
- **sherpa-onnx-tts** - TTS alternativo
- **himalaya** - Email client

## 🎯 **SKILLS PRIORITARIOS PARA WALLY:**

### **Tier 1 - Críticos:**
1. **finanzas-wally** - Sistema finanzas completo
2. **gog** - Google Workspace
3. **nano-banana-pro** - Generación imágenes
4. **shopify-admin-api** - E-commerce (pendiente config)

### **Tier 2 - Importantes:**
1. **weather** - Clima
2. **openai-image-gen** - Batch imágenes  
3. **video-frames** - Contenido video
4. **sag** - Voice storytelling
5. **healthcheck** - Security

### **Tier 3 - Útiles:**
1. **summarize** - Resúmenes (fix instalación)
2. **nano-pdf** - Edición PDFs
3. **ai-ppt-generator** - Presentaciones
4. **github** - Desarrollo
5. **tmux** - Sessions management

## 🔧 **PENDIENTES DE CONFIGURACIÓN:**

### **Instalaciones requeridas:**
- [ ] `summarize` CLI (brew install steipete/tap/summarize)
- [ ] `nano-pdf` (uv install nano-pdf)
- [ ] Shopify tokens (3 tiendas)
- [ ] ElevenLabs API key (sag skill)

### **Configuraciones pendientes:**
- [ ] GitHub integration
- [ ] Notion workspace
- [ ] Discord/Slack webhooks
- [ ] Home Assistant deeper integration

## 📦 **BACKUP NOCTURNO:**

**Incluye:**
- Este archivo (`memory/skills-inventory-completo.md`)
- Configuraciones skills (`~/.openclaw/workspace/skills/`)
- Scripts personalizados
- Referencias y documentación

**Ubicación backup:** `~/.openclaw/backups/`
**Frecuencia:** Diario 02:00 AM
**Retención:** 30 días

---

**Última actualización:** 6 marzo 2026, 17:23 UTC  
**Total skills workspace:** 9  
**Total skills globales:** ~52  
**Skills funcionales verificados:** 15+