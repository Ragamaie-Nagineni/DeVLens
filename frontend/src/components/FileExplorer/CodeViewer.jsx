import "./CodeViewer.css";

function CodeViewer({ code, selectedFile }) {
  return (
    <div className="code-viewer">
      <div className="code-header">
        {selectedFile ? selectedFile : "No file selected"}
      </div>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeViewer;