# CoEdit 🚀  
### Real-Time Collaborative Code Editor

A browser-based collaborative coding platform where multiple users can write, edit, run, and share code together in real-time.

Inspired by platforms like Replit, VS Code Live Share, and CodeSandbox.

---

# ✨ Features

## Core Features

- ⚡ Real-time collaborative editing
- 👥 Multi-user rooms & isolated sessions
- 🖱️ Live cursor synchronization
- 🔒 Secure Dockerized code execution
- 🌐 Multi-language support
- 🎨 Syntax highlighting with Monaco Editor
- 💬 Built-in chat & presence system
- 🔑 Authentication & authorization

---

## 🚀 Upcoming Features

- 📁 File explorer & multi-file projects
- 🖥️ Shared terminal
- ⏪ Session replay
- 🔗 GitHub OAuth integration
- 🎨 Theme customization
- 🤖 AI code assistant

---

# 🛠️ Tech Stack

## Frontend
- React
- TypeScript
- Tailwind CSS
- Monaco Editor
- Socket.IO Client

## Backend
- Node.js
- Express.js
- Socket.IO
- JWT Authentication

## Database & Cache
- PostgreSQL
- Redis

## DevOps & Deployment
- Docker
- GitHub Actions
- Nginx

---

# 🏗️ System Architecture

```text
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
(Cache)       (DB)          (Sandbox)
```

---

# 📂 Folder Structure

```text
CoEdit/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── context/
│       ├── services/
│       └── sockets/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   └── utils/
│   │
│   ├── docker-compose.yml
│   └── server.js
│
├── docs/
├── .github/
│   └── workflows/
│
└── README.md
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Vatsaly76/CoEdit.git
cd CoEdit
```

---

## 2️⃣ Configure Environment Variables

Create a `.env` file inside the `backend/` directory.

```env
PORT=5000

JWT_SECRET=your_secret_key

DATABASE_URL=your_postgresql_url

REDIS_URL=redis://localhost:6379
```

---

## 3️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start Redis & containers
docker-compose up -d

# Pull execution containers
docker pull node:18-alpine
docker pull python:3.10-alpine

# Start backend server
npm run dev
```

---

## 4️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

---

# 🛡️ Security Features

- 🔐 JWT-based authentication
- 🐳 Docker sandboxed execution
- ⏱️ Execution timeout limits
- 💾 Memory & CPU restrictions
- 🌍 Network isolation during execution

---

# 📡 API Reference

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

---

## Rooms

```http
POST /api/rooms/create
POST /api/rooms/join
GET  /api/rooms/:id
```

---

## Code Execution

```http
POST /api/execute
```

---

# 🔌 WebSocket Events

```text
join-room
leave-room

code-change
sync-code

cursor-change

chat-message

user-joined
user-left
```

---

# 🌍 Deployment Strategy

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Railway / Render |
| Database | Neon PostgreSQL |
| Cache | Redis Cloud |

---

# 👥 Team Responsibilities

| Role | Responsibility |
|------|----------------|
| Frontend Lead | UI, Monaco integration, themes |
| Backend Lead | APIs, authentication, database |
| Realtime Lead | Socket.IO sync & collaboration |
| DevOps Lead | Docker sandboxing & CI/CD |

---

# 🚀 Future Improvements

- CRDT-based synchronization (Yjs)
- Voice & video collaboration
- Git integration
- Live interview mode
- AI-powered code suggestions
- Persistent project storage

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes

```bash
git commit -m "Add AmazingFeature"
```

4. Push to the branch

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

# 📝 License

Distributed under the MIT License.

---

# ❤️ Acknowledgements

Inspired by:

- Replit
- VS Code Live Share
- CodeSandbox

---

# ⭐ Support

If you like this project, consider giving it a star on GitHub ⭐
Developed collaboratively using Agile development practices.
