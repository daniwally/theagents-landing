# 🚀 INSTRUCCIONES PARA OLIVER - INSTALAR GOG v0.12.0 OFICIAL

## DESCARGA DIRECTA DESDE GITHUB (RECOMENDADO)

### 1. DESCARGAR GOG v0.12.0 OFICIAL
```bash
# Crear directorio
mkdir -p ~/.npm-global/bin/

# Descargar versión oficial Linux x64
wget https://github.com/steipete/gogcli/releases/download/v0.12.0/gogcli_0.12.0_linux_amd64.tar.gz

# Extraer
tar -xzf gogcli_0.12.0_linux_amd64.tar.gz

# Instalar
mv gog ~/.npm-global/bin/gog
chmod +x ~/.npm-global/bin/gog

# Limpiar
rm gogcli_0.12.0_linux_amd64.tar.gz
```

### 2. CONFIGURAR PATH
```bash
export PATH="$HOME/.npm-global/bin:$PATH"
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 3. VERIFICAR INSTALACIÓN
```bash
gog --version
# Debe mostrar: v0.12.0

gog auth --help | grep service-account
# Debe mostrar: service-account <command>
```

### 4. CONFIGURAR SERVICE ACCOUNT
```bash
gog auth service-account set oliver@wtf-agency.com --key file_386---6dd700a0-de39-46fe-afb5-f99e5717bee2.json
```

### 5. VERIFICAR FUNCIONAMIENTO
```bash
gog auth list
# Debe mostrar: oliver@wtf-agency.com    service-account

gog gmail search 'newer_than:1d' --account oliver@wtf-agency.com --max 3
# Debe mostrar emails sin errores
```

## ALTERNATIVA - HOMEBREW EN LINUX
```bash
# Si tenés Homebrew instalado en Linux:
brew install steipete/tap/gogcli

# Verificar
gog --version
```

## RESULTADO ESPERADO
✅ `gog --version` → v0.12.0 (versión más nueva que la de Dora)  
✅ `gog auth list` → oliver@wtf-agency.com service-account  
✅ `gog gmail search` → Funciona sin errores  

---
**VENTAJA:** Versión oficial más nueva (v0.12.0 vs v0.10.0) con mejoras y soporte completo service account.