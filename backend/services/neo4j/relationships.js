/**
saveRepositoryNode()
saveFileNodes()
saveFunctionNodes()
saveClassNodes()
*/
/**
 Repository --CONTAINS--> File
File --IMPORTS--> File
File --DECLARES--> Function
Function --CALLS--> Function
Class --EXTENDS--> Class
*/
import path from "path";

export async function saveImportRelationships(session, repositoryAnalysis) {
    const fileMap = new Set();
    for (const file of repositoryAnalysis) {
        fileMap.add(file.file);
    }
    function resolveImport(currentFile, importPath) {
        if (!importPath.startsWith(".")) {
            return null;
        }
        const currentDirectory = path.dirname(currentFile);
        let resolved = path
            .join(currentDirectory, importPath)
            .replace(/\\/g, "/");

        const extensions = [
            "",
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
        ];
        for (const ext of extensions) {

            const candidate = resolved + ext;

            if (fileMap.has(candidate)) {
                return candidate;
            }
        }
        return null;
    }
    for (const file of repositoryAnalysis) {

        for (const imp of file.imports) {

            const resolved = resolveImport(file.file, imp);

            if (!resolved) continue;

            await session.run(
                `
                MATCH (from:File {path:$from})
                MATCH (to:File {path:$to})

                MERGE (from)-[:IMPORTS]->(to)
                `,
                {
                    from: file.file,
                    to: resolved,
                }
            );
        }
    }

    console.log("IMPORTS relationships saved.");
}

export async function saveFunctionNodes(session, repositoryAnalysis) {
    for (const file of repositoryAnalysis) {
        for (const func of file.functions) {
            await session.run(
                `
                MATCH (f:File {path:$file})

                MERGE (fn:Function {
                    name:$name,
                    file:$file
                })

                MERGE (f)-[:DECLARES]->(fn)
                `,
                {
                    file: file.file,
                    name: func.name,
                }
            );

        }

    }
    console.log("Function nodes saved.");
}
