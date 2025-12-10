# 🚀 Despliegue en Netlify

Este proyecto está configurado para desplegarse en Netlify con funciones serverless.

## Pasos para conectar con Netlify

### 1. **Crear cuenta en Netlify** (si no tienes)
- Ve a [netlify.com](https://netlify.com)
- Crea una cuenta o inicia sesión

### 2. **Conectar tu repositorio de GitHub**
```bash
# En la raíz del proyecto, haz un commit y push
git add .
git commit -m "Configuración para Netlify"
git push origin main
```

### 3. **Crear un nuevo sitio**
- En Netlify, click en **"Add new site"** → **"Import an existing project"**
- Selecciona **GitHub** y autoriza
- Selecciona tu repositorio: `JuanPabloBeltran/proyecto_completo_Juan_Pablo_Beltran_3147247`

### 4. **Configurar variables de entorno**
En Netlify Dashboard → **Site settings** → **Build & deploy** → **Environment**

Agrega estas variables:
```
DATABASE_URL = postgresql://usuario:contraseña@host:5432/basedatos
NODE_ENV = production
```

**Obtén tu DATABASE_URL:**
- Si usas **PostgreSQL local/Railway/Neon/Render**, copia la URL de conexión
- Formato: `postgresql://usuario:contraseña@host:puerto/basedatos`

### 5. **Configurar build settings**
En Netlify, verifica que tenga:
- **Base directory:** (dejar vacío)
- **Build command:** `npm install`
- **Publish directory:** `proyecto/frontend`

Esto ya está configurado en `netlify.toml`, debería detectarlo automáticamente.

### 6. **Deploy automático**
- Una vez configurado, cada `git push` desplegará automáticamente
- El sitio estará en: `https://tu-sitio.netlify.app`

---

## Estructura para Netlify

```
proyecto_completo_Juan_Pablo_Beltran_3147247/
├── netlify.toml              ← Configuración Netlify
├── package.json              ← Dependencias raíz
├── functions/                ← Funciones serverless
│   ├── tasks.js              ← GET/POST tasks
│   └── tasks-detail.js       ← PUT/PATCH/DELETE tasks
├── proyecto/
│   ├── frontend/
│   │   ├── index.html        ← Moderno con colores naranjas
│   │   ├── styles.css        ← Estilos nuevos
│   │   └── app.js            ← Se conecta a /.netlify/functions
│   └── backend/
│       ├── app.js            ← No se usa en Netlify
│       └── package.json
└── README.md
```

---

## URLs de las funciones

Una vez desplegado, los endpoints serán:

| Método | Endpoint | Función |
|--------|----------|---------|
| GET | `/.netlify/functions/tasks` | Obtener todas las tareas |
| POST | `/.netlify/functions/tasks` | Crear nueva tarea |
| PATCH | `/.netlify/functions/tasks-detail?id=1` | Marcar completa |
| DELETE | `/.netlify/functions/tasks-detail?id=1` | Eliminar tarea |

El frontend automáticamente usa `/.netlify/functions` cuando se detecta que NO es localhost.

---

## Desarrollo local con Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# O si ya lo hiciste:
# npm install -g serve

# Desploy local para probar
cd /workspaces/proyecto_completo_Juan_Pablo_Beltran_3147247

# Método 1: Netlify dev (requiere CLI)
netlify dev

# Accede a http://localhost:8888

# Método 2: Servir frontend local
cd proyecto/frontend
python3 -m http.server 3000

# Tendrás que tener el backend corriendo aparte:
cd proyecto/backend
npm run dev
```

---

## Solución de problemas

### ❌ "DATABASE_URL not found"
Verifica que agregaste la variable de entorno en Netlify → Site settings → Environment variables

### ❌ "CORS error en el navegador"
Las funciones de Netlify ya tienen CORS habilitado en el código, debe funcionar.

### ❌ "404 en /.netlify/functions/tasks"
Espera a que Netlify termime el deploy (puede tardar 1-2 minutos).

### ❌ "Connection refused en la BD"
Verifica que:
1. El DATABASE_URL es correcto
2. Tu BD está activa y accessible desde internet
3. Firewall permite conexiones desde Netlify

---

## Comandos rápidos

```bash
# Hacer cambios y deployar
git add .
git commit -m "Cambios"
git push origin main

# Ver logs en vivo
netlify logs

# Ver variables de entorno (desde CLI)
netlify env:list

# Deployar manualmente (si lo necesitas)
netlify deploy --prod
```

---

## URL final

Una vez todo esté configurado, tu sitio estará en:

🌐 **https://tu-sitio.netlify.app**

¡Listo para producción! 🎉
