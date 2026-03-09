# 🚀 Deploy en Railway - ACTUALIZADO

## ⚠️ IMPORTANTE: Necesitás una API key de Anthropic

El chat con Rock usa Claude de Anthropic. Necesitás:
1. Crear cuenta en [console.anthropic.com](https://console.anthropic.com)
2. Obtener una API key
3. Agregarla como `ANTHROPIC_API_KEY` en el backend

---

## Paso 1: Eliminar servicios anteriores que fallaron

1. En Railway, click en cada servicio que falló
2. Settings → Danger → Delete Service
3. Dejá solo **MongoDB** (que está Online)

---

## Paso 2: Crear servicio BACKEND

1. Click **"+ New"** → **"GitHub Repo"** → seleccioná tu repo
2. **ANTES de que empiece a buildear**, andá a **Settings**
3. En **"Source"** o **"Root Directory"**: escribí `backend`
4. En **Variables** agregá:

```
MONGO_URL = (copiar de MongoDB → Variables → MONGO_URL)
DB_NAME = theagents
CORS_ORIGINS = *
ANTHROPIC_API_KEY = tu-api-key-de-anthropic
```

5. Click **"Deploy"**
6. Esperá que termine (2-3 min)
7. En **Settings → Networking → Generate Domain**
8. **Copiá la URL** (ej: `https://backend-xxx.up.railway.app`)

---

## Paso 3: Crear servicio FRONTEND

1. Click **"+ New"** → **"GitHub Repo"** → seleccioná tu repo
2. Andá a **Settings**
3. En **"Source"** o **"Root Directory"**: escribí `frontend`
4. En **Variables** agregá:

```
REACT_APP_BACKEND_URL = https://tu-backend.up.railway.app
```
(usar la URL del paso 2)

5. En **Build Command** (si lo pide): `yarn install && yarn build`
6. En **Start Command** (si lo pide): `npx serve -s build -l $PORT`
7. Click **"Deploy"**
8. En **Settings → Networking → Generate Domain**

---

## Paso 4: Probar

1. Abrí la URL del frontend
2. Probá navegar la página
3. Probá el chat con Rock
4. Probá el formulario de trial

---

## Variables de entorno resumen:

### Backend:
| Variable | Valor |
|----------|-------|
| MONGO_URL | (copiar de MongoDB) |
| DB_NAME | theagents |
| CORS_ORIGINS | * |
| ANTHROPIC_API_KEY | sk-ant-... (tu key) |

### Frontend:
| Variable | Valor |
|----------|-------|
| REACT_APP_BACKEND_URL | https://tu-backend.up.railway.app |

---

## Si no tenés API key de Anthropic

El chat va a mostrar un mensaje de fallback pidiendo contactar por email.
Todo lo demás (landing, formulario, navegación) funciona igual.
