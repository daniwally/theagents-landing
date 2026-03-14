#!/bin/bash
# Check mail hourly for bank/card summaries
# Runs via cron every hour

LOGFILE="/home/ubuntu/.openclaw/workspace/logs/mail-check.log"
mkdir -p "$(dirname "$LOGFILE")"

echo "$(date): Checking mail for bank/card summaries..." >> "$LOGFILE"

# Search for new bank/card mails
RESULTS=$(gog gmail search 'newer_than:1h (from:banco OR from:galicia OR from:supervielle OR from:macro OR from:visa OR from:mastercard OR from:amex OR subject:resumen OR subject:tarjeta)' 2>&1)

if [ $? -eq 0 ] && [ ! -z "$(echo "$RESULTS" | grep -v "No results")" ]; then
    echo "$(date): Found new bank/card emails!" >> "$LOGFILE"
    echo "$RESULTS" >> "$LOGFILE"
    
    # Notify Wally via Telegram
    openclaw message send --channel telegram --target 5054931521 --message "🏦 **NUEVOS RESÚMENES DETECTADOS**

Encontré mails nuevos de bancos/tarjetas en la última hora. 

Revisá tu Telegram para que procese los datos y actualice Airtable." 2>&1 >> "$LOGFILE"
    
else
    echo "$(date): No new bank/card emails found" >> "$LOGFILE"
fi