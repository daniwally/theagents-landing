# 🎉 FERMIN - SERVICE ACCOUNT EXCLUSIVO @agents.wtf 

## ¡PROBLEMA RESUELTO!

Wally logró resolver el problema de organization policies en @agents.wtf. Ahora tenés **tu propio service account** exclusivo para **fermin@agents.wtf** con acceso Gmail estable sin timeouts.

## IMPORTANTE:
🔐 **Este service account es SOLO PARA VOS** - completamente separado del que usan Dora/Gasper/Oliver en @wtf-agency.com  
🏢 **Dominio exclusivo:** Solo funciona para @agents.wtf  
🔒 **Sin conflictos:** Zero interferencia con otros agentes/dominios

## LO QUE YA ESTÁ HECHO:
✅ **Service account creado** para @agents.wtf  
✅ **Organization policy "Disable service account key creation" DESACTIVADA**  
✅ **JSON key generado** 
✅ **Domain-wide delegation habilitado**

## LO QUE FALTA:
1. **Configurar scopes en Google Workspace Admin @agents.wtf**
2. **Configurar gog con el service account**

## PASOS PARA COMPLETAR:

### PASO 1: GOOGLE WORKSPACE ADMIN @agents.wtf
1. **Ir a:** https://admin.google.com (con tu cuenta admin @agents.wtf)
2. **Security → API controls → Domain-wide delegation**  
3. **"Add new"** con estos datos:
   - **Client ID:** [Wally te va a dar el Client ID específico]
   - **OAuth scopes:** 
     ```
     https://www.googleapis.com/auth/gmail.modify,https://www.googleapis.com/auth/gmail.settings.basic,https://www.googleapis.com/auth/gmail.settings.sharing,https://www.googleapis.com/auth/calendar,https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/presentations,https://www.googleapis.com/auth/spreadsheets,https://www.googleapis.com/auth/contacts,https://www.googleapis.com/auth/contacts.other.readonly,https://www.googleapis.com/auth/directory.readonly,https://www.googleapis.com/auth/tasks,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/userinfo.profile
     ```
4. **Save/Authorize**

### PASO 2: CONFIGURAR GOG (en tu EC2)
```bash
gog auth service-account set fermin@agents.wtf --key agents-service-account.json
```
[Wally te va a enviar el archivo JSON]

### PASO 3: VERIFICAR
```bash
gog auth list
# Debe mostrar: fermin@agents.wtf    service-account

gog gmail search 'newer_than:1d' --account fermin@agents.wtf --max 3
# Debe mostrar emails sin errores
```

## ARQUITECTURA SEPARADA:
- **@wtf-agency.com:** Service account compartido para Dora, Gasper, Oliver
- **@agents.wtf:** Service account exclusivo para Fermin (ESTE)
- **Cero conflictos:** Cada dominio independiente

## RESULTADO PARA FERMIN:
✅ **Acceso Gmail completo** sin timeouts para fermin@agents.wtf  
✅ **Método 100% estable** (mismo que funciona para los otros)  
✅ **Todos los scopes:** Gmail, Calendar, Drive, Docs, Sheets, Slides  
✅ **Exclusivamente tuyo:** Sin dependencias de otros agentes  

## PRÓXIMO:
Una vez configurado, vas a tener el método más estable para automatización Gmail. ¡Se acabaron los problemas de timeout!

**Esperando que Wally te envíe:**
1. **Client ID** específico para domain-wide delegation
2. **Archivo JSON** del service account

---
**¡Ya casi terminamos! Solo faltan estos pasos finales.**