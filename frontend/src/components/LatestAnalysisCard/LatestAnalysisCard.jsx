import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LatestAnalysisCard.css"

function LatestAnalysisCard() {
    const [repository, setRepository] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLatestRepo = async () => {
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

        fetchLatestRepo();
    }, []);

    if (!repository) {
        return null;
    }

    return (
        <div className="repository-summary-card">
            <h2>📦 {repository.metrics?.repository?.name}</h2>

            <div className="summary-status">
                <span className="status-pill">
                    ✅ Analysis Complete
                </span>
            </div>

            <div className="metrics-grid">
                <div className="metric-card">
                    <h4>📁 Files</h4>
                    <span>{repository.metrics?.files}</span>
                </div>

                <div className="metric-card">
                    <h4>⚙️ Functions</h4>
                    <span>{repository.metrics?.functions}</span>
                </div>

                <div className="metric-card">
                    <h4>🔗 Imports</h4>
                    <span>{repository.metrics?.imports}</span>
                </div>

                <div className="metric-card">
                    <h4>🏗️ Classes</h4>
                    <span>{repository.metrics?.classes}</span>
                </div>
            </div>

            <p className="summary">
                {repository.metrics?.repository?.summary}
            </p>

            {/* <button
                className="explore-btn"
                onClick={() =>
                    navigate("/repository", {
                        state: {
                            graph: repository.graph,
                        },
                    })
                }
            >
                🚀 Explore Repository
            </button> */}
        </div>
    );
}

export default LatestAnalysisCard;