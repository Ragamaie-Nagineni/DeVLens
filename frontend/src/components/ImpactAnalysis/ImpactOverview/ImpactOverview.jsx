import "./ImpactOverview.css";
import {
    FiAlertTriangle,
    FiFile,
    FiCode,
    FiLayers,
} from "react-icons/fi";

function ImpactOverview({ impactData }) {

    return (
        <div className="impactOverview">

            <div className="impactOverview-header">
                <h2>Impact Overview</h2>
               
            </div>

            <div className="impactOverview-grid">

                <div className="impact-card">
                    <div className="impact-card-icon">
                        <FiAlertTriangle />
                    </div>

                    <div className="impact-card-content">
                        <span>Overall Risk</span>
                        <h3>{impactData.overallRisk}</h3>
                    </div>
                </div>

                <div className="impact-card">
                    <div className="impact-card-icon">
                        <FiFile />
                    </div>

                    <div className="impact-card-content">
                        <span>Files Impacted</span>
                        <h3>{impactData.filesImpacted}</h3>
                    </div>
                </div>

                <div className="impact-card">
                    <div className="impact-card-icon">
                        <FiCode />
                    </div>

                    <div className="impact-card-content">
                        <span>Functions Impacted</span>
                        <h3>{impactData.functionsImpacted}</h3>
                    </div>
                </div>

                <div className="impact-card">
                    <div className="impact-card-icon">
                        <FiLayers />
                    </div>

                    <div className="impact-card-content">
                        <span>Dependency Depth</span>
                        <h3>{impactData.dependencyDepth}</h3>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default ImpactOverview;