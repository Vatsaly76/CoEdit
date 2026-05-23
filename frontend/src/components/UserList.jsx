const COLORS = [
  '#6366f1', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#f97316', '#ec4899',
];

function getColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function Avatar({ name }) {
  const color = getColor(name);
  return (
    <div className="avatar" style={{ backgroundColor: color }} title={name}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function UserList({ users, currentUser }) {
  return (
    <div className="user-list">
      <div className="user-list-header">
        <span className="user-list-title">👥 Participants</span>
        <span className="user-count">{users.length}</span>
      </div>
      <ul className="user-items">
        {users.map((u) => (
          <li key={u} className="user-item">
            <Avatar name={u} />
            <span className="user-name">
              {u}
              {u === currentUser && <span className="you-badge"> (you)</span>}
            </span>
            <span className="user-status-dot" title="Online" />
          </li>
        ))}
      </ul>
    </div>
  );
}
