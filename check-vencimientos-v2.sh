#!/bin/bash

# Check vencimientos using structured date fields
export AIRTABLE_API_KEY="pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e"

echo "🔍 VENCIMIENTOS HOY Y MAÑANA:"
echo "================================"

# Get records with due dates today or tomorrow and not completed
TODAY=$(date +%Y-%m-%d)
TOMORROW=$(date -d "+1 day" +%Y-%m-%d)

# Vencimientos HOY
echo "⚠️  VENCEN HOY ($TODAY):"
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula=AND({Fecha_Vencimiento}='$TODAY',{Status}!='Done')" \
| jq -r '.records[] | "   • \(.fields.Name): $\(.fields.Monto) (\(.fields.Banco))"'

echo ""
echo "⏰ VENCEN MAÑANA ($TOMORROW):"
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula=AND({Fecha_Vencimiento}='$TOMORROW',{Status}!='Done')" \
| jq -r '.records[] | "   • \(.fields.Name): $\(.fields.Monto) (\(.fields.Banco))"'

echo ""
echo "📊 TOTAL PENDIENTE:"
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula=AND({Fecha_Vencimiento},OR({Fecha_Vencimiento}='$TODAY',{Fecha_Vencimiento}='$TOMORROW'),{Status}!='Done')" \
| jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "   💰 $%.2f\n", sum}'