import path from "path";

function buildGraph(repositoryAnalysis, repoName) {
    const nodes = [];
    const edges = [];
    nodes.push({
        id: "__ROOT__",
        type: "root",
        label: repoName,
    });
    const projectFiles = new Set(repositoryAnalysis.map(file => file.file));
    const ignoredFiles = new Set([
  "vite.config.js",
  "eslint.config.js",
  "tailwind.config.js",
  "postcss.config.js",
  "package.json",
  "package-lock.json",
]);
    for (const analysis of repositoryAnalysis) {
        nodes.push({
            id: analysis.file,
            type: "file"
        })
        /* for(const fn of analysis.functions){
            const functionId=`${analysis.file}:${fn.name}`;
            nodes.push({
                id:functionId,
                type:"function"
            })
            edges.push({
                from:analysis.file,
                to:functionId,
                type:"CONTAINS"
            })
        } */
        const fileName = path.posix.basename(analysis.file);
        if (ignoredFiles.has(fileName)) {
  continue;
}
        if (
            fileName === "main.jsx" ||
            fileName === "main.js" ||
            fileName === "index.jsx" ||
            fileName === "index.js" ||
            fileName === "server.js"
        ) {
            edges.push({
                from: "__ROOT__",
                to: analysis.file,
                type: "ROOT"
            });
        }
        for (const imported of analysis.imports) {
            if (!imported.startsWith("./") && !imported.startsWith("../")) { continue; }
            //const currentDir=path.posix.join(currentDir,imported);

            const currentDir = path.posix.dirname(analysis.file);
            const resolved = path.posix.normalize(
                path.posix.join(currentDir, imported)
            );
            const candidates = [
                resolved,
                resolved + ".js",
                resolved + ".jsx",
                resolved + ".ts",
                resolved + ".tsx"
            ];

            const target = candidates.find(c => projectFiles.has(c));
            if (target) {
                edges.push({
                    from: analysis.file,
                    to: target,
                    type: "IMPORTS"
                })
            }
        }
    }
    /*return { nodes, edges }; */

    /* removes disconnected edges */
    const connectedIds = new Set();
    edges.forEach(edge => {
        connectedIds.add(edge.from);
        connectedIds.add(edge.to);
    });

    const filteredNodes = nodes.filter(node =>
        node.id === "__ROOT__" || connectedIds.has(node.id)
    );

    return {
        nodes: filteredNodes,
        edges,
        repoName
    };
}

export default buildGraph;