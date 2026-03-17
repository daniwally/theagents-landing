#!/bin/bash

# Generar resumen visual de gastos mensuales
# Uso: ./generate-resumen.sh [mes] [año]

source "$(dirname "$0")/config.sh"

MES=${1:-$(date +%m)}
YEAR=${2:-$(date +%Y)}
MONTH_NAME=$(date -d "$YEAR-$MES-01" +%B)

echo "📊 GENERANDO RESUMEN VISUAL: $MONTH_NAME $YEAR"
echo "=============================================="
echo ""

# Obtener datos de Airtable para el mes/año
echo "🔍 Consultando datos en Airtable..."

# Calcular totales por categoría
FILTER="AND(YEAR({Fecha_Vencimiento})=$YEAR,MONTH({Fecha_Vencimiento})=$MES)"

# CALU (Colegio + Cuota Alimentaria)
CALU_TOTAL=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "$AIRTABLE_URL?filterByFormula=AND($FILTER,OR({Banco}='Colegio SCMS',{Banco}='Cuota Alimentaria'))" | \
    jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "%.0f", sum}')

# TARJETAS (Galicia, Supervielle MC, Macro)
TARJETAS_TOTAL=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "$AIRTABLE_URL?filterByFormula=AND($FILTER,OR({Banco}='Galicia',{Banco}='Macro',FIND('Mastercard',{Name})))" | \
    jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "%.0f", sum}')

# CRÉDITOS (Supervielle Créditos)
CREDITOS_TOTAL=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "$AIRTABLE_URL?filterByFormula=AND($FILTER,FIND('Crédito',{Name}))" | \
    jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "%.0f", sum}')

# TOTAL GENERAL
TOTAL_GENERAL=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "$AIRTABLE_URL?filterByFormula=$FILTER" | \
    jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "%.0f", sum}')

echo "💰 TOTALES CALCULADOS:"
echo "   CALU: \$$(printf "%'.0f" $CALU_TOTAL)"
echo "   TARJETAS: \$$(printf "%'.0f" $TARJETAS_TOTAL)" 
echo "   CRÉDITOS: \$$(printf "%'.0f" $CREDITOS_TOTAL)"
echo "   TOTAL: \$$(printf "%'.0f" $TOTAL_GENERAL)"
echo ""

# Calcular porcentajes
CALU_PCT=$(awk "BEGIN {printf \"%.1f\", $CALU_TOTAL/$TOTAL_GENERAL*100}")
TARJETAS_PCT=$(awk "BEGIN {printf \"%.1f\", $TARJETAS_TOTAL/$TOTAL_GENERAL*100}")
CREDITOS_PCT=$(awk "BEGIN {printf \"%.1f\", $CREDITOS_TOTAL/$TOTAL_GENERAL*100}")

# Generar nombre de archivo
TIMESTAMP=$(date +%Y-%m-%d-%H-%M)
FILENAME="$TIMESTAMP-resumen-$MONTH_NAME-$YEAR.png"

echo "🎨 Generando gráfico: $FILENAME"

# Crear prompt para nano-banana-pro
TOTAL_M=$(awk "BEGIN {printf \"%.2f\", $TOTAL_GENERAL/1000000}")
CALU_M=$(awk "BEGIN {printf \"%.2f\", $CALU_TOTAL/1000000}")
TARJETAS_M=$(awk "BEGIN {printf \"%.2f\", $TARJETAS_TOTAL/1000000}")
CREDITOS_M=$(awk "BEGIN {printf \"%.2f\", $CREDITOS_TOTAL/1000000}")

PROMPT="Clean vertical document, Inter Light font, white background. Top: '$(echo $MONTH_NAME | tr '[:lower:]' '[:upper:]') $YEAR'. Three main numbers: 'TOTAL ${TOTAL_M}M', 'PAGADO ${TOTAL_M}M', 'PENDIENTE 0'. Center: donut chart with soft pastel colors - light blue (CALU ${CALU_PCT}%), soft coral (TARJETAS ${TARJETAS_PCT}%), light green (CRÉDITOS ${CREDITOS_PCT}%). Below chart, three sections with totals and subtotals showing the breakdown of expenses by category. Use soft pastel colors throughout, clean typography."

# Ejecutar nano-banana-pro
uv run "$NANO_BANANA_SCRIPT" \
    --prompt "$PROMPT" \
    --filename "$FILENAME" \
    --resolution "$IMAGEN_RESOLUCION"

if [ -f "$FILENAME" ]; then
    echo "✅ Imagen generada exitosamente: $FILENAME"
    echo ""
    echo "📱 RESUMEN FINAL:"
    echo "   Archivo: $FILENAME"
    echo "   Totales: CALU $CALU_PCT% | TARJETAS $TARJETAS_PCT% | CRÉDITOS $CREDITOS_PCT%"
else
    echo "❌ Error generando imagen"
fi