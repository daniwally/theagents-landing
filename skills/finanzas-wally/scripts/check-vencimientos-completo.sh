#!/bin/bash

# Check vencimientos completo - incluye próximos 7 días
export AIRTABLE_API_KEY="pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e"

echo "🔍 VENCIMIENTOS - REPORTE COMPLETO:"
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
echo "📅 PRÓXIMOS 7 DÍAS:"
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula=AND({Fecha_Vencimiento}>TODAY(),{Fecha_Vencimiento}<=DATEADD(TODAY(),7,'day'),{Status}!='Done')" \
| jq -r '.records[] | "   • \(.fields.Name): $\(.fields.Monto) (vence: \(.fields.Fecha_Vencimiento))"'

echo ""
echo "💰 TOTALES:"
echo "   🔴 Vencido HOY:" 
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula=AND(IS_SAME({Fecha_Vencimiento},TODAY()),{Status}!='Done')" \
| jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "      $%.2f\n", sum}'

echo "   📊 Próximos 7 días (total):" 
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula=AND({Fecha_Vencimiento}>=TODAY(),{Fecha_Vencimiento}<=DATEADD(TODAY(),7,'day'),{Status}!='Done')" \
| jq -r '.records[].fields.Monto' | awk '{sum += $1} END {printf "      $%.2f\n", sum}'