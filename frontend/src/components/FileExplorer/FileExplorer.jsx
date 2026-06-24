import "./FileExplorer.css"
function FileExplorer({ files }) {
    if (!files) return null;
    return (
        <div className="file-explorer">
            <h3>Explorer</h3>

            {files.map((item, index) => (
                <div key={index} className="file-item">
                    📄 {item.file}
                </div>
            ))}
        </div>
    );
}
export default FileExplorer;