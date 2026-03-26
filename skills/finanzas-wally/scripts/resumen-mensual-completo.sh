#!/bin/bash

# RESUMEN MENSUAL COMPLETO - NO PUEDE FALLAR
# Uso: ./resumen-mensual-completo.sh 2026 03

YEAR=$1
MONTH=$2

if [ -z "$YEAR" ] || [ -z "$MONTH" ]; then
    echo "❌ Error: ./resumen-mensual-completo.sh YYYY MM"
    exit 1
fi

export AIRTABLE_API_KEY="pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e"

echo "🔍 RESUMEN COMPLETO: $MONTH/$YEAR"
echo "================================="

# 1. VERIFICACIÓN POR BANCO - OBLIGATORIO
echo ""
echo "📊 VERIFICACIÓN POR BANCO:"
echo "------------------------"

for banco in "Galicia" "Supervielle" "Macro" "Colegio SCMS" "Cuota Alimentaria"; do
    total=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
        "https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va" | \
        jq -r --arg banco "$banco" --arg year "$YEAR" --arg month "$MONTH" \
        '.records[] | select(.fields.Fecha_Recibimiento and (.fields.Fecha_Recibimiento | startswith($year + "-" + $month)) and .fields.Banco == $banco) | .fields.Monto' | \
        awk '{sum += $1} END {printf "%.2f", sum}')
    
    if [ "$total" = "0.00" ] || [ -z "$total" ]; then
        total="0.00"
    fi
    
    printf "%-20s: $%'15.2f\n" "$banco" "$total"
done

echo ""
echo "🔍 DETALLE POR REGISTRO:"
echo "------------------------"

# 2. LISTADO COMPLETO - VERIFICACIÓN VISUAL
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va" | \
    jq -r --arg year "$YEAR" --arg month "$MONTH" \
    '.records[] | select(.fields.Fecha_Recibimiento and (.fields.Fecha_Recibimiento | startswith($year + "-" + $month))) | 
    [.fields.Fecha_Recibimiento, .fields.Banco // "SIN_BANCO", (.fields.Monto | tostring), .fields.Name // "SIN_NOMBRE", .fields.Status // "SIN_STATUS"] | @tsv' | \
    sort | while IFS=$'\t' read -r fecha banco monto nombre status; do
        printf "%s | %-15s | %'12.2f | %-30s | %s\n" "$fecha" "$banco" "$monto" "$nombre" "$status"
    done

echo ""
echo "💰 TOTAL GENERAL:"
echo "----------------"

# 3. TOTAL FINAL
total_final=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va" | \
    jq -r --arg year "$YEAR" --arg month "$MONTH" \
    '.records[] | select(.fields.Fecha_Recibimiento and (.fields.Fecha_Recibimiento | startswith($year + "-" + $month))) | .fields.Monto' | \
    awk '{sum += $1} END {printf "%.2f", sum}')

echo "TOTAL: \$$total_final"

# 4. ALERTAS DE CONSISTENCIA
echo ""
echo "🚨 VERIFICACIONES:"
echo "-----------------"

# Check bancos sin datos
for banco in "Galicia" "Supervielle" "Macro"; do
    count=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
        "https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va" | \
        jq -r --arg banco "$banco" --arg year "$YEAR" --arg month "$MONTH" \
        '[.records[] | select(.fields.Fecha_Recibimiento and (.fields.Fecha_Recibimiento | startswith($year + "-" + $month)) and .fields.Banco == $banco)] | length')
    
    if [ "$count" = "0" ]; then
        echo "⚠️  ALERTA: $banco sin registros en $month/$year"
    fi
done

echo "✅ Proceso completado"