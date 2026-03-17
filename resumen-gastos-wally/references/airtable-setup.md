# Configuración Airtable - Finanzas Wally

## Datos de Conexión

- **Base ID:** `appK3sEL2Z2NLcQnA`
- **Table ID:** `tbl8B9PKPUnYcW4Va`
- **API Key:** `pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e`
- **URL Completa:** https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va
- **Vista Web:** https://airtable.com/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va

## Estructura de Campos

### Campos Principales
- **Name:** Descripción del gasto (text)
- **Fecha_Recibimiento:** Cuándo se registró (Date)
- **Fecha_Vencimiento:** Cuándo vence (Date)
- **Monto:** Valor en pesos (Currency $)
- **Banco:** Origen (Select: Galicia/Supervielle/Macro/Colegio SCMS/Cuota Alimentaria)
- **Status:** Estado (Select: Todo/Done)
- **Notes:** Detalles adicionales (Long text)

### Opciones del Campo Banco
- `Galicia`
- `Supervielle`
- `Macro`
- `Colegio SCMS`
- `Cuota Alimentaria`

### Opciones del Campo Status
- `Todo` - Pendiente de pago
- `Done` - Pagado

## Consultas Útiles

### Gastos por Mes/Año
```
filterByFormula=AND(YEAR({Fecha_Vencimiento})=2026,MONTH({Fecha_Vencimiento})=3)
```

### Solo Pendientes
```
filterByFormula=AND(YEAR({Fecha_Vencimiento})=2026,MONTH({Fecha_Vencimiento})=3,{Status}='Todo')
```

### Por Categoría - CALU
```
filterByFormula=AND(YEAR({Fecha_Vencimiento})=2026,MONTH({Fecha_Vencimiento})=3,OR({Banco}='Colegio SCMS',{Banco}='Cuota Alimentaria'))
```

### Por Categoría - TARJETAS
```
filterByFormula=AND(YEAR({Fecha_Vencimiento})=2026,MONTH({Fecha_Vencimiento})=3,OR({Banco}='Galicia',{Banco}='Macro',FIND('Mastercard',{Name})))
```

### Por Categoría - CRÉDITOS
```
filterByFormula=AND(YEAR({Fecha_Vencimiento})=2026,MONTH({Fecha_Vencimiento})=3,FIND('Crédito',{Name}))
```

## Operaciones CRUD

### Crear Registro
```bash
curl -X POST \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  $AIRTABLE_URL \
  -d '{
    "records": [{
      "fields": {
        "Name": "Nombre del gasto",
        "Fecha_Recibimiento": "2026-03-15",
        "Fecha_Vencimiento": "2026-03-20",
        "Monto": 250000,
        "Banco": "Galicia",
        "Notes": "Descripción",
        "Status": "Done"
      }
    }]
  }'
```

### Actualizar Registro
```bash
curl -X PATCH \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  $AIRTABLE_URL/[RECORD_ID] \
  -d '{
    "fields": {
      "Status": "Done",
      "Monto": 300000
    }
  }'
```

### Listar Registros
```bash
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  "$AIRTABLE_URL?filterByFormula=FILTER_EXPRESSION" | \
  jq '.records'
```

## Backup y Mantenimiento

- **Backup principal:** Google Sheets (sheet ID: 1SbmBealwfHCBWCr5lOILMUYMbsfbslMj81cIhv9qb2g)
- **Backup automático:** Configurado para ejecutar diariamente
- **Retención:** 30 días de backups

## Troubleshooting

### Error "INVALID_PERMISSIONS"
- Verificar API token
- Confirmar permisos de escritura en la base

### Campos vacíos en respuestas
- Usar `select(.fields.Monto)` en jq para filtrar nulos
- Verificar formato de fechas (YYYY-MM-DD)

### Duplicados
- Siempre verificar existencia antes de agregar
- Usar filtro por Name para evitar duplicados