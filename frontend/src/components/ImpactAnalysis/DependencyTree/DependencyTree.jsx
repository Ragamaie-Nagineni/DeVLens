import "./DependencyTree.css";
import { FiGitBranch, FiFile } from "react-icons/fi";

function DependencyTree({ impactData }) {

    const dependencies = impactData?.dependencyTree || [];

    return (
        <div className="dependencyTree">

            <div className="dependencyTree-header">
                <h2>
                    <FiGitBranch />
                    Dependency Tree
                </h2>

                <p>
                    Visualize how changes propagate through dependent files and
                    modules.
                </p>
            </div>

            <div className="dependencyTree-card">

                {
                    dependencies.length === 0 ? (

                        <div className="dependencyTree-empty">

                            <FiFile className="dependencyTree-empty-icon" />

                            <h3>No Dependency Data</h3>

                            <p>
                                Analyze a repository to view dependency
                                relationships here.
                            </p>

                        </div>

                    ) : (

                        <div className="dependencyTree-list">

                            {
                                dependencies.map((item, index) => (

                                    <div
                                        key={index}
                                        className="dependencyTree-node"
                                    >

                                        <FiFile />

                                         <span>{item.path}</span>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </div>
    );

}

export default DependencyTree;