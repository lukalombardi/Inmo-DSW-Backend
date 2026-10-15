# Inmobiliaria — Backend
Gestión de propiedades con consultas y Login usando JWT.
Stack: Node.js · Express · Prisma · MySQL · Docker.

## Cómo levantarlo

Requisito: Docker Desktop.

1. Crear un archivo `.env` en la raíz con este contenido (valores de prueba):

   ```env
   DATABASE_URL="mysql://root:inmo1234@inmo-db:3306/inmobiliaria"
   DB_PASSWORD=inmo1234
   DB_NAME=inmobiliaria
   PORT=3000
   API_KEY=clave-de-prueba
   JWT_SECRET=secreto-de-prueba
   ```

2. Levantar:

   ```bash
   docker compose up --build
   ```

   Las migraciones se aplican solas. La API queda en `http://localhost:3000`.

## Primer uso

1. Crear un admin (usa la `API_KEY`):

   ```http
   POST /usuarios
   x-api-key: clave-de-prueba

   { "nombre": "Admin", "email": "admin@inmo.com", "password": "admin123", "rol": "ADMIN" }
   ```

2. Loguearse y copiar el `token`:

   ```http
   POST /auth/login

   { "email": "admin@inmo.com", "password": "admin123" }
   ```

3. En las rutas protegidas: header `Authorization: Bearer <token>`.

## Endpoints

| Ruta | Lectura (GET) | Escritura (POST / PATCH / DELETE) |
|---|---|---|
| `/auth/login` | — | POST público |
| `/usuarios` | ADMIN | POST con API key; PATCH y DELETE ADMIN |
| `/zonas` | Público | ADMIN |
| `/tipos` | Público | ADMIN |
| `/propiedades` | Público | Logueado |
| `/fotos` | Público | Logueado |
| `/consultas` | Logueado | POST público; PATCH y DELETE logueado |

- Filtros del listado: `GET /propiedades?zonaId=1&tipoId=1&operacion=VENTA` (`VENTA` o `ALQUILER`).
- `GET /propiedades/:id` trae el detalle con tipo, zona, fotos y coordenadas.
- Subir una foto: `POST /fotos` con form-data, campos `imagen` (archivo) y `propiedadId`. Se ve en `http://localhost:3000/uploads/<archivo>`.

