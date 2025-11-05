# Barbershop Appointment Scheduling Microservice

Microservicio NestJS para gestionar un sistema de agendamiento de citas para barberías. Construido con **NestJS**, **MongoDB** y totalmente documentado para pruebas en **Postman**.

## Características

- **Gestión de Usuarios**: Registro y perfil de clientes
- **Gestión de Servicios**: Crear, actualizar y eliminar servicios (cortes, afeitadas, etc.)
- **Gestión de Franjas Horarias**: Crear y administrar horarios disponibles para barberos
- **Sistema de Reservas**: Agendar, consultar y cancelar citas
- **Validaciones Automáticas**: DTOs con class-validator
- **Bloqueo de Franjas**: Cuando se crea una reserva, se bloquea automáticamente la franja horaria
- **API REST**: 100% compatible con Postman

---

## Requisitos Previos

- **Node.js** >= 16.x
- **npm** o **yarn**
- **MongoDB** (local o Atlas)
- **Docker** y **Docker Compose** (opcional, para levantar MongoDB)
- **Postman** o similar (para testing)

---

## Instalación

### Opción 1: Instalación Local

#### 1. Clonar el repositorio
\`\`\`bash
git clone https://github.com/diegodd173/agendia-agendamiento-citas.git
\`\`\`

#### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

#### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

\`\`\`env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/barbershop

# Puerto
PORT=3000
\`\`\`

**Para MongoDB Atlas (nube):**
\`\`\`env
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/barbershop?retryWrites=true&w=majority
MONGODB_DB=barbershop
PORT=3000
\`\`\`

#### 4. Asegurar que MongoDB esté ejecutándose

**En Linux/Mac:**
\`\`\`bash
mongod
\`\`\`

**En Windows:**
- Inicia el servicio MongoDB desde Services o ejecuta `mongod` desde Command Prompt

#### 5. Ejecutar la aplicación
\`\`\`bash
# Modo desarrollo (hot reload)
npm run dev

# Modo producción
npm run build
npm start
\`\`\`

La API estará disponible en `http://localhost:3000`

---

### Opción 2: Con Docker Compose

#### 1. Asegurar que Docker está instalado
\`\`\`bash
docker --version
docker-compose --version
\`\`\`

#### 2. Crear archivo `docker-compose.yml`
\`\`\`yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DB: barbershop
    volumes:
      - mongodb_data:/data/db

  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      MONGODB_URI: mongodb://admin:password@mongodb:27017/barbershop
      MONGODB_DB: barbershop
      PORT: 3000
    depends_on:
      - mongodb

volumes:
  mongodb_data:
\`\`\`

#### 3. Levantar los servicios
\`\`\`bash
docker-compose up --build
\`\`\`

La API estará disponible en `http://localhost:3000`

---

## Estructura del Proyecto

\`\`\`
src/
├── main.ts                 # Punto de entrada
├── app.module.ts           # Módulo principal
├── users/                  # Módulo de usuarios
│   ├── schemas/
│   │   └── user.schema.ts
│   ├── dto/
│   │   └── create-user.dto.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── services/               # Módulo de servicios
│   ├── schemas/
│   │   └── service.schema.ts
│   ├── dto/
│   │   └── create-service.dto.ts
│   ├── services.controller.ts
│   ├── services.service.ts
│   └── services.module.ts
├── time-slots/             # Módulo de franjas horarias
│   ├── schemas/
│   │   └── time-slot.schema.ts
│   ├── dto/
│   │   └── create-time-slot.dto.ts
│   ├── time-slots.controller.ts
│   ├── time-slots.service.ts
│   └── time-slots.module.ts
└── bookings/               # Módulo de reservas
    ├── schemas/
    │   └── booking.schema.ts
    ├── dto/
    │   └── create-booking.dto.ts
    ├── bookings.controller.ts
    ├── bookings.service.ts
    └── bookings.module.ts
\`\`\`

---

## Uso con Postman

### 1. Importar Colección

Crea una nueva colección en Postman llamada "Barbershop API"

### 2. Endpoints Disponibles

#### **USUARIOS** 🧑‍💼

##### Crear Usuario
\`\`\`
POST /users
Content-Type: application/json

{
  "nombre": "María García",
  "email": "maria@example.com",
  "telefono": "+34 555 123 456",
  "rol": "cliente"
}
\`\`\`

**Respuesta exitosa (201):**
\`\`\`json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+34 123 456 789",
  "rol": "Cliente",
  "createdAt": "2024-01-15T10:30:00Z"
}
\`\`\`

---

##### Obtener Todos los Usuarios
\`\`\`
GET /users
\`\`\`

**Respuesta (200):**
\`\`\`json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+34 123 456 789",
    "rol": "Cliente",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
\`\`\`

---

##### Obtener Usuario por ID
\`\`\`
GET /users/:id
\`\`\`

Ejemplo:
\`\`\`
GET /users/507f1f77bcf86cd799439011
\`\`\`

---

##### Actualizar Usuario
\`\`\`
PATCH /users/:id
Content-Type: application/json

{
  "name": "Juan Carlos Pérez",
  "phone": "+34 987 654 321"
}
\`\`\`

---

##### Eliminar Usuario
\`\`\`
DELETE /users/:id
\`\`\`

---

#### **SERVICIOS** ✂️

##### Crear Servicio
\`\`\`
POST /services
Content-Type: application/json

{
  "nombre": "Corte Clásico",
  "descripcion": "Corte tradicional con máquina y tijeras",
  "duracion_minutos": 30,
  "precio": 15.50
}
\`\`\`

**Respuesta exitosa (201):**
\`\`\`json
{
  "_id": "507f1f77bcf86cd799439012",
  "nombre": "Corte Clásico",
  "descripcion": "Corte tradicional con máquina y tijeras",
  "duracion_minutos": 30,
  "precio": 15.50,
  "createdAt": "2024-01-15T10:30:00Z"
}
\`\`\`

---

##### Obtener Todos los Servicios
\`\`\`
GET /services
\`\`\`

---

##### Obtener Servicio por ID
\`\`\`
GET /services/:id
\`\`\`

---

##### Actualizar Servicio
\`\`\`
PATCH /services/:id
Content-Type: application/json

{
  "price": 18.00,
  "duration": 35
}
\`\`\`

---

##### Eliminar Servicio
\`\`\`
DELETE /services/:id
\`\`\`

---

#### **FRANJAS HORARIAS** 🕐

##### Crear Franja Horaria
\`\`\`
POST /time-slots
Content-Type: application/json

{
  "barbero_id": "690ac64cb677b58c5d2d1bd1",
  "fecha": "2024-01-20",
  "hora_inicio": "09:00",
  "hora_fin": "10:00"
}
\`\`\`

**Respuesta exitosa (201):**
\`\`\`json
{
  "_id": "507f1f77bcf86cd799439013",
  "barbero_id": "690ac64cb677b58c5d2d1bd1",
  "fecha": "2024-01-20",
  "hora_inicio": "09:00",
  "hora_fin": "10:00",
  "isBooked": false,
  "createdAt": "2024-01-15T10:30:00Z"
}
\`\`\`

---

##### Obtener Franjas Disponibles por Barbero
\`\`\`
GET /time-slots/:id
\`\`\`

---

##### Obtener Todas las Franjas
\`\`\`
GET /time-slots
\`\`\`

---

##### Actualizar Franja (Marcar como reservada)
\`\`\`
PATCH /time-slots/:id
Content-Type: application/json

{
  "barbero_id": "690ac64cb677b58c5d2d1bd1",
  "fecha": "2024-01-20",
  "hora_inicio": "09:00",
  "hora_fin": "20:00"
}
\`\`\`

---

##### Eliminar Franja
\`\`\`
DELETE /time-slots/:id
\`\`\`

---

#### **RESERVAS** 📅

##### Crear Reserva
\`\`\`
POST /bookings
Content-Type: application/json

{
  "cliente_id": "690ab838d128f500f6a3656f",
  "barbero_id": "690ac64cb677b58c5d2d1bd1",
  "servicio_id": "690ac119b677b58c5d2d1bca",
  "time_slot_id": "690ac783d8d2a49ba9f113d8",
  "fecha": "2025-01-20",
  "hora_inicio": "08:00",
  "hora_fin": "10:00",
  "observaciones": "Quiero un corte más corto en los lados"
}
\`\`\`

**Respuesta exitosa (201):**
\`\`\`json
{
  "cliente_id": "690ab838d128f500f6a3656f",
  "barbero_id": "690ac64cb677b58c5d2d1bd1",
  "servicio_id": "690ac119b677b58c5d2d1bca",
  "fecha": "2025-01-20",
  "hora_inicio": "08:00",
  "hora_fin": "10:00",
  "estado": "confirmada",
  "observaciones": "Quiero un corte más corto en los lados",
  "time_slot_id": "690ac783d8d2a49ba9f113d8",
  "_id": "690acef98e52125eb639e721",
  "createdAt": "2025-11-05T04:13:45.476Z",
  "updatedAt": "2025-11-05T04:13:45.476Z",
  "__v": 0
}
\`\`\`

---

##### Obtener Todas las Reservas
\`\`\`
GET /bookings
\`\`\`

---

##### Obtener Reserva por ID
\`\`\`
GET /bookings/:id
\`\`\`

---


##### Obtener Reservas de un Barbero
\`\`\`
GET /bookings/barber/:barberName
\`\`\`

Ejemplo:
\`\`\`
GET /bookings/barber/Carlos López
\`\`\`

---

##### Actualizar Estado de Reserva
\`\`\`
PATCH /bookings/:id
Content-Type: application/json

{
  "status": "cancelled"
}
\`\`\`

**Estados disponibles:** `confirmed`, `completed`, `cancelled`

---

##### Cancelar Reserva
\`\`\`
DELETE /bookings/:id
\`\`\`

---

## Flujo Completo de Ejemplo

### Paso 1: Crear un Usuario
\`\`\`
POST http://localhost:3000/users
{
  "nombre": "María García",
  "email": "maria@example.com",
  "telefono": "+34 555 123 456",
  "rol": "cliente"
}
\`\`\`

Copiar el `_id` de la respuesta: `USER_ID`

### Paso 2: Crear un Servicio
\`\`\`
POST http://localhost:3000/services
{
  "nombre": "Corte y Barba",
  "descripcion": "Corte completo + arreglo de barba",
  "duracion_minutos": 45,
  "precio": 25.00
}
\`\`\`

Copiar el `_id` de la respuesta: `SERVICE_ID`

### Paso 3: Crear Franjas Horarias
\`\`\`
POST http://localhost:3000/time-slots
{
  "barberName": "Pedro Martínez",
  "date": "2024-01-25",
  "startTime": "10:00",
  "endTime": "10:45",
  "isBooked": false
}
\`\`\`

Copiar el `_id` de la respuesta: `TIME_SLOT_ID`

### Paso 4: Crear una Reserva
\`\`\`
POST http://localhost:3000/bookings
{
  "userId": "USER_ID",
  "serviceId": "SERVICE_ID",
  "timeSlotId": "TIME_SLOT_ID",
  "barberName": "Pedro Martínez",
  "specialRequests": "Cortito en los lados, largo en la parte de arriba"
}
\`\`\`

### Paso 5: Consultar la Reserva
\`\`\`
GET http://localhost:3000/bookings/BOOKING_ID
\`\`\`

Verifica que la franja horaria ahora tenga `isBooked: true`

---

## Códigos de Respuesta HTTP

| Código | Significado |
|--------|-------------|
| `200` | OK - Solicitud exitosa |
| `201` | CREATED - Recurso creado exitosamente |
| `400` | BAD REQUEST - Datos inválidos |
| `404` | NOT FOUND - Recurso no encontrado |
| `500` | INTERNAL SERVER ERROR - Error del servidor |

---

## Validaciones

El sistema valida automáticamente:

- **Email**: Formato válido
- **Teléfono**: No vacío
- **Duración de servicio**: Mayor a 0
- **Precio**: Mayor o igual a 0
- **Fecha**: Formato YYYY-MM-DD
- **Hora**: Formato HH:MM

Si hay error, recibirás:
\`\`\`json
{
  "statusCode": 400,
  "message": [
    "email debe ser un email válido",
    "duration debe ser un número positivo"
  ],
  "error": "Bad Request"
}
\`\`\`

---

## Debugging

### Ver logs de la aplicación
\`\`\`bash
npm run dev
\`\`\`

### Conectar a MongoDB localmente
\`\`\`bash
mongo
use barbershop
db.users.find()
\`\`\`

---

## Troubleshooting

### ❌ "Error: connect ECONNREFUSED 127.0.0.1:27017"
MongoDB no está corriendo. Inicia con:
\`\`\`bash
mongod
\`\`\`

### ❌ "Cannot find module '@nestjs/mongoose'"
Reinstala dependencias:
\`\`\`bash
npm install
\`\`\`

### ❌ "Port 3000 is already in use"
Cambia el puerto en `.env`:
\`\`\`env
PORT=3001
\`\`\`

---

## Notas Importantes

- Todas las fechas se guardan en formato ISO 8601
- Las reservas se crean automáticamente bloqueando la franja horaria
- Al cancelar una reserva, la franja horaria se desbloquea automáticamente
- No se pueden crear dos reservas en la misma franja horaria

---
