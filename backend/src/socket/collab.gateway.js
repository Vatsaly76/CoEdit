const { getRoom, updateCode } = require('../services/room.service');
const executeService = require('../services/execute.service');

/**
 * Registers all Socket.IO collaborative events on the given io instance.
 *
 * Client → Server events:
 *   join-room   { roomId, username }          → validates room, sends init state
 *   code-change { roomId, code }              → persists + broadcasts to room
 *   cursor-move { roomId, cursor, username }  → broadcasts to room
 *   run-code    { roomId, language, code }    → executes + broadcasts result
 *
 * Server → Client events:
 *   init        { code, language }
 *   user-joined { username }
 *   user-left   { username }
 *   code-change { code }
 *   cursor-move { cursor, username }
 *   run-start   {}
 *   run-result  { output, error }
 *   error       string
 */
function initSocket(io) {
  io.on('connection', (socket) => {

    // ── join-room ────────────────────────────────────────────────────────
    socket.on('join-room', async ({ roomId, username }) => {
      const room = await getRoom(roomId);
      if (!room) {
        return socket.emit('error', 'Room not found');
      }

      socket.join(roomId);
      socket.data = { roomId, username };

      // Send current state to the joining user
      socket.emit('init', { code: room.code, language: room.language });

      // Notify everyone else in the room
      socket.to(roomId).emit('user-joined', { username });
    });

    // ── code-change ──────────────────────────────────────────────────────
    socket.on('code-change', async ({ roomId, code }) => {
      await updateCode(roomId, code);
      socket.to(roomId).emit('code-change', { code });
    });

    // ── cursor-move ──────────────────────────────────────────────────────
    socket.on('cursor-move', ({ roomId, cursor, username }) => {
      socket.to(roomId).emit('cursor-move', { cursor, username });
    });

    // ── run-code ─────────────────────────────────────────────────────────
    socket.on('run-code', async ({ roomId, language, code }) => {
      io.to(roomId).emit('run-start'); // tell everyone execution started
      try {
        const result = await executeService.runCode(language, code);
        io.to(roomId).emit('run-result', {
          output: result.output || null,
          error: result.error || null,
        });
      } catch (err) {
        io.to(roomId).emit('run-result', { output: null, error: err.message });
      }
    });

    // ── disconnect ───────────────────────────────────────────────────────
    socket.on('disconnect', () => {
      const { roomId, username } = socket.data || {};
      if (roomId) {
        socket.to(roomId).emit('user-left', { username });
      }
    });
  });
}

module.exports = { initSocket };