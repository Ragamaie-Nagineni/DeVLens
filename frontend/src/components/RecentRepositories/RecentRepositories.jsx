import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecentRepositories.css";

function RecentRepositories() {
    const [repositories, setRepositories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user) return;

                const res = await axios.get(
                    `http://localhost:3000/api/repository/recent/${user.id}`
                );

                setRepositories(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRepositories();
    }, []);

    return (
        <div className="recent-repositories">
            <h2>🕘 Recent Repositories</h2>

            {repositories.map((repo) => (
                <div className="recent-repo-card" key={repo.id}>
                    <div className="repo-left">
                        <div className="repo-icon">📦</div>

                        <div className="repo-details">
                            <h3>{repo.repo_name}</h3>

                            <div className="repo-metrics">
                                <span>📁 {repo.metrics?.files} files</span>
                                <span>⚙️ {repo.metrics?.functions} functions</span>
                                <span>🏗️ {repo.metrics?.classes} classes</span>
                                <span>
                                    {new Date(repo.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="explore-btn"
                        onClick={() =>
                            navigate("/repository", {
                                state: {
                                    repositoryId: repo.id,
                                },
                            })
                        }
                    >
                        →
                    </button>
                </div>
            ))}
        </div>
    );
}

export default RecentRepositories;