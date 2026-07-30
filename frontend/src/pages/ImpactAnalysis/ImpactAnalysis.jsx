import react from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ImpactAnalysis.css"
import Header from "../../components/Header/Header";
import { FiSearch, FiActivity, FiFile } from "react-icons/fi";
import axios from "axios";
import ImpactOverview from "../../components/ImpactAnalysis/ImpactOverview/ImpactOverview";
import DependencyTree from "../../components/ImpactAnalysis/DependencyTree/DependencyTree";

function ImpactAnalysis() {
    const [collapsed, setcollapsed] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [repository, setRepository] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [impactData, setImpactData] = useState(null);
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

    useEffect(() => {

        if (!repository) return;

        const file = localStorage.getItem("selectedImpactFile");

        if (!file) return;

        setSelectedFile({
            path: file
        });

        setQuery(file);

        analyzeImpact(file);

    }, [repository]);

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

    const analyzeImpact = async (filePath) => {

        if (!repository || !filePath) return;

        console.log("Repository:", repository.id);
        console.log("Path:", filePath);

        try {

            const response = await axios.get(
                "http://localhost:3000/api/impact-analysis",
                {
                    params: {
                        repositoryId: repository.id,
                        path: filePath
                    }
                }
            );

            setImpactData(response.data);

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
                                                            localStorage.setItem(
                                                                "selectedImpactFile",
                                                                file.path
                                                            );
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
                                onClick={analyzeImpact/* (selectedFile?.path) */}
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
                    {
                        impactData && (
                            <>
                                <ImpactOverview impactData={impactData} />

                                <DependencyTree impactData={impactData} />

                                {/* <ImpactSummary impactData={impactData} />

            <AISuggestions impactData={impactData} /> */}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ImpactAnalysis;