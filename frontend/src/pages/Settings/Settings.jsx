import { useState } from "react";
import {
    FaUser,
    FaCodeBranch,
    FaProjectDiagram,
    FaRobot,
    FaShieldAlt,
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import ProfileAccount from "../../components/ProfileAccount/ProfileAccount";

import "./Settings.css";

function Settings() {
    const [collapsed, setCollapsed] = useState(false);

    const [activeTab, setActiveTab] = useState("profile");

    return (
        <>
            <Header />

            <div className="settings">

                <Sidebar
                    collapsed={collapsed}
                    setcollapsed={setCollapsed}
                />

                <div
                    className={
                        collapsed
                            ? "settings-content collapsed"
                            : "settings-content"
                    }
                >
                    <div className="settings-wrapper">
                        <div className="settings-header">
                            <h1>Settings</h1>
                            <p>Manage your account and preferences</p>
                        </div>
                        <div className="settings-tabs">
                            <button
                                className={activeTab === "profile" ? "tab active" : "tab"}
                                onClick={() => setActiveTab("profile")}
                            >
                                <FaUser />
                                Profile & Account
                            </button>
                            <button
                                className={activeTab === "repository" ? "tab active" : "tab"}
                                onClick={() => setActiveTab("repository")}
                            >
                                <FaCodeBranch />
                                Repository
                            </button>
                            <button
                                className={activeTab === "graph" ? "tab active" : "tab"}
                                onClick={() => setActiveTab("graph")}
                            >
                                <FaProjectDiagram />
                                Graph Settings
                            </button>
                            <button
                                className={activeTab === "ai" ? "tab active" : "tab"}
                                onClick={() => setActiveTab("ai")}
                            >
                                <FaRobot />
                                AI Settings
                            </button>
                            <button
                                className={activeTab === "security" ? "tab active" : "tab"}
                                onClick={() => setActiveTab("security")}
                            >
                                <FaShieldAlt />
                                Security & Privacy
                            </button>

                        </div>

                        <div className="settings-panel">

                            {activeTab === "profile" && <ProfileAccount />}

                            {activeTab === "repository" && (
                                <h2>Repository Settings (Coming Soon)</h2>
                            )}

                            {activeTab === "graph" && (
                                <h2>Graph Settings (Coming Soon)</h2>
                            )}

                            {activeTab === "ai" && (
                                <h2>AI Settings (Coming Soon)</h2>
                            )}

                            {activeTab === "security" && (
                                <h2>Security & Privacy (Coming Soon)</h2>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;