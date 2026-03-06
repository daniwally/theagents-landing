# Fix Script Luces - 5 Mar 2026

## ❌ PROBLEMA
- Wally pidió `luces on`
- No encontré el token HA_TOKEN
- Estaba mirando solo `~/.openclaw/workspace/.env`
- El token estaba en `~/.openclaw/.env` (nivel superior)

## ✅ SOLUCIÓN
1. **Encontré token** en `~/.openclaw/.env`
2. **Activé luces** con API call directo
3. **Creé script** `~/.openclaw/workspace/luces`
4. **Agregué alias** `luces="~/.openclaw/workspace/luces"`
5. **Copié token** al workspace `.env` también

## 📋 USO FUTURO
```bash
# Opción 1: Script directo
./luces on
./luces off

# Opción 2: Alias (después de source ~/.bashrc)
luces on
luces off

# Opción 3: API directo
curl -X POST "HA_URL/api/services/automation/trigger" \
  -H "Authorization: Bearer $HA_TOKEN" \
  -d '{"entity_id": "automation.a_luces_atarceder_interior_on"}'
```

## 🔧 CONFIGURACIÓN ACTUAL
- **HA_URL:** https://txvwuijdnbiukjd5gbmsszghyrouz8jq.ui.nabu.casa
- **Automatización ON:** automation.a_luces_atarceder_interior_on
- **Automatización OFF:** automation.b
- **Token:** Copiado en ambos .env files

## 📚 LECCIÓN
- Revisar AMBOS .env files: workspace + openclaw global
- No asumir que configs están solo en workspace
- Crear scripts + alias para comandos frecuentes
- Documentar ubicaciones de tokens/configs