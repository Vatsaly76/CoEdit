import { Server } from 'socket.io'
import { getRoom, updateCode } from '../services/room.service.js'
import { runCode } from '../services/execute.service.js'

export function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: '*' }
  })

  io.on('connection', (socket) => {

    // User joins a room
    socket.on('join-room', async ({ roomId, username }) => {
      const room = await getRoom(roomId)
      if (!room) return socket.emit('error', 'Room not found')

      socket.join(roomId)
      socket.data = { roomId, username }

      // Send current code to the joining user
      socket.emit('init', { code: room.code, language: room.language })

      // Tell everyone else
      socket.to(roomId).emit('user-joined', { username })
    })

    // Code change from one user → broadcast to others in the room
    socket.on('code-change', async ({ roomId, code }) => {
      await updateCode(roomId, code)
      socket.to(roomId).emit('code-change', { code })
    })

    // Cursor position → broadcast to others
    socket.on('cursor-move', ({ roomId, cursor, username }) => {
      socket.to(roomId).emit('cursor-move', { cursor, username })
    })

    // Run code → execute → broadcast result to whole room
    socket.on('run-code', async ({ roomId, language, code }) => {
      io.to(roomId).emit('run-start')   // tell everyone it's running
      try {
        const output = await runCode(language, code)
        io.to(roomId).emit('run-result', { output, error: null })
      } catch (err) {
        io.to(roomId).emit('run-result', { output: null, error: err.message })
      }
    })

    // Cleanup on disconnect
    socket.on('disconnect', () => {
      const { roomId, username } = socket.data || {}
      if (roomId) socket.to(roomId).emit('user-left', { username })
    })
  })
}