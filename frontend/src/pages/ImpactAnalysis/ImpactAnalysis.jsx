import react from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ImpactAnalysis.css"
import Header from "../../components/Header/Header";
function ImpactAnalysis() {
    const [collapsed, setcollapsed] = useState(false);

    return (
        <div>
            <Header />
            <div className="impactAnalysis">

                <Sidebar
                    collapsed={collapsed}
                    setcollapsed={setcollapsed} />

                <div className={collapsed ? "impactAnalysis-content collapsed" : "impactAnalysis-content"}>
                 <div className="impactAnalysis-header">
                            <h1>Impact Analysis</h1>
                            <p>Analyze the potential impact of code changes before modifying your repository.</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ImpactAnalysis;