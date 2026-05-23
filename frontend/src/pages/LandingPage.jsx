import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../services/api';

export default function LandingPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('create'); // 'create' | 'join'

  function validate() {
    if (!username.trim()) {
      setError('Please enter a username.');
      return false;
    }
    setError('');
    return true;
  }

  async function handleCreate() {
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      const roomId = await createRoom(); // POST /api/rooms/create
      navigate(`/room/${roomId}?username=${encodeURIComponent(username.trim())}`);
    } catch (err) {
      setError(`Failed to create room: ${err.message}. Is the backend running?`);
    } finally {
      setLoading(false);
    }
  }

  function handleJoin() {
    if (!validate()) return;
    if (!joinRoomId.trim()) {
      setError('Please enter a Room ID to join.');
      return;
    }
    navigate(`/room/${joinRoomId.trim()}?username=${encodeURIComponent(username.trim())}`);
  }

  const handleSubmit = tab === 'create' ? handleCreate : handleJoin;

  return (
    <div className="landing-bg">
      {/* Animated grid background */}
      <div className="landing-grid" aria-hidden="true" />

      <main className="landing-card">
        {/* Header */}
        <div className="landing-header">
          <div className="landing-logo">⚡</div>
          <h1 className="landing-title">CoEdit</h1>
          <p className="landing-subtitle">
            Real-time collaborative code editor — write, run, and share code together.
          </p>
        </div>

        {/* Username */}
        <div className="field-group">
          <label htmlFor="username" className="field-label">Your name</label>
          <input
            id="username"
            className="field-input"
            type="text"
            placeholder="e.g. Alice"
            value={username}
            maxLength={24}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        </div>

        {/* Tabs */}
        <div className="tab-row">
          <button
            id="tab-create"
            className={`tab-btn ${tab === 'create' ? 'active' : ''}`}
            onClick={() => { setTab('create'); setError(''); }}
          >
            ✦ Create Room
          </button>
          <button
            id="tab-join"
            className={`tab-btn ${tab === 'join' ? 'active' : ''}`}
            onClick={() => { setTab('join'); setError(''); }}
          >
            → Join Room
          </button>
        </div>

        {tab === 'join' && (
          <div className="field-group">
            <label htmlFor="room-id-input" className="field-label">Room ID</label>
            <input
              id="room-id-input"
              className="field-input"
              type="text"
              placeholder="Paste room ID here"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            />
          </div>
        )}

        {error && <p className="error-msg">⚠ {error}</p>}

        <button
          id={tab === 'create' ? 'create-room-btn' : 'join-room-btn'}
          className={`primary-btn ${loading ? 'loading' : ''}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <><span className="spinner" /> Creating room…</>
          ) : tab === 'create' ? (
            '✦ Create Room'
          ) : (
            '→ Join Room'
          )}
        </button>

        {/* Feature badges */}
        <div className="feature-badges">
          {['Real-time sync', 'Monaco Editor', 'Code execution', 'Multi-user'].map((f) => (
            <span key={f} className="badge">{f}</span>
          ))}
        </div>
      </main>
    </div>
  );
}
