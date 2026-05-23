const redis = require('../config/redis');
const { randomUUID } = require('crypto');

/**
 * Creates a new room in Redis and returns the short room ID.
 * @returns {Promise<string>} roomId
 */
async function createRoom() {
  const roomId = randomUUID().slice(0, 8); // short, shareable ID
  await redis.hSet(`room:${roomId}`, {
    id: roomId,
    code: '',
    language: 'javascript',
    createdAt: Date.now().toString(),
  });
  return roomId;
}

/**
 * Retrieves a room from Redis by ID.
 * @param {string} roomId
 * @returns {Promise<object|null>}
 */
async function getRoom(roomId) {
  const room = await redis.hGetAll(`room:${roomId}`);
  return Object.keys(room).length ? room : null;
}

/**
 * Persists updated code for a room in Redis.
 * @param {string} roomId
 * @param {string} code
 */
async function updateCode(roomId, code) {
  await redis.hSet(`room:${roomId}`, { code });
}

module.exports = { createRoom, getRoom, updateCode };