# 📋 Guía para ejecutar el proyecto de Lista de Tareas

## Cambios realizados
✅ Se cambió la paleta de colores:
- **Azul** → **Naranja** (#f97316) - Botones y título principal
- **Verde claro** → **Verde menta** (#d1f5e8) - Tareas completadas
- **Rojo claro** → **Rojo suave** (#ffe0e0) - Tareas pendientes
- Fondo blanco → Gris claro (#f3f4f6) para mejor contraste
- Se eliminaron completamente los colores azules y morados
- Se mejoró el diseño visual con sombras, transiciones y efectos hover

## Requisitos previos

1. **Node.js** (versión 14 o superior)
2. **PostgreSQL** instalado y corriendo
3. **npm** (incluido con Node.js)

## Instalación y ejecución

### Paso 1: Instalar dependencias del backend

```bash
cd /workspaces/proyecto_completo_Juan_Pablo_Beltran_3147247/proyecto/backend
npm install
```

### Paso 2: Configurar la base de datos PostgreSQL

Abre tu cliente de PostgreSQL (psql o pgAdmin) y ejecuta:

```sql
-- Conectarte a tu base de datos
psql -U tu_usuario -d tu_base_datos

-- Luego copia el contenido de db.sql y ejecútalo
```

O directamente desde terminal:

```bash
psql -U tu_usuario -d tu_base_datos -f /workspaces/proyecto_completo_Juan_Pablo_Beltran_3147247/proyecto/backend/db.sql
```

### Paso 3: Crear archivo .env en el backend

Crea un archivo `.env` en la carpeta `backend`:

```bash
cd /workspaces/proyecto_completo_Juan_Pablo_Beltran_3147247/proyecto/backend
```

Crea el archivo `.env` con este contenido:

```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://tu_usuario:tu_contraseña@localhost:5432/tu_base_datos
```

**Reemplaza:**
- `tu_usuario` → Tu usuario de PostgreSQL (ej: postgres)
- `tu_contraseña` → Tu contraseña de PostgreSQL
- `tu_base_datos` → El nombre de tu base de datos (ej: tareas_db)

### Paso 4: Iniciar el backend

```bash
cd /workspaces/proyecto_completo_Juan_Pablo_Beltran_3147247/proyecto/backend
npm run dev
```

Deberías ver: `Server running on port 4000`

### Paso 5: Abrir el frontend (en otra terminal)

```bash
cd /workspaces/proyecto_completo_Juan_Pablo_Beltran_3147247/proyecto/frontend
```

Abre `index.html` en tu navegador. Puedes:

**Opción A: Servir con Python (recomendado)**
```bash
python3 -m http.server 3000
```

Luego abre: `http://localhost:3000`

**Opción B: Abrir directamente en el navegador**
```bash
# En Linux/Mac
open index.html

# En Windows
start index.html
```

## Resumen rápido de comandos

```bash
# Terminal 1: Backend
cd /workspaces/proyecto_completo_Juan_Pablo_Beltran_3147247/proyecto/backend
npm install
npm run dev

# Terminal 2: Frontend
cd /workspaces/proyecto_completo_Juan_Pablo_Beltran_3147247/proyecto/frontend
python3 -m http.server 3000

# Luego abre en el navegador:
# http://localhost:3000
```

## Características de la aplicación

✅ **Agregar tareas** - Escribe título y descripción
✅ **Marcar completadas** - Click en el botón ✔️
✅ **Eliminar tareas** - Click en el botón ❌
✅ **Interfaz moderna** - Colores naranjas, verdes y grises

## Solución de problemas

### Error: "Cannot find module 'pg'"
```bash
npm install
```

### Error: "database does not exist"
Crea la base de datos primero:
```bash
createdb -U tu_usuario tu_base_datos
```

### El frontend no conecta al backend
Verifica que:
1. El backend está corriendo en `http://localhost:4000`
2. En `index.html` el `API_BASE` está configurado correctamente (línea 27)
3. No hay errores de CORS (revisa la consola del navegador)

¡Listo! Tu aplicación de tareas con nuevo estilo está lista para usar. 🎉
