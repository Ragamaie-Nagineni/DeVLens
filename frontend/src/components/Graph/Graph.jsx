import React,{useState,useEffect,useMemo} from "react";
import{
    ReactFlow,
    Background,
    Controls,
    MiniMap
} from "reactflow";
import "reactflow/dist/style.css"
import "./Graph.css"
function Graph({graph}){


   const nodes=useMemo(()=>{
    if(!graph) return [];

    return graph.nodes.map((node,index)=>({
        id:node.id,
        data:{label:node.id.split("/").pop()},
        position:{
            x: (index %5)*250,
            y:Math.floor(index/5)*150
        }
    }))
   },[graph])

    const edges=useMemo(()=>{
        if(!graph) return [];
        return graph.edges.map((edge,index)=>({
            id:`edge-${index}`,
            source:edge.from,
            target:edge.to,
            label:edge.type
        }))

    },[graph]);

    return(
        <div className="graph-container">
            <ReactFlow nodes={nodes} edges={edges} fitView >
                <Controls/>
                <Background/>
            </ReactFlow>
        </div>
    )
}

export default Graph;