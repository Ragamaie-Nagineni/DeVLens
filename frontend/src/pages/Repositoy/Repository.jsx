import react,{ useState, useEffect }  from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Repository.css"
import Header from "../../components/Header/Header";
import Graph from "../../components/Graph/Graph";
import { useLocation } from "react-router-dom";


function Repository() {
    const [collapsed, setcollapsed] = useState(false);
    const location = useLocation();
    const graph=location.state?.graph;

    return (
        <div>
        <Header/>
        <div className="repository">
            
            <Sidebar
                collapsed={collapsed}
                setcollapsed={setcollapsed} />
            
            <div className={collapsed ? "repository-content collapsed" : "repository-content"}>

                {/* content */}

                <Graph graph={graph}/>

            </div>
        </div>
        </div>
    )
}

export default Repository;