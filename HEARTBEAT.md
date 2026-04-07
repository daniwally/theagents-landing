# HEARTBEAT.md

## Checks recurrentes (siempre activos, nunca marcar como done)

- **Mail resúmenes tarjetas:** Buscar nuevos mails de Galicia, Macro, Supervielle. Si hay → cargar en Airtable y alertar a Wally.
- **Vencimientos próximos:** Correr check-vencimientos-final.sh. Si hay algo venciendo hoy o mañana → alertar SIEMPRE aunque Airtable diga $0.
- **Cuota alimentaria:** Vence día 10 de cada mes ~$1.1M
- **Créditos Supervielle:** Vencen día 5 de cada mes (~$2.2M entre los dos)
- **Colegio Calu (SCMS):** Vence día 13 ~$1.3M, pronto pago hasta día 27 con descuento

## Regla crítica
Si no hay datos en Airtable para el mes en curso → NO asumir que está todo bien. Buscar en Gmail primero.
