# Instalación Skill Finanzas Wally

## Archivo Empaquetado
📦 **finanzas-wally.skill** (8.3KB) → Listo para distribuir

## Instalación Rápida

### 1. Copiar skill a directorio de skills
```bash
# Si tienes el archivo finanzas-wally.skill
unzip finanzas-wally.skill -d ~/.openclaw/workspace/skills/
```

### 2. Configurar API Token
```bash
# Agregar token a .env
echo "AIRTABLE_API_KEY=pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e" >> ~/.env
```

### 3. Hacer scripts ejecutables
```bash
chmod +x ~/.openclaw/workspace/skills/finanzas-wally/scripts/*.sh
```

### 4. Test de funcionamiento
```bash
# Verificar vencimientos
~/.openclaw/workspace/skills/finanzas-wally/scripts/check-vencimientos-final.sh

# Agregar gasto de prueba
~/.openclaw/workspace/skills/finanzas-wally/scripts/add-gasto-airtable.sh "Test" "2026-03-05" "2026-03-10" "1000" "Galicia" "Prueba" "Todo"
```

## Contenido de la Skill

### Scripts (4)
- ✅ `check-vencimientos-final.sh` → Alertas automáticas
- ✅ `add-gasto-airtable.sh` → Agregar gastos
- ✅ `airtable-utils.js` → Funciones JS
- ✅ `update-airtable-fields.sh` → Actualizar registros

### Referencias (2)
- 📋 `airtable-config.md` → Configuración técnica completa
- 🔄 `workflows.md` → Ejemplos y casos de uso

### Documentación Principal
- 📖 `SKILL.md` → Guía completa de uso

## Datos Airtable Incluidos

### Configuración
- Base ID: `appK3sEL2Z2NLcQnA`
- Table ID: `tbl8B9PKPUnYcW4Va`
- URL: https://airtable.com/appK3sEL2Z2NLcQnA/tbl8B9PKPUnYcW4Va

### Campos Estructurados
- Fecha_Recibimiento (Date)
- Fecha_Vencimiento (Date)
- Monto (Currency $)
- Banco (Select)
- Status (Todo/Done)

## Resultado
🎯 **NUNCA MÁS** olvidar configuración
🎯 **NUNCA MÁS** preguntar montos ya procesados
🎯 **Alertas automáticas** de vencimientos
🎯 **Sistema completo** documentado y empaquetado

Fecha de creación: 5 Mar 2026
Creado por: Dora 🗺️