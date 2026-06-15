import path from "path";

function buildGraph(repositoryAnalysis) {
    const nodes = [];
    const edges = [];
    const projectFiles = new Set(repositoryAnalysis.map(file => file.file));

    for (const analysis of repositoryAnalysis) {
        nodes.push({
            id: analysis.file,
            type: "file"
        })
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
    return { nodes, edges };
}

export default buildGraph;