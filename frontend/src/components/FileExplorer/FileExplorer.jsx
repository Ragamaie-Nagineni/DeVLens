import "./FileExplorer.css";
import buildFileTree from "../../utils/buildFileTree";
import TreeNode from "./TreeNode";

function FileExplorer({ files, onFileClick }) {
  if (!files) return null;

  const tree = buildFileTree(files);

  return (
    <div className="file-explorer">
      <h3>Explorer</h3>
      <TreeNode
        node={tree}
        onFileClick={onFileClick}
      />
    </div>
  );
}

export default FileExplorer;