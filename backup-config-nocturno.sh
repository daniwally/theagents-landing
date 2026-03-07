#!/bin/bash
# Backup nocturno de configuración OpenClaw optimizada
# Ejecutar todos los días a las 2:00 AM

TIMESTAMP=$(date +"%Y%m%d-%H%M")
BACKUP_DIR="$HOME/.openclaw/backups"
CONFIG_FILE="$HOME/.openclaw/openclaw.json"

# Crear directorio backup si no existe
mkdir -p "$BACKUP_DIR"

# Backup de configuración principal
cp "$CONFIG_FILE" "$BACKUP_DIR/openclaw-$TIMESTAMP.json"

# Backup del workspace (archivos clave)
mkdir -p "$BACKUP_DIR/workspace-$TIMESTAMP"
cp -r "$HOME/.openclaw/workspace/MEMORY.md" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp -r "$HOME/.openclaw/workspace/memory" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp -r "$HOME/.openclaw/workspace/AGENTS.md" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp -r "$HOME/.openclaw/workspace/SOUL.md" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp -r "$HOME/.openclaw/workspace/USER.md" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp -r "$HOME/.openclaw/workspace/TOOLS.md" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp -r "$HOME/.openclaw/workspace/HEARTBEAT.md" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp -r "$HOME/.openclaw/workspace/IDENTITY.md" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true

# Backup skills configurados
cp -r "$HOME/.openclaw/workspace/skills" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true

# Backup scripts importantes
cp "$HOME/.openclaw/workspace/backup-config-nocturno.sh" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp "$HOME/.openclaw/workspace/luces" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true

# Backup archivos críticos de configuración
cp "$HOME/.openclaw/workspace/.env" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp "$HOME/.openclaw/workspace/memory/apis-configuraciones-completas.md" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp "$HOME/.openclaw/workspace/memory/skills-inventory-completo.md" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true
cp "$HOME/.openclaw/workspace/memory/wallingre-genealogia-libro.md" "$BACKUP_DIR/workspace-$TIMESTAMP/" 2>/dev/null || true

# Comprimir backup del workspace
cd "$BACKUP_DIR"
tar -czf "workspace-$TIMESTAMP.tar.gz" "workspace-$TIMESTAMP" 2>/dev/null
rm -rf "workspace-$TIMESTAMP" 2>/dev/null

# Limpiar backups antiguos (mantener últimos 30 días)
find "$BACKUP_DIR" -name "openclaw-*.json" -mtime +30 -delete 2>/dev/null
find "$BACKUP_DIR" -name "workspace-*.tar.gz" -mtime +30 -delete 2>/dev/null

# Log del backup
echo "$(date): Backup completado - Config: openclaw-$TIMESTAMP.json, Workspace: workspace-$TIMESTAMP.tar.gz" >> "$BACKUP_DIR/backup.log"

echo "✅ Backup nocturno completado: $TIMESTAMP"