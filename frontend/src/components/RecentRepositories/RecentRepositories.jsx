import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecentRepositories.css";

function RecentRepositories() {
    const [repositories, setRepositories] = useState([]);

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
            <h2>Recent Repositories</h2>

            {repositories.map((repo) => (
                <div className="recent-repo-card" key={repo.id}>
                    <h3>{repo.repo_name}</h3>

                    <p>{repo.summary}</p>

                    <div className="repo-metrics">
                        <span className="metric-pill">
                            📁 {repo.metrics?.files} Files
                        </span>

                        <span className="metric-pill">
                            ⚙️ {repo.metrics?.functions} Functions
                        </span>

                        <span className="metric-pill">
                            🏗️ {repo.metrics?.classes} Classes
                        </span>
                    </div>

                    <small>
                        Analyzed on{" "}
                        {new Date(repo.created_at).toLocaleDateString()}
                    </small>

                    <button className="explore-btn">
                        🚀 Explore Repository
                    </button>
                </div>
            ))}
        </div>
    );
}

export default RecentRepositories;