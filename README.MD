# Simple Chat App

This is a demo chat application built with NestJS (backend), Next.js (frontend), Prisma, PostgreSQL, and WebSocket.

## Features

- Register, login, JWT authentication
- Multi-room chat, real-time with WebSocket
- Room list, chat in each room
- User profile page
- Modern, responsive UI

## Getting Started

### 1. Start PostgreSQL with Docker

```bash
docker-compose up -d
```

> This command will start a PostgreSQL container (default port 5432).

### 2. Setup Backend

```bash
cd backend
npm install
```

#### Configure environment variables

Create a `.env` file in the `backend` folder with the following content:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/simple-chat?schema=public"
JWT_SECRET="supersecret"
JWT_EXPIRES_IN="15m"
REFRESH_SECRET="refreshsecret"
REFRESH_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:3000"
PORT=4000
```

#### Run migrations and seed sample data

```bash
npx prisma migrate dev --name init
npm run seed
```

#### Start the backend server

```bash
npm run start:dev
```

### 3. Setup Frontend

#### Configure environment variables

Create a `.env.local` file in the `frontend` folder with the following content:

```
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

#### Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

## Main Folders

- `backend/`: Source NestJS, Prisma, seed, API
- `frontend/`: Source Next.js, User Interface
- `docker-compose.yml`: Initializing PostgreSQL
