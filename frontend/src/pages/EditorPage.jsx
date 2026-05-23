import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import Toolbar from '../components/Toolbar';
import Editor from '../components/Editor';
import OutputPanel from '../components/OutputPanel';
import UserList from '../components/UserList';

export default function EditorPage() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const username = searchParams.get('username') || 'Anonymous';

  const {
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
  } = useRoom({ roomId, username });

  // Room not found or connection error
  if (roomError) {
    return (
      <div className="error-screen">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Room Not Found</h2>
          <p className="error-body">{roomError}</p>
          <p className="error-hint">
            The room <strong>{roomId}</strong> doesn't exist yet. Make sure the backend's{' '}
            <code>createRoom()</code> is wired to an HTTP route, or ask the room creator to share a valid ID.
          </p>
          <button className="primary-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-page">
      {/* Top bar */}
      <Toolbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onRun={handleRunCode}
        isRunning={isRunning}
        connected={connected}
        roomId={roomId}
      />

      {/* Main layout */}
      <div className="editor-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <UserList users={users} currentUser={username} />
        </aside>

        {/* Editor + Output */}
        <div className="editor-main">
          <div className="editor-area">
            <Editor
              code={code}
              language={language}
              onChange={handleCodeChange}
              onCursorChange={handleCursorMove}
            />
          </div>
          <OutputPanel output={output} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}
