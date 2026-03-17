# Workflow Completo - Resumen de Gastos

## Flujo Principal

Cuando Wally pide "mis gastos" o información financiera mensual:

### 1. Verificación de Emails (check-emails-nuevos.sh)
```bash
./scripts/check-emails-nuevos.sh [dias]
```

**Acciones:**
- Busca emails nuevos en dora@wtf-agency.com
- Filtra por bancos/tarjetas conocidos
- Reporta emails encontrados para revisión manual
- Lista últimos emails para contexto

**Criterios de búsqueda:**
- Período: últimos 1-7 días (configurable)  
- Filtro: bancos + tarjetas + palabras clave
- Cuenta: dora@wtf-agency.com

**Output:**
- Lista de emails nuevos detectados
- Instrucciones para procesamiento manual
- IDs de mensajes para revisar

### 2. Extracción de Datos (Manual)

**Para cada email nuevo:**

1. **Leer contenido:**
   ```bash
   gog gmail get [MESSAGE_ID] --format=full
   ```

2. **Extraer información:**
   - Banco/tarjeta
   - Monto total  
   - Fecha vencimiento
   - Tipo de gasto (resumen/pago/cuota)

3. **Determinar categoría:**
   - CALU: colegio, cuota alimentaria
   - TARJETAS: resúmenes de tarjetas por marca
   - CRÉDITOS: cuotas de préstamos

### 3. Actualización Airtable (update-airtable.sh)
```bash
./scripts/update-airtable.sh "nombre" "fecha_venc" "monto" "banco" ["concepto"] ["status"]
```

**Validaciones automáticas:**
- Verificar duplicados por nombre
- Validar formato de fechas
- Confirmar banco en lista permitida
- Verificar monto > 0

**Categorización:**
- CALU: "Colegio SCMS", "Cuota Alimentaria"
- TARJETAS: "Galicia", "Supervielle" (MC), "Macro"
- CRÉDITOS: Supervielle con "Crédito" en Name

### 4. Generación Visual (generate-resumen.sh)
```bash
./scripts/generate-resumen.sh [mes] [año]
```

**Proceso:**
1. **Consultar Airtable:** obtener datos del mes/año
2. **Calcular totales:** por categoría y general
3. **Calcular porcentajes:** para gráfico
4. **Generar imagen:** usando nano-banana-pro
5. **Guardar archivo:** con timestamp único

**Formato de imagen:**
- Layout: vertical (móvil-friendly)
- Font: Inter Light
- Colores: pasteles suaves
- Elementos: título, totales, gráfico dona, breakdown detallado

### 5. Respuesta Final (resumen-completo.sh)
```bash  
./scripts/resumen-completo.sh [mes] [año]
```

**Workflow integrado:**
1. Check emails (3 días)
2. Generar imagen actualizada
3. Calcular totales finales
4. Formatear respuesta completa
5. Preparar texto de acompañamiento

## Formato de Respuesta Estándar

### Imagen
- **Título:** [MES AÑO] (ej: MARZO 2026)
- **Totales:** TOTAL XM, PAGADO XM, PENDIENTE 0
- **Gráfico:** Dona con 3 segmentos (CALU/TARJETAS/CRÉDITOS)
- **Breakdown:** Listas detalladas por categoría con subtotales

### Texto de Acompañamiento
```
🔥 **[MES AÑO] - TOTALES CORRECTOS**

✅ **AIRTABLE ACTUALIZADO:**
• [Cambios realizados si los hay]

📊 **TOTALES:**
• **TOTAL:** $X.XXM
• **TARJETAS:** $X.XXM (XX.X%)
• **CALU:** $X.XXM (XX.X%)  
• **CRÉDITOS:** $X.XXM (XX.X%)

🎨 **Gráfico con colores pasteles + subtotales**
📋 **Todas las categorías incluidas**
```

## Casos Especiales

### Emails de Confirmación de Pago
- **Identificar:** "pago exitoso", "confirmación", etc.
- **Acción:** Marcar como Status: "Done" si no estaba
- **No crear:** nuevo registro si ya existe

### Gastos Grandes/Inusuales  
- **Threshold:** > $3M requiere validación
- **Acción:** Alertar antes de procesar
- **Verificar:** categorización correcta

### Meses Incompletos
- **Detectar:** si faltan gastos recurrentes
- **Alertar:** cuota alimentaria, créditos, arancel
- **Sugerir:** revisar emails más antiguos

### Datos Inconsistentes
- **Montos $0:** Revisar y corregir
- **Fechas faltantes:** Inferir del email
- **Bancos nuevos:** Agregar a configuración

## Mantenimiento y Mejoras

### Revisión Mensual
1. **Verificar completitud:** todos los gastos esperados
2. **Validar categorización:** CALU vs TARJETAS vs CRÉDITOS  
3. **Actualizar patrones:** nuevos formatos de email
4. **Optimizar filtros:** mejorar detección automática

### Iteración de Skill
- **Feedback usuario:** mejoras en formato visual
- **Automatización:** reducir pasos manuales
- **Nuevos bancos:** agregar soporte según necesidad
- **Performance:** optimizar consultas Airtable

### Backup y Seguridad
- **Backup diario:** Airtable → Google Sheets
- **Retención:** 30 días de backups
- **Acceso API:** rotar tokens periódicamente
- **Validación:** integridad de datos mensual