#!/bin/bash

# Script para ejecutar el proyecto de Lista de Tareas

echo "🚀 Iniciando aplicación de Lista de Tareas..."
echo ""

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo primero."
    exit 1
fi

# Verificar que npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instálalo primero."
    exit 1
fi

BACKEND_DIR="/workspaces/proyecto_completo_Juan_Pablo_Beltran_3147247/proyecto/backend"
FRONTEND_DIR="/workspaces/proyecto_completo_Juan_Pablo_Beltran_3147247/proyecto/frontend"

echo "📦 Instalando dependencias del backend..."
cd "$BACKEND_DIR"
npm install

echo ""
echo "✅ Dependencias instaladas correctamente"
echo ""
echo "⚠️  IMPORTANTE: Antes de continuar, asegúrate de:"
echo "  1. Tener PostgreSQL instalado y corriendo"
echo "  2. Haber creado el archivo .env en la carpeta backend con tus credenciales"
echo "  3. Haber ejecutado db.sql para crear la tabla de tareas"
echo ""
echo "Para crear .env, usa este template:"
echo "  PORT=4000"
echo "  NODE_ENV=development"
echo "  DATABASE_URL=postgresql://tu_usuario:tu_contraseña@localhost:5432/tu_base_datos"
echo ""
read -p "¿Deseas continuar? (s/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo ""
    echo "🔧 Iniciando backend en puerto 4000..."
    cd "$BACKEND_DIR"
    npm run dev &
    BACKEND_PID=$!
    
    sleep 2
    
    echo ""
    echo "🌐 Iniciando frontend en puerto 3000..."
    cd "$FRONTEND_DIR"
    python3 -m http.server 3000 &
    FRONTEND_PID=$!
    
    echo ""
    echo "✅ ¡Aplicación iniciada!"
    echo ""
    echo "📍 Accede aquí:"
    echo "   Frontend:  http://localhost:3000"
    echo "   Backend:   http://localhost:4000"
    echo ""
    echo "⏹️  Para detener presiona Ctrl+C"
    echo ""
    
    wait
else
    echo "Abortado."
    exit 0
fi
