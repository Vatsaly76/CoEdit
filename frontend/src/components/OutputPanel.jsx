export default function OutputPanel({ output, isRunning }) {
  return (
    <div className="output-panel">
      <div className="output-header">
        <span className="output-title">
          <span className="output-icon">⬛</span> Output
        </span>
        {isRunning && <span className="output-running-badge">● Executing…</span>}
      </div>

      <div className="output-body">
        {isRunning && !output && (
          <div className="output-placeholder running-pulse">Running your code…</div>
        )}

        {!isRunning && !output && (
          <div className="output-placeholder">
            Press <kbd>▶ Run</kbd> to execute code
          </div>
        )}

        {output && (
          <pre className={`output-text ${output.isError ? 'error' : 'success'}`}>
            {output.isError ? '✗ ' : '✓ '}
            {output.text}
          </pre>
        )}
      </div>
    </div>
  );
}
