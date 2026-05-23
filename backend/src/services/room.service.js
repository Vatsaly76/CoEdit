import redis from '../config/redis.js'
import { randomUUID } from 'crypto'

export async function createRoom() {
  const roomId = randomUUID().slice(0, 8)   // short, shareable ID
  await redis.hset(`room:${roomId}`, {
    id: roomId,
    code: '',
    language: 'javascript',
    createdAt: Date.now(),
  })
  return roomId
}

export async function getRoom(roomId) {
  const room = await redis.hgetall(`room:${roomId}`)
  return Object.keys(room).length ? room : null
}

export async function updateCode(roomId, code) {
  await redis.hset(`room:${roomId}`, { code })
}