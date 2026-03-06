#!/bin/bash

# Script para actualizar registros con campos específicos de fecha
export AIRTABLE_API_KEY="pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e"

# Update Supervielle Credit 1 record
curl -X PATCH \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va/recN2zN2YweIGw9pQ \
  -d '{
    "fields": {
      "Fecha_Recibimiento": "2026-03-05",
      "Fecha_Vencimiento": "2026-03-05",
      "Monto": 1555389.78,
      "Banco": "Supervielle"
    }
  }'

echo "Supervielle Credit 1 updated"

# Update Supervielle Credit 2 record  
curl -X PATCH \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va/recAZLxEPjdOGRPEY \
  -d '{
    "fields": {
      "Fecha_Recibimiento": "2026-03-05", 
      "Fecha_Vencimiento": "2026-03-05",
      "Monto": 698603.94,
      "Banco": "Supervielle"
    }
  }'

echo "Supervielle Credit 2 updated"

# Update Colegio SCMS record
curl -X PATCH \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va/rec6yoH3i4hMLg28v \
  -d '{
    "fields": {
      "Fecha_Recibimiento": "2026-03-05",
      "Fecha_Vencimiento": "2026-03-13", 
      "Monto": 1284866,
      "Banco": "Colegio SCMS"
    }
  }'

echo "Colegio SCMS updated"