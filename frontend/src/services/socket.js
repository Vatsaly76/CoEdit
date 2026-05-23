import { io } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const socket = io(BACKEND_URL, {
  autoConnect: false,    // we connect manually when user joins a room
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;
