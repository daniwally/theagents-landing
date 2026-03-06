# Workflows Finanzas Wally

## Workflow 1: Agregar Nuevo Gasto

### Comando
```bash
./add-gasto-airtable.sh "Nombre" "Fecha_Recib" "Fecha_Venc" "Monto" "Banco" "Concepto" "Status"
```

### Ejemplo
```bash
./add-gasto-airtable.sh "Galicia Visa - Pago Marzo" "2026-03-05" "2026-03-15" "150000" "Galicia" "Pago resumen tarjeta visa marzo" "Done"
```

### Resultado
- ✅ Registro creado en Airtable
- 📊 Campos estructurados poblados
- 🔍 Disponible para queries automáticas

## Workflow 2: Verificar Vencimientos

### Comando
```bash
./check-vencimientos-final.sh
```

### Output Ejemplo
```
🔍 VENCIMIENTOS HOY Y MAÑANA:
================================
🚨 VENCEN HOY:
   • Supervielle Crédito 1: $1555389.78 (Supervielle)
   • Supervielle Crédito 2: $698603.94 (Supervielle)

⏰ VENCEN MAÑANA:

💰 TOTAL VENCIDO + HOY:
   Total pendiente: $2253993.72
```

## Workflow 3: Procesar Resumen de Tarjeta

### Paso 1: Extraer datos del mail
```bash
# Buscar mails nuevos
gog gmail search 'newer_than:1d (from:banco OR subject:resumen)' --account dora@wtf-agency.com
```

### Paso 2: Agregar a Airtable
```bash
./add-gasto-airtable.sh "Banco Galicia - Resumen TC" "2026-03-05" "2026-03-20" "250000" "Galicia" "Resumen tarjeta de crédito marzo" "Todo"
```

### Paso 3: Verificar registro
- 📝 Verificar datos en Airtable
- ✅ Actualizar status cuando se pague

## Workflow 4: Alertas Automáticas (Heartbeat)

### En HEARTBEAT.md
```markdown
- [ ] **Vencimientos próximos:** ✅ AIRTABLE STRUKTURIERT → check-vencimientos-final.sh
```

### Resultado
- 🤖 Check automático cada heartbeat
- ⚠️ Alert si hay vencimientos hoy/mañana
- 💰 Total de montos pendientes

## Workflow 5: Marcar como Pagado

### Comando cURL directo
```bash
curl -X PATCH \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va/RECORD_ID \
  -d '{"fields": {"Status": "Done"}}'
```

## Workflow 6: Query Personalizada

### Gastos por Banco
```bash
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula={Banco}='Supervielle'" \
| jq -r '.records[] | "\(.fields.Name): $\(.fields.Monto)"'
```

### Gastos por Mes
```bash
# Usar campo Fecha_Recibimiento para filtrar por rango de fechas
```

## Reglas Importantes

### 🚫 NUNCA MÁS preguntar montos ya procesados
- ✅ Siempre buscar PRIMERO en Airtable
- ✅ Solo preguntar si NO existe el registro
- ✅ Cross-check con Google Sheets si hay dudas

### 📅 Alertas de Vencimientos
- 🔴 **HOY:** Alert inmediato + monto total
- 🟡 **MAÑANA:** Alert preventivo
- ⚪ **>2 días:** Solo en reportes semanales

### 💾 Backup de Seguridad
- **Principal:** Airtable (estructurado)
- **Backup:** Google Sheets (plano)
- **Sincronización:** Manual por ahora