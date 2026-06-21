import react, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Repository.css"
import Header from "../../components/Header/Header";
import Graph from "../../components/Graph/Graph";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LatestAnalysisCard from "../../components/LatestAnalysisCard/LatestAnalysisCard";


function Repository() {
    const [collapsed, setcollapsed] = useState(false);
    const location = useLocation();
    //const graph=location.state?.graph;
    const [graph, setGraph] = useState(location.state?.graph || null);

    useEffect(() => {
        if (graph) return;

        const fetchGraph = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));

                if (!user) return;

                const res = await axios.get(
                    `http://localhost:3000/api/repository/latest/${user.id}`
                );

                if (res.data) {
                    setGraph(res.data.graph);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchGraph();
    }, [graph]);

    return (
        <div>
            <Header />
            <div className="repository">

                <Sidebar
                    collapsed={collapsed}
                    setcollapsed={setcollapsed} />

                <div className={collapsed ? "repository-content collapsed" : "repository-content"}>

                    {/* content */}
                   <LatestAnalysisCard/>

                    {graph ? (<Graph graph={graph} />) : (<p>No repository analyzed yet.</p>)}

                </div>
            </div>
        </div>
    )
}

export default Repository;