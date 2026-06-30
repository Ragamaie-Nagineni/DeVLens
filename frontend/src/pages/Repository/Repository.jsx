import react, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Repository.css"
import Header from "../../components/Header/Header";
import Graph from "../../components/Graph/Graph";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LatestAnalysisCard from "../../components/LatestAnalysisCard/LatestAnalysisCard";
import { FaGlobe } from "react-icons/fa";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import CodeViewer from "../../components/FileExplorer/CodeViewer";

function Repository() {
    const [collapsed, setcollapsed] = useState(false);
    const location = useLocation();
    const [repository, setRepository] = useState(location.state?.repository || null);
    const [graph, setGraph] = useState(location.state?.graph || null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [code, setCode] = useState("");

    useEffect(() => {
        if (graph) return;

        const fetchGraph = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));

                if (!user) return;

                const res = await axios.get(
                    `http://localhost:3000/api/repository/latest/${user.id}`
                );

                if (res.data) {
                    setGraph(res.data.graph);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchGraph();
    }, [graph]);

    useEffect(() => {
        if (repository) return;

        const fetchRepository = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user) return;

                const res = await axios.get(
                    `http://localhost:3000/api/repository/latest/${user.id}`
                );

                setRepository(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRepository();
    }, [repository]);
    const handleFileSelect = async (file) => {
    try {
        setSelectedFile(file);

        const res = await axios.get(
            `http://localhost:3000/api/repository/${repository.id}/file`,
            {
                params: { filePath: file },
            }
        );

        setCode(res.data.content);
    } catch (err) {
        console.error(err);
    }
};
    return (
        <div>
            <Header />
            <div className="repository">

                <Sidebar
                    collapsed={collapsed}
                    setcollapsed={setcollapsed} />

                <div className={collapsed ? "repository-content collapsed" : "repository-content"}>

                    {/* content */}

                    <LatestAnalysisCard repository={repository} />
                    <div className="graph-section">
                        <div className="graph-header">
                            <h2><FaGlobe /> <span>Repository Knowledge Graph</span></h2>
                            <p>
                                Explore relationships between files, functions, and
                                imports.
                            </p>
                        </div>

                        <div className="graph-card">
                            {graph ? (
                                <Graph graph={graph}
                                 onNodeClick={handleFileSelect}
                                />
                            ) : (
                                <p>No repository analyzed yet.</p>
                            )}
                        </div>


                    </div>
                    <div className="explorer-viewer">
                        <FileExplorer
                            files={repository?.repository_analysis}
                            onFileClick={handleFileSelect}
                        />

                        <CodeViewer
                            code={code}
                            selectedFile={selectedFile}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Repository;