#!/bin/bash

# Check vencimientos using Airtable date functions
export AIRTABLE_API_KEY="pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e"

echo "🔍 VENCIMIENTOS HOY Y MAÑANA:"
echo "================================"

# Vencimientos HOY
echo "🚨 VENCEN HOY:"
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula=AND(IS_SAME({Fecha_Vencimiento},TODAY()),{Status}!='Done')" \
| jq -r '.records[] | "   • \(.fields.Name): $\(.fields.Monto) (\(.fields.Banco))"'

echo ""
echo "⏰ VENCEN MAÑANA:"
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula=AND(IS_SAME({Fecha_Vencimiento},DATEADD(TODAY(),1,'day')),{Status}!='Done')" \
| jq -r '.records[] | "   • \(.fields.Name): $\(.fields.Monto) (\(.fields.Banco))"'

echo ""
echo "💰 TOTAL VENCIDO + HOY:"
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula=AND({Fecha_Vencimiento}<=TODAY(),{Status}!='Done')" \
| jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "   Total pendiente: $%.2f\n", sum}'