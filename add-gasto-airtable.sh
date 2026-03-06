#!/bin/bash

# Función para agregar gastos con campos estructurados
# Uso: ./add-gasto-airtable.sh "Nombre" "Fecha_Recib" "Fecha_Venc" "Monto" "Banco" "Concepto" "Status"

export AIRTABLE_API_KEY="pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e"

NAME="$1"
FECHA_RECIB="$2" 
FECHA_VENC="$3"
MONTO="$4"
BANCO="$5"
CONCEPTO="$6"
STATUS="${7:-Todo}"

curl -X POST \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.airtable.com/v0/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va \
  -d "{
    \"records\": [
      {
        \"fields\": {
          \"Name\": \"$NAME\",
          \"Fecha_Recibimiento\": \"$FECHA_RECIB\",
          \"Fecha_Vencimiento\": \"$FECHA_VENC\",
          \"Monto\": $MONTO,
          \"Banco\": \"$BANCO\",
          \"Notes\": \"$CONCEPTO\",
          \"Status\": \"$STATUS\"
        }
      }
    ]
  }"

echo "✅ Gasto agregado: $NAME - \$$MONTO"