# Bancos y Formatos de Emails

## Bancos Monitoreados

### Banco Galicia
- **Email:** varios (galicia.com.ar, etc.)
- **Tarjetas:** Visa + AMEX  
- **Formato resumen:** HTML con tabla de gastos
- **Identificadores clave:** "GALICIA", "Resumen", fecha vencimiento
- **Ejemplo monto:** $2.483.356,95

### Banco Supervielle  
- **Email:** no-reply@supervielle.com.ar
- **Tarjetas:** Mastercard
- **Créditos:** 2 créditos personales activos
- **Formato:** HTML estructurado
- **Identificadores clave:** "Supervielle", "Mastercard", "Crédito"
- **Ejemplos:**
  - Tarjeta: $1.563.917,32
  - Crédito 1: $1.555.389,78  
  - Crédito 2: $698.603,94

### Banco Macro
- **Email:** varios (macro.com.ar, etc.)
- **Tarjetas:** Visa Signature
- **Formato:** PDF adjunto + email HTML
- **Identificadores clave:** "MACRO", "Visa Signature"
- **Ejemplo monto:** $378.006,41

## Filtros de Gmail

### Búsqueda Principal
```
(from:banco OR from:galicia OR from:supervielle OR from:macro OR from:visa OR from:mastercard OR from:amex OR subject:resumen OR subject:tarjeta)
```

### Por Período
```
newer_than:1d [FILTRO_PRINCIPAL]
newer_than:7d [FILTRO_PRINCIPAL]
```

### Por Banco Específico
```
from:supervielle.com.ar
from:galicia
subject:"macro"
```

## Patrones de Extracción

### Supervielle
- **Importe:** Buscar "Importe en pesos: $ X.XXX.XXX,XX"
- **Tarjeta:** Buscar "Tarjeta: Mastercard ****XXXX"
- **Fecha:** Email date header

### Galicia
- **Monto:** En tabla HTML, columna "Importe"
- **Tipo:** VISA/AMEX en subject o body
- **Vencimiento:** "Vencimiento: DD/MM/YYYY"

### Macro  
- **Resumen:** "Pago Total: $XXX.XXX,XX"
- **Tipo:** "Visa Signature" en subject/body

## Mapeo a Airtable

### Categorización Automática

**CALU (Gastos de California):**
- Banco: "Colegio SCMS" 
- Banco: "Cuota Alimentaria"
- Keywords: "arancel", "colegio", "cuota alimentaria", "calu"

**TARJETAS (Por marca):**
- Galicia Visa → Banco: "Galicia", Name: "Galicia Visa - [Mes]"
- Galicia AMEX → Banco: "Galicia", Name: "Galicia AMEX - [Mes]"  
- Supervielle Mastercard → Banco: "Supervielle", Name: "Supervielle Mastercard - [Mes]"
- Macro Visa → Banco: "Macro", Name: "Macro Visa Signature - [Mes]"

**CRÉDITOS:**
- Supervielle Crédito 1 → Name: "Supervielle Crédito 1 - Cuota X/48"
- Supervielle Crédito 2 → Name: "Supervielle Crédito 2 - Cuota X/48"

### Reglas de Status
- **Todo:** Para gastos recién detectados o pendientes
- **Done:** Para gastos ya pagados (confirmaciones de pago)

### Formato de Fechas
- **Fecha_Recibimiento:** Fecha del email (YYYY-MM-DD)
- **Fecha_Vencimiento:** Fecha límite de pago (YYYY-MM-DD)

## Gastos Recurrentes

### Cuota Alimentaria
- **Monto:** ~$1.17M (ajuste inflación mensual)
- **Vencimiento:** DÍA 10 de cada mes
- **Banco:** "Cuota Alimentaria"

### Créditos Supervielle
- **Crédito 1:** $1.55M (30 cuotas restantes)
- **Crédito 2:** $699K (36 cuotas restantes)  
- **Vencimiento:** Día 5 de cada mes

### Colegio (SCMS)
- **Arancel:** ~$1.28M/mes
- **Vencimiento:** Día 13 de cada mes
- **Pronto pago:** Descuento hasta día 27

## Validaciones

### Pre-inserción
1. Verificar que no existe registro con mismo Name
2. Validar formato de fecha (YYYY-MM-DD)
3. Confirmar que Monto > 0
4. Verificar que Banco está en lista permitida

### Post-inserción
1. Confirmar que record_id fue retornado
2. Verificar que Monto se guardó correctamente
3. Comprobar que Status se asignó bien