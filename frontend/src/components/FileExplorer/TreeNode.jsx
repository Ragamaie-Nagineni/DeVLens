import { useState } from "react";
import { FaFolderOpen, FaFolder, FaFile } from "react-icons/fa";

function TreeNode({ node, currentPath = "", onFileClick }) {
  return (
    <>
      {Object.entries(node).map(([name, value]) => {
        const fullPath = currentPath
          ? `${currentPath}/${name}`
          : name;

        return (
          <Node
            key={fullPath}
            name={name}
            value={value}
            fullPath={fullPath}
            onFileClick={onFileClick}
          />
        );
      })}
    </>
  );
}

function Node({ name, value, fullPath, onFileClick }) {
  const isFolder = value !== null;
  const [open, setOpen] = useState(true);

  if (!isFolder) {
    return (
      <div
        style={{
          paddingLeft: 20,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
        }}
        onClick={() => onFileClick?.(fullPath)}
      >
        <FaFile />
        {name}
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: 10 }}>
      <div
        style={{
          cursor: "pointer",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? <FaFolderOpen /> : <FaFolder />}
        {name}
      </div>

      {open && (
        <TreeNode
          node={value}
          currentPath={fullPath}
          onFileClick={onFileClick}
        />
      )}
    </div>
  );
}

export default TreeNode;