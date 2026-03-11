# 🔧 INSTRUCCIONES PARA OLIVER - ACTUALIZAR GOG CLI

## PROBLEMA IDENTIFICADO
Tu versión de `gog` NO soporta service accounts. Necesitás la versión v0.10.0.

## SOLUCIÓN PASO A PASO

### 1. VERIFICAR VERSIÓN ACTUAL
```bash
gog --version
gog auth --help | grep service-account
```
**Si no aparece "service-account" → necesitás actualizar**

### 2. RESPALDAR VERSIÓN ACTUAL (opcional)
```bash
which gog
mv $(which gog) $(which gog).backup
```

### 3. CREAR DIRECTORIO PARA NUEVO GOG
```bash
mkdir -p ~/.npm-global/bin/
```

### 4. DESCARGAR GOG v0.10.0 CORRECTO
**Wally te enviará el archivo binario `gog`**

### 5. INSTALAR NUEVO GOG
```bash
# Copiar el archivo que te envíe Wally a:
cp gog ~/.npm-global/bin/gog
chmod +x ~/.npm-global/bin/gog
```

### 6. CONFIGURAR PATH
```bash
export PATH="$HOME/.npm-global/bin:$PATH"
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 7. VERIFICAR NUEVA VERSIÓN
```bash
gog --version
# Debe mostrar: v0.10.0 (a92bd63 2026-02-14T03:32:49Z)

gog auth --help | grep service-account
# Debe mostrar: service-account <command>
```

### 8. CONFIGURAR SERVICE ACCOUNT
```bash
gog auth service-account set oliver@wtf-agency.com --key file_386---6dd700a0-de39-46fe-afb5-f99e5717bee2.json
```

### 9. VERIFICAR CONFIGURACIÓN
```bash
gog auth list
# Debe mostrar: oliver@wtf-agency.com    service-account

gog gmail search 'newer_than:1d' --account oliver@wtf-agency.com --max 3
# Debe mostrar emails sin errores
```

## TROUBLESHOOTING

### SI SIGUE SIN FUNCIONAR:
```bash
# Verificar que gog correcto está en PATH
which gog
# Debe mostrar: /home/ubuntu/.npm-global/bin/gog

# Verificar permisos
ls -la ~/.npm-global/bin/gog
# Debe mostrar: -rwxr-xr-x

# Reiniciar sesión
logout
# O restart terminal
```

### SI NO ENCUENTRA gog:
```bash
# Verificar PATH
echo $PATH | grep npm-global
# Si no aparece, ejecutar:
export PATH="$HOME/.npm-global/bin:$PATH"
```

## RESULTADO ESPERADO
✅ `gog --version` → v0.10.0  
✅ `gog auth list` → oliver@wtf-agency.com service-account  
✅ `gog gmail search` → Funciona sin errores  

## ARCHIVOS NECESARIOS DE WALLY
1. **Binario gog v0.10.0** (archivo ejecutable)
2. **Service account JSON** (ya lo tenés: file_386---6dd700a0-de39-46fe-afb5-f99e5717bee2.json)

Una vez que tengas el binario correcto, toda la configuración va a funcionar perfectamente.

---
**NOTA:** El domain-wide delegation ya está configurado para todo @wtf-agency.com. Solo necesitás la versión correcta de gog.