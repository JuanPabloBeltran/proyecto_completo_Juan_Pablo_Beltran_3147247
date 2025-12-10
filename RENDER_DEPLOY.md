**Deploy a Node backend to Render**

Pasos para desplegar el backend (`proyecto/backend`) en Render:

- **1) Preparar el repositorio**: confirma que los cambios están commiteados y pusheados a GitHub (branch `main` en este ejemplo).

- **2) Conectar el repo en Render**:
  - Desde la consola de Render, crea un nuevo servicio y elige "Deploy from a Git repository".
  - Puedes usar la opción "Create from render.yaml" (se detectará `render.yaml` en la raíz) o crear manualmente el servicio.
  - Si creas manualmente, establece **Root Directory** a `proyecto/backend`.

- **3) Variables de entorno**:
  - Añade `DATABASE_URL` con la URL de tu Postgres (ej: `postgres://user:pass@host:5432/dbname`).
  - `NODE_ENV` ya está fijado a `production` en `render.yaml`, pero si lo configuras manualmente úsalo igualmente.
  - No subas secretos al repo. Usa el panel de Render para configurar `DATABASE_URL`.

- **4) Base de datos**:
  - Si usas la base de datos gestionada de Render, crea la base de datos y aplica el esquema SQL que está en `proyecto/backend/db.sql`.
  - Para aplicar `db.sql` puedes usar `psql` localmente o desde la consola de la DB:

```bash
# ejemplo local (asegúrate de tener psql instalado)
export DATABASE_URL="postgres://user:pass@host:5432/dbname"
psql "$DATABASE_URL" -f proyecto/backend/db.sql
```

- **5) Deploy**:
  - Si usaste `render.yaml`, Render leerá `root` y los comandos. Si creaste el servicio manualmente, asegúrate que `Build Command` sea `npm install` y `Start Command` sea `npm start` (y que `Root Directory` sea `proyecto/backend`).

- **6) Logs y debugging**:
  - Revisa los logs desde la consola de Render si el servicio falla.
  - Localmente puedes probar:

```bash
cd proyecto/backend
export DATABASE_URL="postgres://user:pass@host:5432/dbname"
npm install
npm start
```

Puntos importantes:
- `app.js` ya usa `process.env.PORT` y `process.env.DATABASE_URL`.
- No es necesario un `Procfile`.
- Si tu repo es un monorepo, recuerda establecer `Root Directory` a `proyecto/backend`.

Si quieres, puedo:
- Crear el servicio en Render por ti si me das permiso para generar el `render.yaml` con más detalles.
- Añadir scripts de migración para aplicar `db.sql` automáticamente.
