#!/bin/bash

# CHECK AUTOMÁTICO GMAIL DORA - CADA 2 HORAS
# Busca mails importantes y alerta si encuentra algo crítico

LOGFILE="$HOME/.openclaw/workspace/gmail-check.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] Iniciando check Gmail dora@wtf-agency.com" >> $LOGFILE

# Check mails AWS últimas 2 horas
AWS_MAILS=$(gog gmail search 'newer_than:2h from:aws' --account dora@wtf-agency.com --max 5 2>/dev/null)
if [ -n "$AWS_MAILS" ] && [ "$AWS_MAILS" != "No results" ]; then
    echo "[$DATE] 🚨 MAILS AWS NUEVOS:" >> $LOGFILE
    echo "$AWS_MAILS" >> $LOGFILE
    # Enviar alerta a Wally por Telegram si es crítico
    if echo "$AWS_MAILS" | grep -i "credit\|billing\|suspend\|overdue"; then
        echo "🚨 AWS ALERT: Mails críticos detectados - revisar Gmail" | tee -a $LOGFILE
    fi
fi

# Check resúmenes bancarios últimas 2 horas  
BANK_MAILS=$(gog gmail search 'newer_than:2h (from:banco OR from:galicia OR from:supervielle OR from:macro OR from:visa OR from:mastercard OR from:amex OR subject:resumen OR subject:tarjeta)' --account dora@wtf-agency.com --max 5 2>/dev/null)
if [ -n "$BANK_MAILS" ] && [ "$BANK_MAILS" != "No results" ]; then
    echo "[$DATE] 💰 RESÚMENES BANCARIOS NUEVOS:" >> $LOGFILE
    echo "$BANK_MAILS" >> $LOGFILE
    
    # Auto-proceso con skill finanzas-wally
    echo "[$DATE] Procesando con skill finanzas-wally..." >> $LOGFILE
    # TODO: Integrar con skill para auto-procesamiento
fi

# Check mails de clientes importantes últimas 2 horas
CLIENT_MAILS=$(gog gmail search 'newer_than:2h (from:cliente OR from:propuesta OR from:presupuesto OR subject:urgente OR subject:urgent)' --account dora@wtf-agency.com --max 3 2>/dev/null)
if [ -n "$CLIENT_MAILS" ] && [ "$CLIENT_MAILS" != "No results" ]; then
    echo "[$DATE] 📧 MAILS CLIENTES IMPORTANTES:" >> $LOGFILE  
    echo "$CLIENT_MAILS" >> $LOGFILE
fi

echo "[$DATE] Check Gmail completado" >> $LOGFILE
echo "---" >> $LOGFILE