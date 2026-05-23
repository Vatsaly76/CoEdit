import MonacoEditor from '@monaco-editor/react';

const LANGUAGE_DEFAULTS = {
  javascript: '// Start coding in JavaScript...\nconsole.log("Hello, CoEdit!");\n',
  python: '# Start coding in Python...\nprint("Hello, CoEdit!")\n',
};

export default function Editor({ code, language, onChange, onCursorChange }) {
  function handleMount(editor) {
    // Listen for cursor position changes
    editor.onDidChangeCursorPosition((e) => {
      if (onCursorChange) {
        onCursorChange({
          lineNumber: e.position.lineNumber,
          column: e.position.column,
        });
      }
    });
  }

  return (
    <div className="editor-wrapper">
      <MonacoEditor
        height="100%"
        language={language}
        value={code ?? LANGUAGE_DEFAULTS[language]}
        theme="vs-dark"
        onChange={(val) => onChange(val ?? '')}
        onMount={handleMount}
        options={{
          fontSize: 14,
          fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
          fontLigatures: true,
          minimap: { enabled: false },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: 'all',
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
}
