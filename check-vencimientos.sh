#!/bin/bash

# Check vencimientos from Airtable
export AIRTABLE_API_KEY="pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e"

# Get pending records with due dates
curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
"https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va?filterByFormula=AND(FIND(%22Vencimiento%22,%20%7BNotes%7D),%20%7BStatus%7D%20!=%20%22Done%22)" \
| jq -r '.records[] | select(.fields.Notes | contains("Vencimiento:")) | .fields.Notes' \
| grep -E "(Supervielle|Crédito|Tarjeta|Vencimiento)" \
| head -10