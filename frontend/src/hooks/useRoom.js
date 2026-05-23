import { useState, useEffect, useRef, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';

/**
 * useRoom — wires up all Socket.IO events for a collaborative room.
 *
 * Socket events consumed (Server → Client):
 *   init         { code, language }  — initial state when joining
 *   code-change  { code }            — remote code update
 *   cursor-move  { cursor, username }— remote cursor position
 *   user-joined  { username }        — new participant
 *   user-left    { username }        — participant disconnect
 *   run-start    {}                  — execution started (all users)
 *   run-result   { output, error }   — execution finished
 *   error        string              — e.g. 'Room not found'
 *
 * Socket events emitted (Client → Server):
 *   join-room    { roomId, username }
 *   code-change  { roomId, code }
 *   cursor-move  { roomId, cursor, username }
 *   run-code     { roomId, language, code }
 */
export function useRoom({ roomId, username }) {
  const socket = useSocket();

  const [code, setCode]         = useState('// Start coding...\n');
  const [language, setLanguage] = useState('javascript');
  const [users, setUsers]       = useState([]);
  const [output, setOutput]     = useState(null);     // { text, isError }
  const [isRunning, setIsRunning] = useState(false);
  const [roomError, setRoomError] = useState(null);
  const [connected, setConnected] = useState(false);

  // Prevent echo: when we apply a remote change we don't want to re-emit it
  const isRemoteChange = useRef(false);

  // ── Connect & join ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!roomId || !username) return;

    socket.connect();

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join-room', { roomId, username });
      // Add self to user list
      setUsers([username]);
    });

    socket.on('disconnect', () => setConnected(false));

    // ── Server → Client events ──────────────────────────────────────────────

    // Initial room state
    socket.on('init', ({ code: initCode, language: initLang }) => {
      isRemoteChange.current = true;
      setCode(initCode || '// Start coding...\n');
      setLanguage(initLang || 'javascript');
    });

    // Remote code change
    socket.on('code-change', ({ code: remoteCode }) => {
      isRemoteChange.current = true;
      setCode(remoteCode);
    });

    // Remote cursor (pass through for future cursor overlay)
    socket.on('cursor-move', ({ cursor, username: remoteUser }) => {
      // Cursor overlay is a future feature; event is received and can be extended
      void cursor; void remoteUser;
    });

    // Presence
    socket.on('user-joined', ({ username: newUser }) => {
      setUsers(prev => prev.includes(newUser) ? prev : [...prev, newUser]);
    });

    socket.on('user-left', ({ username: leftUser }) => {
      setUsers(prev => prev.filter(u => u !== leftUser));
    });

    // Execution
    socket.on('run-start', () => {
      setIsRunning(true);
      setOutput(null);
    });

    socket.on('run-result', ({ output: out, error: err }) => {
      setIsRunning(false);
      setOutput({ text: out || err, isError: !!err });
    });

    // Room-level error (e.g. Room not found)
    socket.on('error', (msg) => {
      setRoomError(typeof msg === 'string' ? msg : 'Connection error');
    });

    return () => {
      socket.emit('leave-room', { roomId, username });
      socket.off('connect');
      socket.off('disconnect');
      socket.off('init');
      socket.off('code-change');
      socket.off('cursor-move');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('run-start');
      socket.off('run-result');
      socket.off('error');
      socket.disconnect();
    };
  }, [roomId, username, socket]);

  // ── Emit helpers ─────────────────────────────────────────────────────────

  const handleCodeChange = useCallback((newCode) => {
    // Skip emitting if this change came from the server
    if (isRemoteChange.current) {
      isRemoteChange.current = false;
      setCode(newCode);
      return;
    }
    setCode(newCode);
    socket.emit('code-change', { roomId, code: newCode });
  }, [roomId, socket]);

  const handleCursorMove = useCallback((cursor) => {
    socket.emit('cursor-move', { roomId, cursor, username });
  }, [roomId, username, socket]);

  const handleRunCode = useCallback(() => {
    setIsRunning(true);
    setOutput(null);
    socket.emit('run-code', { roomId, language, code });
  }, [roomId, language, code, socket]);

  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang);
  }, []);

  return {
    code,
    language,
    users,
    output,
    isRunning,
    roomError,
    connected,
    handleCodeChange,
    handleCursorMove,
    handleRunCode,
    handleLanguageChange,
  };
}
