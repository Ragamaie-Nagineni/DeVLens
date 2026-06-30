import React, { useState, useEffect, useMemo } from "react";
import { getLayoutedElements } from "../../utils/layoutGraph";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap
} from "reactflow";
import "reactflow/dist/style.css"
import "./Graph.css"
import { FaLock, FaLockOpen } from "react-icons/fa";
function Graph({ graph, onNodeClick }) {
    const [locked, setLocked] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    console.log(onNodeClick);
    const layouted = useMemo(() => {
        if (!graph) {
            return { nodes: [], edges: [] };
        }

        const nodes = graph.nodes.map((node) => ({
            id: node.id,
            data: {
                label:
                    node.id === "__ROOT__"
                        ? `${node.label}`
                        : node.id.split("/").pop()
            },
            style: {
                background: "#141B4D",
                color: "#ffffff",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: "10px",
                padding: "8px 12px",
                minWidth: "120px",
                maxWidth: "250px",
                whiteSpace: "normal",
                wordBreak: "break-word",
                fontSize: "13px",
                fontWeight: 500,
            }
        }));

        const edges = graph.edges.map((edge, index) => ({
            id: `edge-${index}`,
            source: edge.from,
            target: edge.to,
            animated: true,
            markerEnd: {
                type: "arrowclosed",
            },
        }));

        return getLayoutedElements(nodes, edges);
    }, [graph]);

    return (
        <>
            {locked && (
                <div className="graph-banner">
                    Graph is locked. Click <strong>Unlock</strong> to pan, zoom and
                    explore.
                </div>
            )}
            <div className={`graph-container ${isFullscreen ? "graph-fullscreen" : ""}`}>

                <div className="graph-toolbar">
                    <button
                        className="graph-btn"
                        onClick={() => setLocked((prev) => !prev)}
                    >
                        {locked ? <FaLockOpen /> : <FaLock />}
                    </button>
                    <button
                        className="graph-btn"
                        onClick={() => setIsFullscreen((prev) => !prev)}
                    >
                        {isFullscreen ? "Exit" : "⛶ "}
                    </button>
                </div>

                <ReactFlow
                    nodes={layouted.nodes}
                    edges={layouted.edges}
                    fitView
                    zoomOnScroll={!locked}
                    panOnScroll={!locked}
                    panOnDrag={!locked}
                    nodesDraggable={!locked}
                    elementsSelectable={!locked}
                    preventScrolling={false}
                    onNodeClick={(event, node) => {
                        onNodeClick(node.id);
                    }}
                >
                    {/*  <Controls /> */}
                    {/*   <MiniMap /> */}
                    <Background />
                </ReactFlow>
            </div>
        </>
    )
}

export default Graph;