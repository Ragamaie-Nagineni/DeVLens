import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecentRepositories.css";
import {
    FaCube,
    FaFolder,
    FaCode,
    FaLayerGroup,
    FaArrowRight,
    FaClock,
} from "react-icons/fa";

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
            <h2><FaClock /> Recent Repositories</h2>

            {repositories.map((repo) => (
                <div className="recent-repo-card" key={repo.id}>
                    <div className="repo-left">
                        <div className="repo-icon"><FaCube /></div>

                        <div className="repo-details">
                            <h3>{repo.name}</h3>

                            <div className="repo-metrics">
                                <span><FaFolder /> {repo.metrics?.files ?? 0} files</span>
                                <span><FaCode /> {repo.metrics?.functions ?? 0} functions</span>
                                <span><FaLayerGroup /> {repo.metrics?.classes ?? 0} classes</span>
                                <span>{new Date(repo.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="explore-btn"
                        onClick={() =>
                            navigate("/repository", {
                                state: {
                                    repositoryId: repo,
                                },
                            })
                        }
                    >
                        <FaArrowRight />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default RecentRepositories;