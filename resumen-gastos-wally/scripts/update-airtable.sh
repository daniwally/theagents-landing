#!/bin/bash

# Actualizar Airtable con nuevo gasto
# Uso: ./update-airtable.sh "nombre" "fecha_venc" "monto" "banco" ["concepto"] ["status"]

source "$(dirname "$0")/config.sh"

if [ $# -lt 4 ]; then
    echo "❌ Uso: $0 \"nombre\" \"fecha_venc\" \"monto\" \"banco\" [\"concepto\"] [\"status\"]"
    echo ""
    echo "Ejemplos:"
    echo "  $0 \"Galicia Visa - Marzo\" \"2026-03-15\" \"250000\" \"Galicia\" \"Resumen tarjeta\" \"Done\""
    echo "  $0 \"Supervielle Crédito 1\" \"2026-03-05\" \"1555390\" \"Supervielle\" \"Cuota 20/48\" \"Todo\""
    exit 1
fi

NAME="$1"
FECHA_VENC="$2"
MONTO="$3"
BANCO="$4"
CONCEPTO="${5:-Gasto procesado automáticamente}"
STATUS="${6:-Done}"

echo "📝 AGREGANDO A AIRTABLE:"
echo "========================"
echo "Nombre: $NAME"
echo "Fecha Venc: $FECHA_VENC"
echo "Monto: $MONTO"
echo "Banco: $BANCO"
echo "Concepto: $CONCEPTO"
echo "Status: $STATUS"
echo ""

# Verificar si ya existe
EXISTING=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
    "$AIRTABLE_URL?filterByFormula=FIND('$NAME',{Name})" | \
    jq -r '.records | length')

if [ "$EXISTING" -gt 0 ]; then
    echo "⚠️  YA EXISTE un registro con nombre similar. Verificar manualmente."
    exit 1
fi

# Agregar nuevo registro
RESPONSE=$(curl -X POST \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  "$AIRTABLE_URL" \
  -d "{
    \"records\": [
      {
        \"fields\": {
          \"Name\": \"$NAME\",
          \"Fecha_Recibimiento\": \"$(date +%Y-%m-%d)\",
          \"Fecha_Vencimiento\": \"$FECHA_VENC\",
          \"Monto\": $MONTO,
          \"Banco\": \"$BANCO\",
          \"Notes\": \"$CONCEPTO\",
          \"Status\": \"$STATUS\"
        }
      }
    ]
  }")

if echo "$RESPONSE" | jq -e '.records[0].id' >/dev/null; then
    echo "✅ Registro agregado exitosamente"
    echo "ID: $(echo "$RESPONSE" | jq -r '.records[0].id')"
else
    echo "❌ Error agregando registro:"
    echo "$RESPONSE" | jq '.'
fi