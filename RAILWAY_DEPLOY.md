# The Agents - AI Agents Landing Page

## Deploy en Railway

### Paso 1: Crear cuenta en Railway
1. Ir a [railway.app](https://railway.app)
2. Crear cuenta con GitHub

### Paso 2: Crear proyecto nuevo
1. Click en "New Project"
2. Seleccionar "Deploy from GitHub repo"
3. Conectar tu repositorio

### Paso 3: Agregar MongoDB
1. En tu proyecto, click en "+ New"
2. Seleccionar "Database" → "MongoDB"
3. Railway te dará una `MONGO_URL` automática

### Paso 4: Configurar Backend
1. Click en "+ New" → "GitHub Repo" → seleccionar tu repo
2. En Settings → configurar:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

3. En Variables, agregar:
   ```
   MONGO_URL=<copiar de MongoDB service>
   DB_NAME=theagents
   CORS_ORIGINS=*
   EMERGENT_LLM_KEY=<tu key>
   ```

### Paso 5: Configurar Frontend
1. Click en "+ New" → "GitHub Repo" → seleccionar tu repo
2. En Settings → configurar:
   - **Root Directory**: `frontend`
   - **Build Command**: `yarn install && yarn build`
   - **Start Command**: `npx serve -s build -l $PORT`

3. En Variables, agregar:
   ```
   REACT_APP_BACKEND_URL=<URL del backend service>
   ```

### Paso 6: Generar dominios
1. En cada service, ir a Settings → Domains
2. Click en "Generate Domain"

### URLs finales
- Frontend: `https://tu-frontend.up.railway.app`
- Backend: `https://tu-backend.up.railway.app`
