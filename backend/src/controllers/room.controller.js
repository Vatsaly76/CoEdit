const { createRoom, getRoom } = require('../services/room.service');

/**
 * POST /api/rooms/create
 * Creates a new collaborative room in Redis.
 * Response: { roomId: string }
 */
const create = async (req, res) => {
  try {
    const roomId = await createRoom();
    res.status(201).json({ roomId });
  } catch (error) {
    console.error('Failed to create room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
};

/**
 * GET /api/rooms/:id
 * Returns room metadata (id, code, language, createdAt).
 */
const getById = async (req, res) => {
  try {
    const room = await getRoom(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error('Failed to get room:', error);
    res.status(500).json({ error: 'Failed to get room' });
  }
};

module.exports = { create, getById };
