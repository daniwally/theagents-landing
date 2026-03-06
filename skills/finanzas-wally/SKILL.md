---
name: finanzas-wally
description: Sistema completo de finanzas personales para Wally con integración Airtable. Incluye tracking automático de gastos, alertas de vencimientos, manejo de créditos Supervielle, resúmenes de tarjetas, y gestión del colegio de Calu. Use cuando necesite procesar gastos, verificar vencimientos, agregar pagos, o manejar cualquier aspecto financiero de Wally. NUNCA preguntar montos ya procesados - siempre verificar en Airtable primero.
---

# Finanzas Wally

Sistema automatizado para el manejo completo de finanzas personales de Wally con base de datos Airtable estructurada.

## Configuración

### API Token
Airtable API token guardado en `.env`:
```bash
AIRTABLE_API_KEY=pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e
```

### Datos de Conexión
- **Base ID:** `appK3sEL2Z2NLcQnA`
- **Table ID:** `tbl8B9PKPUnYcW4Va`
- **Vista Web:** https://airtable.com/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va

## Scripts Principales

### 1. Verificar Vencimientos
```bash
./scripts/check-vencimientos-final.sh
```
- 🚨 Detecta vencimientos HOY
- ⏰ Detecta vencimientos MAÑANA  
- 💰 Calcula total pendiente
- **Usar en:** Heartbeat, alertas manuales

### 2. Agregar Nuevo Gasto
```bash
./scripts/add-gasto-airtable.sh "Nombre" "Fecha_Recib" "Fecha_Venc" "Monto" "Banco" "Concepto" "Status"
```

**Ejemplo:**
```bash
./scripts/add-gasto-airtable.sh "Galicia Visa - Marzo" "2026-03-05" "2026-03-20" "250000" "Galicia" "Resumen tarjeta" "Todo"
```

### 3. Utilities JavaScript
```javascript
// Usar airtable-utils.js para funciones avanzadas
const { getVencimientosProximos, addGasto } = require('./scripts/airtable-utils.js');
```

## Estructura de Datos

### Campos Principales
- **Name:** Descripción del gasto
- **Fecha_Recibimiento:** Cuándo se registró (Date)
- **Fecha_Vencimiento:** Cuándo vence (Date)
- **Monto:** Valor en pesos (Currency $)
- **Banco:** Origen (Select: Galicia/Supervielle/Macro/Colegio SCMS/Cuota Alimentaria)
- **Status:** Estado (Select: Todo/Done)
- **Notes:** Detalles adicionales

## Reglas Críticas

### ❌ NUNCA MÁS preguntar montos ya procesados
1. **SIEMPRE** buscar en Airtable PRIMERO
2. **SOLO** preguntar si NO existe registro
3. **Cross-check** con Google Sheets si hay dudas

### ✅ Proceso para nuevos gastos
1. Verificar si ya existe en Airtable
2. Si NO existe → usar `add-gasto-airtable.sh`
3. Confirmar registro creado
4. Backup en Google Sheets (opcional)

### 📅 Alertas Automáticas
- **HOY:** Alert inmediato + montos exactos
- **MAÑANA:** Alert preventivo 24h antes
- **Vencidos:** Incluir en total pendiente

## Gastos Recurrentes

### Créditos Supervielle
- **Crédito 1:** $1.5M/mes (30 cuotas restantes)
- **Crédito 2:** $700K/mes (36 cuotas restantes)
- **Vencimiento:** Día 5 de cada mes

### Colegio Calu  
- **Arancel:** ~$1.3M/mes
- **Pronto pago:** Descuento 5-7% hasta día 27
- **Vencimiento:** Día 13 de cada mes

### Cuota Alimentaria
- **Monto:** ~$1.1M/mes  
- **Vencimiento:** DÍA 10 DE CADA MES (SIEMPRE)

## Configuración Heartbeat

En `HEARTBEAT.md`:
```markdown
- [ ] **Vencimientos próximos:** ✅ AIRTABLE STRUKTURIERT → check-vencimientos-final.sh
```

## Integración con Gmail

### Buscar resúmenes nuevos
```bash
gog gmail search 'newer_than:1d (from:banco OR from:galicia OR from:supervielle OR from:macro OR subject:resumen)' --account dora@wtf-agency.com
```

### Procesar resúmenes automáticamente
1. Extraer datos del mail
2. Usar `add-gasto-airtable.sh`
3. Verificar registro en Airtable
4. Alert a Wally con resumen

## Referencias Detalladas

### Configuración Técnica
Ver `references/airtable-config.md` para:
- Estructura completa de campos
- URLs y IDs específicos
- Queries de filtrado
- Migración desde Google Sheets

### Workflows Completos  
Ver `references/workflows.md` para:
- Ejemplos paso a paso
- Comandos específicos
- Casos de uso comunes
- Troubleshooting

## Backup y Seguridad

### Sistema Dual
- **Principal:** Airtable (estructura + automatización)
- **Backup:** Google Sheets (plano, manual)

### Acceso Visual
Wally puede ver todos los datos directamente en:
https://airtable.com/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va

## Solución de Problemas

### Error "INVALID_PERMISSIONS"
- Verificar API token en `.env`
- Confirmar permisos de escritura en base

### Campos vacíos en queries
- Usar `select(.fields.Monto)` en jq
- Verificar formato de fechas (YYYY-MM-DD)

### Duplicados
- Siempre verificar existencia antes de agregar
- Usar Name único como identificador