#!/bin/bash

# Revisar emails nuevos de bancos/tarjetas
# Uso: ./check-emails-nuevos.sh [dias]

source "$(dirname "$0")/config.sh"

DIAS=${1:-1}

echo "🔍 REVISANDO EMAILS NUEVOS (últimos $DIAS días):"
echo "=============================================="
echo ""

# Buscar emails nuevos de bancos/tarjetas
EMAILS=$(gog gmail search "newer_than:${DIAS}d ${GMAIL_SEARCH_BANCOS}" 2>/dev/null)

if [ -z "$EMAILS" ] || [ "$EMAILS" = "No results" ]; then
    echo "✅ No hay emails nuevos de bancos/tarjetas"
    echo ""
    echo "🔍 Últimos 5 emails para verificar:"
    gog gmail search "in:inbox" | head -5
else
    echo "📧 EMAILS NUEVOS ENCONTRADOS:"
    echo "$EMAILS"
    echo ""
    echo "⚠️  REVISAR MANUALMENTE estos emails para extraer datos:"
    echo "   1. Leer el contenido de cada email"
    echo "   2. Extraer: banco, tarjeta, monto, fecha vencimiento"
    echo "   3. Usar update-airtable.sh para agregar los datos"
fi

echo ""
echo "🎯 Para procesar un email específico:"
echo "   gog gmail get [MESSAGE_ID] --format=full"