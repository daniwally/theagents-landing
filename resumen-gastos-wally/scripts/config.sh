#!/bin/bash

# Configuración Airtable
export AIRTABLE_API_KEY="pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e"
export AIRTABLE_BASE_ID="appK3sEL2Z2NLcQnA"
export AIRTABLE_TABLE_ID="tbl8B9PKPUnYcW4Va"
export AIRTABLE_URL="https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}"

# Gmail de finanzas
export GMAIL_FINANZAS="dora@wtf-agency.com"

# Configuración de imagen
export IMAGEN_RESOLUCION="2K"
export NANO_BANANA_SCRIPT="$HOME/.openclaw/workspace/skills/nano-banana-pro/scripts/generate_image.py"

# Filtros de búsqueda de emails
export GMAIL_SEARCH_BANCOS="(from:banco OR from:galicia OR from:supervielle OR from:macro OR from:visa OR from:mastercard OR from:amex OR subject:resumen OR subject:tarjeta)"