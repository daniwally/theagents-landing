# Configuración Airtable - Finanzas Wally

## Datos de Conexión

- **Base ID:** `appK3sEL2Z2NLcQnA`
- **Table ID:** `tbl8B9PKPUnYcW4Va`
- **API Token:** Guardado en `.env` como `AIRTABLE_API_KEY`
- **URL Base:** `https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va`

## Estructura de Campos

### Campos Principales

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `Name` | Single Line Text | Nombre descriptivo del gasto | "Supervielle Crédito 1 - Cuota 20/48" |
| `Fecha_Recibimiento` | Date | Cuándo se registró/procesó | "2026-03-05" |
| `Fecha_Vencimiento` | Date | Cuándo vence el pago | "2026-03-05" |
| `Monto` | Currency ($) | Valor en pesos argentinos | 1555389.78 |
| `Banco` | Single Select | Origen del gasto | "Supervielle" |
| `Status` | Single Select | Estado del pago | "Todo" / "Done" |
| `Notes` | Long Text | Detalles adicionales | Texto libre |

### Opciones Single Select - Banco

- **Galicia** (color: blueLight2)
- **Supervielle** (color: greenLight2)
- **Macro** (color: yellowLight2)
- **Colegio SCMS** (color: redLight2)
- **Cuota Alimentaria** (color: purpleLight2)

### Opciones Single Select - Status

- **Todo** (pendiente)
- **Done** (completado)

## URLs de Acceso

- **Base:** https://airtable.com/workspaces/wspNslVlhCRsWcnTk
- **Vista directa:** https://airtable.com/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va/viwrfufZdIE3eMJk3?blocks=hide

## Queries Importantes

### Vencimientos Hoy
```
filterByFormula=AND(IS_SAME({Fecha_Vencimiento},TODAY()),{Status}!='Done')
```

### Vencimientos Mañana
```
filterByFormula=AND(IS_SAME({Fecha_Vencimiento},DATEADD(TODAY(),1,'day')),{Status}!='Done')
```

### Pendientes con Vencimiento
```
filterByFormula=AND({Fecha_Vencimiento}<=TODAY(),{Status}!='Done')
```

## Migración desde Google Sheets

**Origen:** Google Sheets "Finanzas Wally 2026" (ID: 1SbmBealwfHCBWCr5lOILMUYMbsfbslMj81cIhv9qb2g)
**Destino:** Airtable estructurado con campos específicos
**Estado:** ✅ Completado

## Créditos Supervielle

### Crédito 1
- **Capital:** $30.000.000 (48 cuotas)
- **Pagas:** 18 cuotas
- **Quedan:** 30 cuotas (hasta jul 2028)
- **Cuota actual:** ~$1.5M

### Crédito 2  
- **Capital:** $13.000.000 (48 cuotas)
- **Pagas:** 12 cuotas
- **Quedan:** 36 cuotas (hasta feb 2029)
- **Cuota actual:** ~$700K