import react from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Repository.css"
import Header from "../../components/Header/Header";


function Repository() {
    const [collapsed, setcollapsed] = useState(false);
    
    return (
        <div>
        <Header/>
        <div className="repository">
            
            <Sidebar
                collapsed={collapsed}
                setcollapsed={setcollapsed} />
            
            <div className={collapsed ? "repository-content collapsed" : "repository-content"}>

                {/* content */}

            </div>
        </div>
        </div>
    )
}

export default Repository;