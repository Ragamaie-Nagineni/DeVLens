import dagre from "@dagrejs/dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const NODE_WIDTH = 180;
const NODE_HEIGHT = 50;
export function getLayoutedElements(nodes, edges) {
  dagreGraph.setGraph({
    rankdir: "TB", // Top -> Bottom
    ranksep: 120,
    nodesep: 80,
  });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
   dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const pos = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: pos.x - NODE_WIDTH / 2,
        y: pos.y - NODE_HEIGHT / 2,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
}