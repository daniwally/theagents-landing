# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

### Home Assistant
- URL: https://txvwuijdnbiukjd5gbmsszghyrouz8jq.ui.nabu.casa
- Instance: We Rock House (HA Green, 2026.2.2, Nabu Casa)
- Token: Long-lived access token (válido 10 años), en .env (HA_TOKEN)
- 442 entidades: 57 luces, 17 switches, 111 sensores, 6 media players, 18 automatizaciones
- Zonas principales: Living, Comedor, Cocina, Dormitorio, Playroom, Estudio, Cuarto Calu, Cochera, Jardín, Exterior/Galería, Pileta, Balcón
- Media: Sonos Living Room, Samsung The Frame 75 (living), Samsung 65 (cocina), Samsung 75 (dormitorio), FlowBox Z3
- Riego: Jardín trasero + delantero + front
- Pileta: Luz led + válvula smart
- Cortina: cuarto (unavailable)

### Automatizaciones frecuentes
- "Prendé las luces de adentro/interior" → `automation.a_luces_atarceder_interior_on` (trigger)
- "Apagá las luces de adentro/interior" → `automation.b` (Luces interior Off, trigger)

### Scripts disponibles
- `luces on` → Prende luces interior (alias + script en workspace)
- `luces off` → Apaga luces interior  
- `./luces on|off` → Script directo sin alias

Add whatever helps you do your job. This is your cheat sheet.
