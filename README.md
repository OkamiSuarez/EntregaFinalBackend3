
# AdoptMe

AdoptMe es una API backend en Node.js para gestionar adopciones de mascotas. Permite consultar animales disponibles, registrar adopciones y conocer el historial de usuarios y mascotas.

## Características

- Gestión de usuarios, mascotas y adopciones
- Consulta de animales disponibles y su estado
- Documentación Swagger interactiva
- Pruebas automáticas con npm
- Imagen Docker pública

## Estructura

src/
controllers/
dao/
models/
docs/
dto/
public/
repository/
routes/
services/
utils/
test/
Dockerfile
README.md



## Requisitos

- Node.js 18+
- MongoDB Atlas o local
- Docker (opcional)

## Instalación y uso local

git clone https://github.com/OkamiSuarez/EntregaFinalBackend3.git
cd adoptme
npm install
npm run dev


La app corre en [http://localhost:8080](http://localhost:8080)

## Variables de entorno

- `PORT` (por defecto 8080)
- Cadena de conexión a MongoDB 

## Testing

npm run test

## Uso con Docker

docker build -t suarezokami/adoptme:latest .
docker run -p 8080:8080 suarezokami/adoptme:latest

Imagen en Docker Hub: [suarezokami/adoptme](https://hub.docker.com/repositories/suarezokami)

## Documentación Swagger

Disponible en: [http://localhost:8080/apidocs](http://localhost:8080/apidocs)

## Endpoints principales

- `/api/users` - Usuarios
- `/api/pets` - Mascotas
- `/api/adoptions` - Adopciones
- `/api/sessions` - Sesiones
- `/api/mocks` - Datos de prueba

Consulta Swagger para detalles y ejemplos.

## Créditos

Desarrollado por [suarezokami](https://hub.docker.com/repositories/suarezokami)  
Contacto: tu_email@ejemplo.com

---

> Proyecto solo backend, ECMAScript Modules, sin pasos especiales de migración.