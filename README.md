# ServisMás

**Plataforma web para conectar clientes con prestadores de servicios.**

## Descripción

ServisMás es una plataforma web que conecta a personas que necesitan contratar servicios con profesionales y prestadores independientes que los ofrecen.

Los usuarios pueden registrarse como clientes o prestadores, explorar servicios disponibles, consultar perfiles y gestionar solicitudes de contratación.

La plataforma permite registrar y coordinar las solicitudes, incluyendo los costos acordados entre las partes. **ServisMás no procesa pagos**: la transacción económica se realiza directamente entre el cliente y el prestador.

## Demo

**Aplicación web:** [https://servismas-frontend-production.up.railway.app](https://servismas-frontend-production.up.railway.app)

## Tecnologías utilizadas

### Frontend
- React
- Vite
- React Router
- CSS Modules
- React Hook Form
- Zod
- Lucide React

### Backend
- Node.js
- Express
- MySQL
- mysql2
- JSON Web Tokens (JWT)
- bcrypt

### Infraestructura
- Railway (despliegue del frontend, backend y base de datos).
- GitHub (control de versiones y despliegue automático).

## Estructura del proyecto

El repositorio está organizado como un monorepositorio:

```text
servismas/
├── frontend/
│   └── ...
├── backend/
│   └── ...
└── README.md
```

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Martin-J-Larre/servismas.git
cd servismas
```

### 2. Configurar el backend

Ingresar al directorio:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` tomando como referencia `.env.example` y completar las variables de entorno:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=servismas

JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=1d
```

Es necesario contar con una instancia local de MySQL y tener creada la base de datos con su estructura correspondiente.

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El backend estará disponible en:

`http://localhost:3000`

### 3. Configurar el frontend

Abrir una segunda terminal e ingresar al directorio:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` en la carpeta `frontend` con la URL del backend:

```env
VITE_API_URL=http://localhost:3000/api
```

Iniciar la aplicación:

```bash
npm run dev
```

El frontend estará disponible en:

`http://localhost:5173`

## Despliegue

El proyecto se encuentra desplegado en Railway. El repositorio está conectado a la plataforma para permitir despliegues automáticos cuando se incorporan cambios a la rama `main`.

## Autor

**Martín Javier Larré**

Proyecto desarrollado en el marco del Trabajo Final de Grado de la Licenciatura en Informática de la Universidad Siglo 21.