import { useState } from "react";
import {
    FaCodeBranch,
    FaFolderOpen,
    FaSlidersH,
    FaPlus,
    FaFileCode
} from "react-icons/fa";
import "../SharedSettings.css"
import "./RepoSettings.css";

function RepoSettings() {

    const [settings, setSettings] = useState({
        defaultBranch: "Auto Detect",
        trigger: "Manual",
        autoAnalyze: true,
        includeComments: true,
        followSymlinks: false,
        language: "Auto Detect"
    });

    const [ignorePaths, setIgnorePaths] = useState([
        "node_modules",
        ".git",
        "dist",
        "build"
    ]);

    const [newPath, setNewPath] = useState("");

    const addPath = () => {

        if (!newPath.trim()) return;

        if (!ignorePaths.includes(newPath.trim())) {

            setIgnorePaths([
                ...ignorePaths,
                newPath.trim()
            ]);

        }

        setNewPath("");

    };

    const removePath = (path) => {

        setIgnorePaths(
            ignorePaths.filter(p => p !== path)
        );

    };

    const handleSave = () => {

        console.log(settings);
        console.log(ignorePaths);

        alert("Repository settings saved!");

    };

    return (

        <div className="repo-container">

            {/* ================= Analysis ================= */}

            <div className="settings-card">

                <div className="settings-title">

                    <FaCodeBranch className="settings-icon"/>

                    <div>

                        <h2>Analysis Defaults</h2>

                        <p>
                            Configure default repository analysis.
                        </p>

                    </div>

                </div>

                <div className="settings-form">

                    <label>Default Branch</label>

                    <select
                        value={settings.defaultBranch}
                        onChange={(e)=>
                            setSettings({
                                ...settings,
                                defaultBranch:e.target.value
                            })
                        }
                    >

                        <option>Auto Detect</option>
                        <option>main</option>
                        <option>master</option>
                        <option>develop</option>

                    </select>

                </div>

                <div className="settings-form">

                    <label>Re-analysis Trigger</label>

                    <select
                        value={settings.trigger}
                        onChange={(e)=>
                            setSettings({
                                ...settings,
                                trigger:e.target.value
                            })
                        }
                    >

                        <option>Manual</option>
                        <option>On Push</option>
                        <option>Daily</option>

                    </select>

                </div>

                <div className="settings-row">

                    <div>

                        <h4>Auto Re-analyze</h4>

                        <p>
                            Automatically analyze repositories after updates.
                        </p>

                    </div>

                    <label className="switch">

                        <input
                            type="checkbox"
                            checked={settings.autoAnalyze}
                            onChange={()=>
                                setSettings({
                                    ...settings,
                                    autoAnalyze:!settings.autoAnalyze
                                })
                            }
                        />

                        <span className="slider"></span>

                    </label>

                </div>

            </div>

            {/* ================= Ignore Paths ================= */}

            <div className="settings-card">

                <div className="settings-title">

                    <FaFolderOpen className="settings-icon"/>

                    <div>

                        <h2>Ignore Paths</h2>

                        <p>
                            Skip folders during repository analysis.
                        </p>

                    </div>

                </div>

                <div className="tag-container">

                    {

                        ignorePaths.map(path=>(

                            <div
                                key={path}
                                className="path-tag"
                            >

                                {path}

                                <button
                                    onClick={()=>removePath(path)}
                                >

                                    ×

                                </button>

                            </div>

                        ))

                    }

                </div>

                <div className="add-path">

                    <input
                        type="text"
                        placeholder="Add ignored path..."
                        value={newPath}
                        onChange={(e)=>setNewPath(e.target.value)}
                    />

                    <button
                        onClick={addPath}
                    >

                        <FaPlus/>

                    </button>

                </div>

            </div>

            {/* ================= Parsing ================= */}

            <div className="settings-card">

                <div className="settings-title">

                    <FaFileCode className="settings-icon"/>

                    <div>

                        <h2>Parsing & Analysis</h2>

                        <p>
                            Configure repository parsing behaviour.
                        </p>

                    </div>

                </div>

                <div className="settings-row">

                    <div>

                        <h4>Include Comments</h4>

                        <p>
                            Index comments for semantic search.
                        </p>

                    </div>

                    <label className="switch">

                        <input
                            type="checkbox"
                            checked={settings.includeComments}
                            onChange={()=>
                                setSettings({
                                    ...settings,
                                    includeComments:!settings.includeComments
                                })
                            }
                        />

                        <span className="slider"></span>

                    </label>

                </div>

                <div className="settings-row">

                    <div>

                        <h4>Follow Symbolic Links</h4>

                        <p>
                            Traverse symbolic links while indexing.
                        </p>

                    </div>

                    <label className="switch">

                        <input
                            type="checkbox"
                            checked={settings.followSymlinks}
                            onChange={()=>
                                setSettings({
                                    ...settings,
                                    followSymlinks:!settings.followSymlinks
                                })
                            }
                        />

                        <span className="slider"></span>

                    </label>

                </div>

                <div className="settings-form">

                    <label>Language Detection</label>

                    <select
                        value={settings.language}
                        onChange={(e)=>
                            setSettings({
                                ...settings,
                                language:e.target.value
                            })
                        }
                    >

                        <option>Auto Detect</option>
                        <option>JavaScript</option>
                        <option>TypeScript</option>
                        <option>Python</option>
                        <option>Java</option>

                    </select>

                </div>

            </div>

            <button
                className="settings-btn"
                onClick={handleSave}
            >

                Save Repository Settings

            </button>

        </div>

    );

}

export default RepoSettings;