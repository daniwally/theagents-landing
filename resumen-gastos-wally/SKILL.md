---
name: resumen-gastos-wally
description: Sistema completo de resumen de gastos mensuales para Wally. Revisa automáticamente emails de dora@wtf-agency.com, extrae datos de resúmenes bancarios/tarjetas, actualiza Airtable, y genera gráfico visual completo con todos los gastos categorizados. Use cuando Wally pida "mis gastos", "resumen de marzo" o solicite información financiera mensual. Siempre responde con gráfico actualizado y totales correctos.
---

# Resumen de Gastos Mensual - Wally

Sistema automatizado que procesa emails de bancos/tarjetas, mantiene Airtable actualizado, y genera resúmenes visuales completos de gastos mensuales.

## Workflow Principal

Cuando Wally pide "mis gastos" o información financiera:

1. **Verificar emails nuevos** en dora@wtf-agency.com
2. **Extraer y procesar** resúmenes de bancos/tarjetas no procesados
3. **Actualizar Airtable** con nuevos datos
4. **Generar gráfico visual** actualizado con todos los totales
5. **Responder con imagen final** + resumen de totales

## Datos de Conexión Airtable

- **Base ID:** `appK3sEL2Z2NLcQnA`
- **Table ID:** `tbl8B9PKPUnYcW4Va`
- **API Key:** Ver `scripts/config.sh`
- **Vista Web:** https://airtable.com/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va

## Categorización de Gastos

### CALU (Gastos relacionados a California - hija de Wally)
- Arancel del colegio (SCMS)
- Cuota alimentaria (mensual)
- Actividades, ropa, eventos del colegio
- Cumpleaños, computadora, útiles

### CRÉDITOS (Préstamos bancarios)
- Supervielle Crédito 1 y 2 (cuotas mensuales)
- Otros créditos personales

### TARJETAS (Por marca)
- **Galicia:** Visa + AMEX
- **Supervielle:** Mastercard  
- **Macro:** Visa Signature
- Otros bancos que aparezcan

## Scripts Principales

### 1. Revisar Emails Nuevos
```bash
./scripts/check-emails-nuevos.sh [dias]
```
Busca emails de bancos/tarjetas no procesados en dora@wtf-agency.com.

### 2. Actualizar Airtable
```bash
./scripts/update-airtable.sh "nombre" fecha_venc monto banco
```
Agrega/actualiza registros en Airtable con validación.

### 3. Generar Resumen Visual
```bash
./scripts/generate-resumen.sh [mes] [año]
```
Crea gráfico completo con datos actualizados de Airtable.

### 4. Workflow Completo
```bash
./scripts/resumen-completo.sh [mes] [año]
```
Ejecuta todo el proceso: emails → Airtable → gráfico → respuesta.

## Formato de Respuesta

Siempre responder con:

1. **Imagen visual** (formato vertical, Inter Light, colores pasteles)
2. **Texto de acompañamiento** con totales y categorías
3. **Cualquier actualización** realizada en el sistema

### Template de Respuesta
```
🔥 **[MES AÑO] - TOTALES CORRECTOS**

✅ **AIRTABLE ACTUALIZADO:**
• [Cambios realizados]

📊 **TOTALES:**
• **TOTAL:** $X.XXM
• **[CATEGORIA 1]:** $X.XXM (XX.X%)
• **[CATEGORIA 2]:** $X.XXM (XX.X%)
• **[CATEGORIA 3]:** $X.XXM (XX.X%)

🎨 **Gráfico con colores pasteles + subtotales**
📋 **Todas las categorías incluidas**
```

## Referencias

- **Configuración Airtable:** Ver `references/airtable-setup.md`
- **Bancos y formatos:** Ver `references/bancos-formatos.md`
- **Workflow detallado:** Ver `references/workflow-completo.md`

## Reglas Críticas

1. **NUNCA preguntar montos** - siempre verificar Airtable primero
2. **Siempre generar imagen actualizada** - nunca reutilizar gráficos viejos
3. **Verificar emails nuevos** antes de procesar
4. **Mantener categorización consistente** según las reglas establecidas
5. **Respuesta debe incluir imagen + texto** cada vez

## Patrón de Uso

**Trigger típico:** "mis gastos", "resumen marzo", "¿cómo van las finanzas?"

**Resultado esperado:** Gráfico actualizado + resumen completo en <1 minuto.

Esta skill evoluciona constantemente para mejorar el procesamiento y visualización de datos financieros de Wally.