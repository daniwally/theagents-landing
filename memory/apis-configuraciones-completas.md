# APIS & CONFIGURACIONES COMPLETAS - BACKUP TOTAL

**Fecha:** 6 marzo 2026, 17:27 UTC  
**Propósito:** Backup completo de todas las APIs, tokens, configuraciones y skills para recuperación total  
**Criticidad:** MÁXIMA - Nunca eliminar este archivo  

## 🔑 **APIS & TOKENS CONFIGURADOS**

### **AIRTABLE API**
- **Token:** `pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e`
- **Base ID:** `appK3sEL2Z2NLcQnA`
- **Table ID:** `tbl8B9PKPUnYcW4Va`
- **URL Base:** `https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va`
- **Vista Web:** https://airtable.com/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va
- **Uso:** Sistema completo finanzas Wally

### **HOME ASSISTANT**
- **URL:** `https://txvwuijdnbiukjd5gbmsszghyrouz8jq.ui.nabu.casa`
- **Token:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxNWQwNGQwZmE3ZDk0NmI2OTMzNjFjNGY4NTc5MTAwNCIsImlhdCI6MTc3MTEyNTYxMywiZXhwIjoyMDg2NDg1NjEzfQ.UPkfJHpTGRVJgPbDSU-0R3BtaQc1vUMz6slIFne8Z4E`
- **Instance:** We Rock House (HA Green, 2026.2.2, Nabu Casa)
- **Validez token:** 10 años (hasta 2036)
- **Entidades:** 442 total, 57 luces, 17 switches, 111 sensores
- **Script:** `luces on|off` para control luces interior

### **GOOGLE WORKSPACE (GOG)**
- **Account:** `dora@wtf-agency.com`
- **Auth:** OAuth configurado
- **Servicios:** gmail,calendar,drive,contacts,sheets,docs
- **Configurado:** 2026-02-15T02:37:27Z
- **Status:** ✅ ACTIVO
- **Uso:** Email, calendario, sheets backup, documentos

### **OPENAI API**
- **Skills:** openai-image-gen, nano-banana-pro (indirecto), openai-whisper-api
- **Configurado:** ✅ Funcional
- **Uso:** Generación imágenes, TTS, transcripción

### **GOOGLE PLACES API**
- **Skill:** goplaces  
- **Estado:** ✅ Instalado
- **Uso:** Búsqueda lugares para clientes

### **BRAVE SEARCH API**
- **Configurado:** OpenClaw default
- **Key:** BSA95cyMspqn2Sb_WSNvEI5_Bxx-iW5
- **Uso:** web_search tool

## 🛠️ **SKILLS CRÍTICOS CONFIGURADOS**

### **1. FINANZAS-WALLY** 💰
**Ubicación:** `~/.openclaw/workspace/skills/finanzas-wally/`

#### **Scripts Principales:**
```bash
# Verificar vencimientos  
./scripts/check-vencimientos-final.sh

# Agregar gasto
./scripts/add-gasto-airtable.sh "Nombre" "Fecha_Recib" "Fecha_Venc" "Monto" "Banco" "Concepto" "Status"

# Ejemplo práctico:
./scripts/add-gasto-airtable.sh "Galicia Visa - Marzo" "2026-03-05" "2026-03-20" "250000" "Galicia" "Resumen tarjeta" "Todo"
```

#### **Estructura Airtable:**
- **Name** (Single Line Text): Descripción
- **Fecha_Recibimiento** (Date): Cuándo se registró
- **Fecha_Vencimiento** (Date): Cuándo vence  
- **Monto** (Currency $): Valor en pesos
- **Banco** (Select): Galicia/Supervielle/Macro/Colegio SCMS/Cuota Alimentaria
- **Status** (Select): Todo/Done
- **Notes** (Long Text): Detalles

#### **Queries Críticas:**
```javascript
// Vencimientos HOY
filterByFormula=AND(IS_SAME({Fecha_Vencimiento},TODAY()),{Status}!='Done')

// Vencimientos MAÑANA  
filterByFormula=AND(IS_SAME({Fecha_Vencimiento},DATEADD(TODAY(),1,'day')),{Status}!='Done')

// Pendientes vencidos
filterByFormula=AND({Fecha_Vencimiento}<=TODAY(),{Status}!='Done')
```

#### **Gastos Recurrentes:**
- **Crédito 1 Supervielle:** $1.5M/mes (30 cuotas restantes hasta jul 2028)
- **Crédito 2 Supervielle:** $700K/mes (36 cuotas restantes hasta feb 2029)
- **Colegio Calu:** ~$1.3M/mes (vence día 13, pronto pago hasta día 27)
- **Cuota Alimentaria:** ~$1.1M/mes (vence DÍA 10 SIEMPRE)

#### **Integración Gmail:**
```bash
gog gmail search 'newer_than:1d (from:banco OR from:galicia OR from:supervielle OR from:macro OR from:visa OR from:mastercard OR from:amex OR subject:resumen OR subject:tarjeta)' --account dora@wtf-agency.com
```

### **2. GOG (Google Workspace)** 📧
**Ubicación:** `~/.openclaw/workspace/skills/gog/`

#### **Configuración OAuth:**
- Account: `dora@wtf-agency.com` 
- Servicios: gmail,calendar,drive,contacts,sheets,docs
- Auth válido desde: 2026-02-15

#### **Comandos Críticos:**
```bash
# Gmail search
gog gmail search 'newer_than:7d' --max 10 --account dora@wtf-agency.com

# Gmail send
gog gmail send --to recipient@domain.com --subject "Subject" --body "Message" --account dora@wtf-agency.com

# Calendar events
gog calendar events primary --from 2026-03-06 --to 2026-03-07 --account dora@wtf-agency.com

# Sheets backup finanzas
gog sheets get 1SbmBealwfHCBWCr5lOILMUYMbsfbslMj81cIhv9qb2g "Finanzas!A1:G100" --json --account dora@wtf-agency.com

# Drive search
gog drive search "WTF Agency" --max 10 --account dora@wtf-agency.com
```

### **3. NANO-BANANA-PRO** 🎨
**Ubicación:** `~/.openclaw/workspace/skills/nano-banana-pro/`

#### **Función:**
- Generación/edición imágenes con Gemini 3 Pro Image
- Text-to-image + image-to-image
- Formatos: 1K/2K/4K
- **Comando:** `nano-banana-pro --input-image path/to/image.jpg "edit instruction"`

### **4. OPENAI-IMAGE-GEN** 🖼️
**Ubicación:** `~/.openclaw/workspace/skills/openai-image-gen/`

#### **Función:**
- Batch generación imágenes vía OpenAI API
- Random prompt sampler
- Galería HTML automática
- **Output:** `index.html` gallery

### **5. SHOPIFY-ADMIN-API** 🛒
**Ubicación:** `~/.openclaw/workspace/skills/shopify-admin-api/`

#### **Estado:** ⚠️ Tokens pendientes
- **Tiendas:** 3 tiendas Shopify Plus de Wally
- **Funcionalidad:** Gestión completa e-commerce
- **Pendiente:** Configurar tokens API

## 🏠 **HOME ASSISTANT INTEGRATION**

### **Script Luces** (`luces`)
```bash
#!/bin/bash
# Control luces interior Home Assistant
./luces on   # Prende luces interior
./luces off  # Apaga luces interior
```

### **Automatizaciones HA:**
- **Luces interior ON:** `automation.a_luces_atarceder_interior_on`
- **Luces interior OFF:** `automation.b`

### **Zonas Casa:**
- Living, Comedor, Cocina, Dormitorio, Playroom, Estudio
- Cuarto Calu, Cochera, Jardín, Exterior/Galería, Pileta, Balcón

### **Devices Principales:**
- **Media:** Sonos Living Room, Samsung The Frame 75" (living), Samsung 65" (cocina), Samsung 75" (dormitorio)
- **Riego:** Jardín trasero + delantero + front  
- **Pileta:** Luz led + válvula smart

## 📁 **ARCHIVOS CRÍTICOS DE CONFIGURACIÓN**

### **Variables de Entorno** (`.env`)
```bash
AIRTABLE_API_KEY=pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e
HA_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxNWQwNGQwZmE3ZDk0NmI2OTMzNjFjNGY4NTc5MTAwNCIsImlhdCI6MTc3MVEyNTYxMyIsImV4cCI6MjA4NjQ4NTYxM30.UPkfJHpTGRVJgPbDSU-0R3BtaQc1vUMz6slIFne8Z4E
```

### **Backup Script** (`backup-config-nocturno.sh`)
- **Frecuencia:** Diario 02:00 AM
- **Incluye:** Configuración OpenClaw + workspace completo + skills
- **Ubicación:** `~/.openclaw/backups/`
- **Retención:** 30 días

### **Cron Jobs Activos:**
```bash
# Backup nocturno - 2:00 AM todos los días
0 2 * * * /home/ubuntu/.openclaw/workspace/backup-config-nocturno.sh >> /home/ubuntu/.openclaw/workspace/backup.log 2>&1
```

## 🎯 **WORKFLOWS AUTOMATIZADOS**

### **Heartbeat Checks:**
1. **Vencimientos próximos:** check-vencimientos-final.sh (incluye cuota alimentaria día 10)
2. **Gmail resúmenes:** Buscar mails bancarios últimas 24h
3. **Disco:** Alertar si <15% libre
4. **Reuniones:** Recordatorios 30 min antes

### **Finanzas Pipeline:**
1. **Gmail** → Detectar resumen banco/tarjeta
2. **Extraer datos** → Monto, vencimiento, banco
3. **Airtable** → Agregar registro con add-gasto-airtable.sh
4. **Backup** → Google Sheets (opcional)
5. **Alert** → Resumen visual a Wally por Telegram

### **Home Assistant Integration:**
1. **Luces automáticas:** Script `luces on/off`
2. **Sensores:** 111 sensores monitoreados
3. **Switches:** 17 switches controlables
4. **Media:** Control Sonos + Samsung TVs

## ⚠️ **SKILLS PENDIENTES INSTALACIÓN**

### **Críticos:**
- **summarize** CLI: `brew install steipete/tap/summarize`
- **nano-pdf**: `uv install nano-pdf`
- **sag** (ElevenLabs): API key required para voice storytelling

### **Útiles:**
- **github**: Configurar tokens para proyectos WTF Agency
- **notion**: Conectar workspace Wally
- **discord/slack**: Webhooks WTF Agency

## 🔄 **PROCEDIMIENTO RECUPERACIÓN TOTAL**

### **En caso pérdida de contexto:**
1. **Leer este archivo completo**
2. **Verificar .env**: Airtable + HA tokens
3. **Test GOG**: `gog auth list` debe mostrar dora@wtf-agency.com
4. **Test Airtable**: Ejecutar check-vencimientos-final.sh
5. **Test HA**: `./luces on` debe funcionar
6. **Verificar backup**: Último backup en ~/.openclaw/backups/

### **Comandos verificación rápida:**
```bash
# APIs críticas
gog auth list
curl -H "Authorization: Bearer $AIRTABLE_API_KEY" https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?maxRecords=1
./luces on

# Skills funcionales
ls ~/.openclaw/workspace/skills/
./skills/finanzas-wally/scripts/check-vencimientos-final.sh
```

## 📊 **MÉTRICAS & MONITOREO**

### **Health Checks Diarios:**
- [ ] Airtable API response < 2s
- [ ] Gmail OAuth válido
- [ ] HA conectividad OK
- [ ] Backup nocturno exitoso
- [ ] Disk space > 15%

### **Alertas Críticas:**
- 🚨 Vencimiento HOY
- ⏰ Vencimiento MAÑANA  
- 💾 Disco <15%
- 🔗 API failure
- 📧 Gmail OAuth expiry

---

**IMPORTANTE:** Este archivo debe incluirse en TODOS los backups nocturnos. Contiene la información completa para recuperación total del sistema de APIs y configuraciones de Dora.

**Última actualización:** 6 marzo 2026, 17:27 UTC  
**Próxima revisión:** Semanal o ante cambios de configuración