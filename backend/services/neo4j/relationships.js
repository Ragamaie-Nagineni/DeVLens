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
export async function saveCallRelationships(session, repositoryAnalysis) {
    // Function lookup
    const functionMap = new Map();
    for (const file of repositoryAnalysis) {
        for (const func of file.functions) {
            functionMap.set(
                `${file.file}:${func.name}`,
                {
                    file: file.file,
                    name: func.name,
                    calls: func.calls,
                }
            );
        }
    }
    // File lookup
    const fileMap = new Set();

    for (const file of repositoryAnalysis) {
        fileMap.add(file.file);
    }
    // Resolve relative imports
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
            ".tsx",
        ];

        for (const ext of extensions) {

            const candidate = resolved + ext;

            if (fileMap.has(candidate)) {
                return candidate;
            }
        }

        return null;
    }
    // Build import map
    const importMap = new Map();

    for (const file of repositoryAnalysis) {

        const imports = {};

        for (const imp of file.imports) {

            const resolved = resolveImport(file.file, imp);

            if (!resolved) continue;

            const importName = imp.split("/").pop();

            const cleanName = importName.replace(/\.(js|jsx|ts|tsx)$/, "");

            imports[cleanName] = resolved;
        }

        importMap.set(file.file, imports);
    }
    //connecting evrything

    for (const file of repositoryAnalysis) {

        const imports = importMap.get(file.file);

        for (const func of file.functions) {

            for (const call of func.calls) {

                const targetFile = imports?.[call];

                if (!targetFile) continue;

                const target = functionMap.get(
                    `${targetFile}:${call}`
                );

                if (!target) continue;

                await session.run(
                    `MATCH (caller:Function {
                    name:$callerName,
                    file:$callerFile
                    })
                    MATCH (callee:Function {
                    name:$calleeName,
                    file:$calleeFile
                    })
                   MERGE (caller)-[:CALLS]->(callee)`,
                    {
                        callerName: func.name,
                        callerFile: file.file,

                        calleeName: target.name,
                        calleeFile: target.file,
                    }
                );
            }
        }
    }
    console.log("calls saved");
}
export async function saveExportRelationships(session, repositoryAnalysis) {

    for (const file of repositoryAnalysis) {

        for (const exp of file.exports) {

            if (exp.kind === "function") {

                await session.run(
                    `
                    MATCH (f:File {path:$file})

                    MATCH (fn:Function {
                        name:$name,
                        file:$file
                    })

                    MERGE (f)-[:EXPORTS]->(fn)
                    `,
                    {
                        file: file.file,
                        name: exp.name,
                    }
                );
            }

            else if (exp.kind === "class") {

                await session.run(
                    `
                    MATCH (f:File {path:$file})

                    MATCH (c:Class {
                        name:$name,
                        file:$file
                    })

                    MERGE (f)-[:EXPORTS]->(c)
                    `,
                    {
                        file: file.file,
                        name: exp.name,
                    }
                );
            }

        }

    }

    console.log("EXPORTS relationships saved.");
}