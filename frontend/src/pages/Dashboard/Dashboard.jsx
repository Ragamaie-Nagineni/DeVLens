import react from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css"
import Header from "../../components/Header/Header";
import UploadBox from "../../components/uploadBox/UploadBox.jsx"
import RecentRepositories from "../../components/RecentRepositories/RecentRepositories.jsx";

function Dashboard() {
    const [collapsed, setcollapsed] = useState(false);

    return (
        <div>
        <Header/>
        <div className="dashboard">
            
            <Sidebar
                collapsed={collapsed}
                setcollapsed={setcollapsed} />
            
            <div className={collapsed ? "dashboard-content collapsed" : "dashboard-content"}>

                <p className="dashboard-text">Connect a repository to get started with AI-powered code analysis</p>
               <UploadBox  />
               <RecentRepositories/>
            </div>
        </div>
        </div>
    )
}

export default Dashboard;