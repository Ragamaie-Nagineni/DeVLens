/* import driver from "../db/neo4j.js";

export async function saveGraph(repository, graph) {
    const session = driver.session();

    try {
        console.log("Saving repository:", repository);
        console.log("Graph nodes:", graph.nodes.length);

        await session.run(
            `
            MERGE (r:Repository {id: $id})
            SET r.name = $name
            `,
            {
                id: repository.id,
                name: repository.name,
            }
        );

        for (const node of graph.nodes) {
            console.log("Node:", node);

            if (node.id === "__ROOT__") continue;

            await session.run(
`
MATCH (r:Repository {id:$repositoryId})

MERGE (f:File {path:$path})
SET f.name = $name

MERGE (r)-[:CONTAINS]->(f)
`,
{
    repositoryId: repository.id,
    path: node.id,
    name: node.id.split("/").pop(),
});
        }

        console.log("Graph saved to Neo4j ");
    } catch (err) {
        console.error("Neo4j Error:", err);
    } finally {
        await session.close();
    }
} */

import driver from "../db/neo4j.js";
import path from "path";

async function saveRepositoryNode(session, repository) {
    await session.run(
        `
        MERGE (r:Repository {id: $id})
        SET r.name = $name
        `,
        {
            id: repository.id,
            name: repository.name,
        }
    );
}

async function saveFileNodes(session, repository, graph) {
    for (const node of graph.nodes) {
        if (node.id === "__ROOT__") continue;

        await session.run(
            `
            MATCH (r:Repository {id:$repositoryId})

            MERGE (f:File {path:$path})
            SET f.name = $name

            MERGE (r)-[:CONTAINS]->(f)
            `,
            {
                repositoryId: repository.id,
                path: node.id,
                name: node.id.split("/").pop(),
            }
        );
    }
}

async function saveImportRelationships(session, repositoryAnalysis) {
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
                `MATCH (from:File {path: $from})
                 MATCH (to:File {path: $to})
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

export async function saveGraph(repository, graph, repositoryAnalysis) {
    const session = driver.session();

    try {
        await saveRepositoryNode(session, repository);

        await saveFileNodes(session, repository, graph);

        await saveImportRelationships(session, repositoryAnalysis);

        console.log("Graph saved to Neo4j");
    } catch (err) {
        console.error(err);
    } finally {
        await session.close();
    }
}