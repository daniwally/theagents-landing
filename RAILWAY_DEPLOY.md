# 🚀 Guía Completa: Deploy en Railway

## Paso 1: Crear cuenta en Railway

1. Abrí [railway.app](https://railway.app)
2. Click en **"Login"** arriba a la derecha
3. Elegí **"Login with GitHub"**
4. Autorizá Railway en tu cuenta de GitHub

---

## Paso 2: Subir código a GitHub (si no lo hiciste)

### Opción A: Desde Emergent
1. En Emergent, buscá el botón **"Download"** o **"Export to GitHub"**
2. Seguí las instrucciones

### Opción B: Manual (si descargaste el código)
```bash
# En tu terminal, dentro de la carpeta del proyecto:
git init
git add .
git commit -m "Initial commit - The Agents Landing"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

---

## Paso 3: Crear proyecto en Railway

1. En Railway, click en **"New Project"** (botón morado)
2. Seleccioná **"Deploy from GitHub repo"**
3. Si es la primera vez, click en **"Configure GitHub App"**
4. Seleccioná tu repositorio de la lista
5. Click en **"Deploy Now"**

⚠️ **IMPORTANTE**: Por ahora va a fallar, es normal. Necesitamos configurar los servicios.

---

## Paso 4: Agregar MongoDB

1. En tu proyecto de Railway, click en **"+ New"** (arriba a la derecha)
2. Seleccioná **"Database"**
3. Elegí **"MongoDB"**
4. Esperá que se cree (1-2 minutos)
5. Click en el servicio **MongoDB**
6. Andá a la pestaña **"Variables"**
7. Buscá y **copiá** el valor de `MONGO_URL` (algo como `mongodb://mongo:password@...`)

---

## Paso 5: Configurar el Backend

1. Click en **"+ New"** → **"GitHub Repo"**
2. Seleccioná tu mismo repositorio
3. Railway va a crear un nuevo servicio

### Configurar Settings:
1. Click en el nuevo servicio
2. Andá a **"Settings"**
3. En **"Root Directory"** escribí: `backend`
4. En **"Build Command"** escribí: `pip install -r requirements.txt`
5. En **"Start Command"** escribí: `uvicorn server:app --host 0.0.0.0 --port $PORT`

### Agregar Variables:
1. Andá a la pestaña **"Variables"**
2. Click en **"+ New Variable"** y agregá estas una por una:

| Variable | Valor |
|----------|-------|
| `MONGO_URL` | (pegar la URL que copiaste del paso 4) |
| `DB_NAME` | `theagents` |
| `CORS_ORIGINS` | `*` |
| `EMERGENT_LLM_KEY` | `sk-emergent-d9977091985E136577` |

### Generar dominio público:
1. En **"Settings"** → buscá **"Networking"** o **"Domains"**
2. Click en **"Generate Domain"**
3. **Copiá la URL** que te genera (ej: `https://tu-backend-production.up.railway.app`)

---

## Paso 6: Configurar el Frontend

1. Click en **"+ New"** → **"GitHub Repo"**
2. Seleccioná tu mismo repositorio (sí, otra vez)
3. Railway crea otro servicio

### Configurar Settings:
1. Click en el nuevo servicio
2. Andá a **"Settings"**
3. En **"Root Directory"** escribí: `frontend`
4. En **"Build Command"** escribí: `yarn install && yarn build`
5. En **"Start Command"** escribí: `npx serve -s build -l $PORT`

### Agregar Variables:
1. Andá a la pestaña **"Variables"**
2. Agregá esta variable:

| Variable | Valor |
|----------|-------|
| `REACT_APP_BACKEND_URL` | (pegar la URL del backend del paso 5) |

### Generar dominio público:
1. En **"Settings"** → **"Networking"** o **"Domains"**
2. Click en **"Generate Domain"**
3. Esta URL es tu **sitio web final**

---

## Paso 7: Deploy

1. Volvé a la vista general del proyecto (click en el nombre del proyecto arriba)
2. Si hay cambios pendientes, vas a ver **"Apply X changes"**
3. Click en **"Deploy"**
4. Esperá 3-5 minutos a que todo se construya

---

## Paso 8: Verificar

1. Abrí la URL del **Frontend** en el navegador
2. Verificá que carga la landing
3. Probá el chat de Rock
4. Probá el formulario de trial

---

## 🎉 ¡Listo! Tu sitio está online

### URLs finales:
- **Frontend (sitio web)**: `https://tu-frontend-production.up.railway.app`
- **Backend (API)**: `https://tu-backend-production.up.railway.app`

---

## ❓ Problemas comunes

### "Build failed" en Backend
- Verificá que el Root Directory sea exactamente `backend`
- Revisá los logs para ver el error específico

### "Build failed" en Frontend
- Verificá que el Root Directory sea exactamente `frontend`
- Asegurate que `REACT_APP_BACKEND_URL` tenga la URL correcta del backend

### El chat no funciona
- Verificá que `EMERGENT_LLM_KEY` esté configurada en el backend
- Revisá que el backend tenga dominio público generado

### La página carga pero no conecta al backend
- Verificá que `REACT_APP_BACKEND_URL` sea la URL correcta
- La URL debe incluir `https://` al principio
- No debe tener `/` al final

---

## 📧 Soporte

Si tenés problemas, podés:
1. Revisar los **Logs** de cada servicio en Railway
2. Contactar a hello@wtf-agency.com
