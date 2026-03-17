#!/bin/bash

# Workflow completo: emails → Airtable → gráfico → respuesta
# Uso: ./resumen-completo.sh [mes] [año]

source "$(dirname "$0")/config.sh"

MES=${1:-$(date +%m)}
YEAR=${2:-$(date +%Y)}
MONTH_NAME=$(date -d "$YEAR-$MES-01" +%B)

echo "🔥 RESUMEN COMPLETO: $MONTH_NAME $YEAR"
echo "====================================="
echo ""

# Paso 1: Revisar emails nuevos
echo "📧 PASO 1: Revisando emails nuevos..."
bash "$(dirname "$0")/check-emails-nuevos.sh" 3
echo ""

# Paso 2: Generar resumen visual actualizado
echo "📊 PASO 2: Generando resumen visual actualizado..."
IMAGEN=$(bash "$(dirname "$0")/generate-resumen.sh" "$MES" "$YEAR" | grep "Imagen generada exitosamente:" | cut -d: -f2 | xargs)
echo ""

if [ -z "$IMAGEN" ]; then
    echo "❌ Error: No se pudo generar la imagen"
    exit 1
fi

# Paso 3: Calcular totales finales para respuesta
echo "💰 PASO 3: Calculando totales finales..."

FILTER="AND(YEAR({Fecha_Vencimiento})=$YEAR,MONTH({Fecha_Vencimiento})=$MES)"

# Obtener totales
TOTAL_GENERAL=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "$AIRTABLE_URL?filterByFormula=$FILTER" | \
    jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "%.0f", sum}')

CALU_TOTAL=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "$AIRTABLE_URL?filterByFormula=AND($FILTER,OR({Banco}='Colegio SCMS',{Banco}='Cuota Alimentaria'))" | \
    jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "%.0f", sum}')

TARJETAS_TOTAL=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "$AIRTABLE_URL?filterByFormula=AND($FILTER,OR({Banco}='Galicia',{Banco}='Macro',FIND('Mastercard',{Name})))" | \
    jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "%.0f", sum}')

CREDITOS_TOTAL=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "$AIRTABLE_URL?filterByFormula=AND($FILTER,FIND('Crédito',{Name}))" | \
    jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "%.0f", sum}')

# Calcular porcentajes
CALU_PCT=$(awk "BEGIN {printf \"%.1f\", $CALU_TOTAL/$TOTAL_GENERAL*100}")
TARJETAS_PCT=$(awk "BEGIN {printf \"%.1f\", $TARJETAS_TOTAL/$TOTAL_GENERAL*100}")
CREDITOS_PCT=$(awk "BEGIN {printf \"%.1f\", $CREDITOS_TOTAL/$TOTAL_GENERAL*100}")

# Formatear montos
TOTAL_M=$(awk "BEGIN {printf \"%.2f\", $TOTAL_GENERAL/1000000}")
CALU_M=$(awk "BEGIN {printf \"%.2f\", $CALU_TOTAL/1000000}")
TARJETAS_M=$(awk "BEGIN {printf \"%.2f\", $TARJETAS_TOTAL/1000000}")
CREDITOS_M=$(awk "BEGIN {printf \"%.2f\", $CREDITOS_TOTAL/1000000}")

echo ""
echo "🎯 RESPUESTA PREPARADA:"
echo "======================="
echo ""
echo "IMAGEN: $IMAGEN"
echo ""
echo "TEXTO:"
echo "🔥 **$(echo $MONTH_NAME | tr '[:lower:]' '[:upper:]') $YEAR - TOTALES CORRECTOS**"
echo ""
echo "📊 **TOTALES:**"
echo "• **TOTAL:** \$$TOTAL_M M"
echo "• **TARJETAS:** \$$TARJETAS_M M ($TARJETAS_PCT%)"
echo "• **CALU:** \$$CALU_M M ($CALU_PCT%)"
echo "• **CRÉDITOS:** \$$CREDITOS_M M ($CREDITOS_PCT%)"
echo ""
echo "🎨 **Gráfico con colores pasteles + subtotales**"
echo "📋 **Todas las categorías incluidas**"
echo ""
echo "✅ WORKFLOW COMPLETADO"