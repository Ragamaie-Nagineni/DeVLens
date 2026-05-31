import react from "React";
import { useState, useEffect } from "React";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css"
import { FaUpload } from "react-icons/fa";

function Dashboard() {
    return (
        <div className="Dashboard">
            <Sidebar />
            <p className="dashboard-text">Connect a repository to get started with AI-powered code analysis</p>
            <div className="connect-repo-card">

                <h3>Connect Repository</h3>
                <div className="repo-input-container">
                    <input type="link" placeholder="https://github.com/usename/repository"></input>
                    <button>ANALYSE</button>
                </div>
                <div className="or-divider">
                    <span>OR</span>
                </div>
                <div className="upload-box">
                    <div className="upload-content ">
                        <div className="upload-icon"><FaUpload /></div>
                        <h3>Upload ZIP File</h3>
                        <p>Drag and drop or cick to browse</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;