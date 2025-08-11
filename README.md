# Proyecto Fullstack con PHP, PostgreSQL y React usando Docker

Este proyecto es una aplicación fullstack con:
- **Backend:** PHP 8.2 + Apache
- **Base de datos:** PostgreSQL
- **Frontend:** React con Vite
- **Orquestación:** Docker Compose

---

## 🚀 Requisitos previos
- Tener instalado **Docker** y **Docker Compose** en tu máquina.
- Tener la carpeta del proyecto con esta estructura:

```
/backend
  ├── index.php
  ├── Dockerfile.php
/frontend
  ├── package.json
  ├── vite.config.js
  ├── src/
  ├── Dockerfile.react
docker-compose.yml
```

---

## 📦 Instalación y ejecución

1. **Clonar el repositorio** (o copiar los archivos en tu máquina):

```bash
git clone https://github.com/usuario/mi-proyecto.git
cd mi-proyecto
```

2. **Levantar los contenedores**:

```bash
docker-compose up --build
```

Esto creará y levantará 3 contenedores:
- `php_backend` → Servidor Apache con PHP y conexión a PostgreSQL.
- `db_postgres` → Base de datos PostgreSQL.
- `react_frontend` → Servidor de desarrollo de React.

---

## 🌐 Acceso a los servicios

- **Frontend (React)** → [http://localhost:3000](http://localhost:3000)  
- **Backend (PHP API)** → [http://localhost:4000](http://localhost:4000)  
- **Base de datos PostgreSQL**:
  - Host: `localhost`
  - Puerto: `5432`
  - Usuario: `postgres`
  - Contraseña: `postgres`
  - Base de datos: `mydb`

---

## 🛠️ Comandos útiles

- **Parar los contenedores**:
```bash
docker-compose down
```

- **Recrear los contenedores desde cero**:
```bash
docker-compose down -v
docker-compose up --build
```

- **Entrar al contenedor de PostgreSQL**:
```bash
docker exec -it db_postgres psql -U postgres -d mydb
```

- **Entrar al contenedor de PHP**:
```bash
docker exec -it php_backend bash
```

- **Entrar al contenedor de React**:
```bash
docker exec -it react_frontend sh
```

---

## 📁 Archivos importantes

### `Dockerfile.php`
```dockerfile
FROM php:8.2-apache

RUN apt-get update && apt-get install -y     libpq-dev     && docker-php-ext-install pdo pdo_pgsql pgsql

COPY . /var/www/html/

EXPOSE 80
```

### `Dockerfile.react`
```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
```

### `vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true
    }
  }
})
```

---

## 📌 Notas
- Si cambias dependencias de `package.json` en React, reconstruye con:
```bash
docker-compose build react
```
- Si modificas extensiones de PHP, reconstruye con:
```bash
docker-compose build php
```
- Recuerda crear tus tablas en PostgreSQL antes de hacer consultas desde el backend.

---

💡 **Autor:** Javier Rodriguez Rivas 
