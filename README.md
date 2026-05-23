# CoEdit
# Real-Time Collaborative Code Editor

A browser-based collaborative coding platform where multiple users can write, edit, run, and share code together in real time.

Inspired by:
- Replit
- VS Code Live Share
- CodeSandbox

---

# Features

## Core Features
- Real-time collaborative editing
- Multi-user rooms
- Live cursor synchronization
- Syntax highlighting
- Multi-language support
- Secure code execution
- Chat system
- Authentication & authorization

---

# Advanced Features
- File explorer
- Multi-file projects
- Shared terminal
- Session replay
- Dockerized sandbox execution
- GitHub OAuth login
- Theme customization

---

# Tech Stack

## Frontend
- React
- TypeScript
- Tailwind CSS
- Socket.IO Client
- Monaco Editor

## Backend
- Node.js
- Express.js
- Socket.IO
- JWT Authentication

## Database & Cache
- PostgreSQL
- Redis

## DevOps
- Docker
- GitHub Actions
- Nginx

---

# System Architecture

```txt
Client (React Frontend)
        |
   WebSocket Layer
     (Socket.IO)
        |
Backend API Server
   (Node.js/Express)
        |
--------------------------------
|              |               |
Redis      PostgreSQL     Docker Runner
(Cache)      (DB)         (Sandbox)
```

---

# Folder Structure

```txt
/client
    /src
        /components
        /pages
        /hooks
        /context
        /sockets

/server
    /routes
    /controllers
    /middlewares
    /models
    /services
    /sockets

/docker
/docs
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/realtime-code-editor.git
cd realtime-code-editor
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Backend Setup

```bash
cd server
npm install
npm run dev
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
JWT_SECRET=your_secret
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
```

---

# Running With Docker

```bash
docker-compose up --build
```

---

# Supported Languages

- C++
- Python
- JavaScript

---

# Real-Time Features

## Collaboration
- Simultaneous editing
- Cursor tracking
- User presence
- Room synchronization

## Communication
- Live chat
- Notifications
- User join/leave updates

---

# Security Features

- JWT authentication
- Docker sandboxing
- Execution time limits
- Memory limits
- Input sanitization

---

# API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

## Rooms

```http
POST /api/rooms/create
POST /api/rooms/join
GET  /api/rooms/:id
```

## Code Execution

```http
POST /api/run
```

---

# WebSocket Events

```txt
join-room
leave-room
code-change
cursor-change
chat-message
user-joined
user-left
```

---

# Deployment

## Frontend
Deploy on:
- Vercel

## Backend
Deploy on:
- Railway
- Render

## Database
Use:
- Neon

---

# Team Responsibilities

| Member | Responsibility |
|---|---|
| Frontend Lead | UI, editor, themes |
| Backend Lead | APIs, auth, DB |
| Realtime Lead | Socket.IO, synchronization |
| DevOps Lead | Docker, deployment, CI/CD |

---

# Future Improvements

- CRDT-based conflict resolution
- Voice/video collaboration
- AI code assistant
- Git integration
- Live interview mode
- Plugin marketplace

---

# Screenshots

Add screenshots/gifs here after implementation.

---

# Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a pull request

---

# License

MIT License

---

# Authors

Developed collaboratively using GitHub workflow and Agile development practices.
