import react from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ImpactAnalysis.css"
import Header from "../../components/Header/Header";
import { FiSearch, FiActivity, FiFile } from "react-icons/fi";
import axios from "axios";

function ImpactAnalysis() {
    const [collapsed, setcollapsed] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [repository, setRepository] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
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

    }, []);
    const searchFiles = async (value) => {

        setQuery(value);

        if (!repository) return;

        if (value.trim() === "") {
            setResults([]);
            return;
        }

        try {

            const response = await axios.get(
                `http://localhost:3000/api/repository/${repository.id}/search`,
                {
                    params: {
                        q: value
                    }
                }
            );

            setResults(response.data);

        } catch (err) {
            console.error(err);
        }

    };
    const analyzeImpact = async () => {

        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        try {

            const response = await axios.get(
                "http://localhost:3000/api/graph/impactanalysis",
                {
                    params: {
                        repositoryId: repository.id,
                        file: selectedFile.path
                    }
                }
            );

            console.log(response.data);

            // Later:
            // setImpactData(response.data);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Header />
            <div className="impactAnalysis">

                <Sidebar
                    collapsed={collapsed}
                    setcollapsed={setcollapsed} />

                <div className={collapsed ? "impactAnalysis-content collapsed" : "impactAnalysis-content"}>
                    <div className="impactAnalysis-header">
                        {/* <h1>Impact Analysis</h1> */}
                        <p>Analyze the potential impact of code changes before modifying your repository.</p>
                    </div>
                    <div className="impactAnalysis-search-section">
                        <h2> <FiActivity />Analyze Target</h2>

                        <div className="impactAnalysis-search-box">

                            <div className="impactAnalysis-input-wrapper">
                                <FiSearch className="impactAnalysis-search-icon" />

                                <input
                                    type="text"
                                    placeholder="Search file, function, or class..."
                                    value={query}
                                    onChange={(e) => searchFiles(e.target.value)}
                                />
                                {
                                    results.length > 0 && (

                                        <div className="impact-dropdown">

                                            {
                                                results.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        className="impact-dropdown-item"
                                                        onClick={() => {
                                                            setSelectedFile(file);
                                                            setQuery(file.path);
                                                            setResults([]);
                                                        }}
                                                    >
                                                        📄 {file.path}
                                                    </div>
                                                ))
                                            }

                                        </div>

                                    )
                                }
                            </div>
                            <button
                                className="impactAnalysis-btn"
                                onClick={analyzeImpact}
                                disabled={!selectedFile}
                            >
                                Analyze
                            </button>
                        </div>
                        {selectedFile && (
                            <p className="impactAnalysis-selected">
                                <FiFile />Selected: {selectedFile.path}
                            </p>
                        )}
                        <p className="impactAnalysis-example">
                            Examples:
                            <span> auth.js</span>
                            <span> • authenticateUser</span>
                            <span> • AuthService</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImpactAnalysis;