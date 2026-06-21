import react from "react";
import { FaUpload } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import "./UploadBox.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadBox() {

    const [repoUrl, setRepoUrl] = useState("");
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");
    //const [analysisResult, setAnalysisResult] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(() => {
        const saved = localStorage.getItem("lastAnalysis");
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) { return; }
        if (!validateZipFile(selectedFile)) { alert("only zip files are allowed"); return; }
        if (selectedFile) { console.log("Selected file:", selectedFile); setFile(selectedFile); }
    }

    const handleRepoAnalysis = async () => {
        if (!repoUrl.trim()) { alert("please enter a repo url"); return; }
        if (!validateGithubUrl(repoUrl)) { alert("please enter a valid github repository url"); return; }
        try {
            setLoading(true);
            //const response = await axios.post("http://localhost:3000/api/repository", { repoUrl });
            const user = JSON.parse(localStorage.getItem("user"));

            const response = await axios.post(
                "http://localhost:3000/api/repository",
                {
                    repoUrl,
                    userId: user.id,
                }
            );
            //console.log(response.data);
            /*  navigate("/repository",{
                 state:{graph:response.data.graph},
 
             }) */
            setAnalysisResult(response.data);
            localStorage.setItem(
                "lastAnalysis",
                JSON.stringify(response.data)
            );
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const handleDragOver = (e) => { e.preventDefault(); }
    const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); }
    const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); }
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (!droppedFile) { return; }
        if (!validateZipFile(droppedFile)) { alert("only zip files are allowed"); return; }
        if (droppedFile) {
            console.log("drpped file:", droppedFile);
            setFile(droppedFile);
        }
    }

    const validateGithubUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            return (
                parsedUrl.hostname === "github.com" && parsedUrl.pathname.split("/").length >= 3
            );
        } catch { return false; }
    }
    const validateZipFile = (file) => {
        if (!file) { return false; }
        const filename = file.name.toLowerCase();
        return filename.endsWith(".zip");
    }

    //latest repo
    useEffect(() => {
        const fetchLatestRepo = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) return;

            try {
                const res = await axios.get(
                    `http://localhost:3000/api/repository/latest/${user.id}`
                );

                if (res.data) {
                    setAnalysisResult({
                        graph: res.data.graph,
                        metrics: res.data.metrics,
                        repositoryAnalysis: res.data.repository_analysis,
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchLatestRepo();
    }, []);

    return (
        <div>
            {!loading && !analysisResult && (
                <div className="connect-repo-card">

                    <h3>Connect Repository</h3>
                    <div className="repo-input-container">
                        <input type="url" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/usename/repository"></input>
                        <button onClick={handleRepoAnalysis}>ANALYSE</button>
                    </div>
                    <div className="or-divider">
                        <span>OR</span>
                    </div>
                    <input
                        type="file"
                        accept=".zip"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    <div
                        className={`upload-box ${isDragging ? "dragging" : ""}`}
                        onClick={() => fileInputRef.current.click()}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}

                    >
                        <div className="upload-content ">
                            <div className="upload-icon"><FaUpload /></div>
                            <h4>Upload ZIP File</h4>
                            <p>{file ? file.name : "Drag and drop or click to browse"}</p>
                        </div>
                    </div>
                </div>
            )}
            {loading && (
                <div className="analysis-progress">
                    <h3>🔍 Scanning repository structure...</h3>
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                    <p>Parsing files • Building graph • Extracting symbols</p>
                </div>
            )}
            {analysisResult && (
                <div className="repository-summary-card">
                    <h2>📦 {analysisResult.metrics?.repository?.name}</h2>
                    <div className="summary-status">
                        <span className="status-pill">✅ Analysis Complete</span>
                    </div>
                    <button
                        className="new-analysis-btn"
                        onClick={() => {
                            localStorage.removeItem("lastAnalysis");
                            setAnalysisResult(null);
                            setRepoUrl("");
                            setFile(null);
                        }}
                    >
                        ↻ New Analysis
                    </button>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <h4>📁 Files</h4>
                            <span>{analysisResult.metrics?.files}</span>
                        </div>

                        <div className="metric-card">
                            <h4>⚙️ Functions</h4>
                            <span>{analysisResult.metrics?.functions}</span>
                        </div>

                        <div className="metric-card">
                            <h4>🔗 Imports</h4>
                            <span>{analysisResult.metrics?.imports}</span>
                        </div>

                        <div className="metric-card">
                            <h4>🏗️ Classes</h4>
                            <span>{analysisResult.metrics?.classes}</span>
                        </div>
                    </div>

                    <p className="summary">
                        {analysisResult.metrics?.repository?.summary}
                    </p>
                    <button className="explore-btn"
                        onClick={() =>
                            navigate("/repository", {
                                state: {
                                    graph: analysisResult.graph
                                }
                            })
                        }
                    >
                        🚀 Explore Repository
                    </button>
                </div>
            )}
        </div>
    )
}

export default UploadBox;