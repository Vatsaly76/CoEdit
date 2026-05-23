const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * POST /api/execute
 * @param {string} language - 'javascript' | 'python'
 * @param {string} code     - Source code to execute
 * @returns {{ status: string, output?: string, error?: string }}
 */
export async function executeCode(language, code) {
  const res = await fetch(`${BACKEND_URL}/api/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language, code }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json(); // { status, output } | { status, error }
}

/**
 * POST /api/rooms/create
 * Creates a new room in Redis and returns the roomId.
 * @returns {Promise<string>} roomId
 */
export async function createRoom() {
  const res = await fetch(`${BACKEND_URL}/api/rooms/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  const data = await res.json(); // { roomId }
  return data.roomId;
}

/**
 * GET /api/rooms/:id
 * @param {string} roomId
 * @returns {Promise<{ id, code, language, createdAt }>}
 */
export async function getRoom(roomId) {
  const res = await fetch(`${BACKEND_URL}/api/rooms/${roomId}`);

  if (res.status === 404) return null;

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}
