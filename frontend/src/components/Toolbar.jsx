const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', icon: '🟨' },
  { value: 'python',     label: 'Python',     icon: '🐍' },
];

export default function Toolbar({ language, onLanguageChange, onRun, isRunning, connected, roomId }) {
  return (
    <div className="toolbar">
      {/* Left: Room info */}
      <div className="toolbar-left">
        <div className="toolbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">CoEdit</span>
        </div>
        <div className="room-badge">
          <span className="room-label">Room</span>
          <span className="room-id">{roomId}</span>
          <button
            className="copy-btn"
            title="Copy room ID"
            onClick={() => navigator.clipboard.writeText(roomId)}
          >
            📋
          </button>
        </div>
        <div className={`connection-dot ${connected ? 'online' : 'offline'}`} title={connected ? 'Connected' : 'Disconnected'} />
      </div>

      {/* Right: Controls */}
      <div className="toolbar-right">
        <select
          className="lang-select"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.icon} {l.label}
            </option>
          ))}
        </select>

        <button
          className={`run-btn ${isRunning ? 'running' : ''}`}
          onClick={onRun}
          disabled={isRunning || !connected}
          title={!connected ? 'Not connected to server' : 'Run code (all users see output)'}
        >
          {isRunning ? (
            <>
              <span className="spinner" /> Running…
            </>
          ) : (
            <>▶ Run</>
          )}
        </button>
      </div>
    </div>
  );
}
