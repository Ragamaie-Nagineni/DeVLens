import React, { useEffect, useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import "./LatestAnalysisCard.css"
import {
    FaCube,
    FaFolder,
    FaCode,
    FaArrowRight,
    FaLayerGroup,
    FaCheckCircle,
    FaFileImport,
    FaCodeBranch
} from "react-icons/fa";

function LatestAnalysisCard({ repository }) {
  if (!repository) return null;
   
    return (
        <div className="repository-summary-card">
            <div className="summary-header">
                <div>
                    <h2><FaCodeBranch/> <span>{repository.metrics?.repository?.name}</span></h2>

                    <p className="summary">
                        {repository.metrics?.repository?.summary}
                    </p>
                </div>

                <span className="status-pill">
                    <FaCheckCircle />
                    Analysis Complete
                </span>
            </div>

            <div className="metrics-grid">
                <div className="metric-card">
                    <h4><FaFolder /> Files</h4>
                    <span>{repository.metrics?.files}</span>
                </div>

                <div className="metric-card">
                    <h4><FaCode /> Functions</h4>
                    <span>{repository.metrics?.functions}</span>
                </div>

                <div className="metric-card">
                    <h4>< FaFileImport/> Imports</h4>
                    <span>{repository.metrics?.imports}</span>
                </div>

                <div className="metric-card">
                    <h4><FaLayerGroup /> Classes</h4>
                    <span>{repository.metrics?.classes}</span>
                </div>
            </div>


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