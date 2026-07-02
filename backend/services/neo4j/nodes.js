/**
 * Repository
File
Function 
Class 
*/

import driver from "../../db/neo4j.js";

export async function saveRepositoryNode(session, repository) {
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
export async function saveFileNodes(session, repository, graph) {
    for (const node of graph.nodes) {
        if (node.id === "__ROOT__") continue;

        await session.run(
            `
            MERGE (f:File {path:$path})
            SET f.name=$name
            `,
            {
                repositoryId: repository.id,
                path: node.id,
                name: node.id.split("/").pop(),
            }
        );
    }
}
export async function saveFolderNodes(session, repositoryAnalysis, repository) {

    const createdFolders = new Set();

    for (const file of repositoryAnalysis) {

        const parts = file.file.split("/");

        const folders = parts.slice(0, -1);

        let currentPath = "";
        let parentPath = null;

        for (const folder of folders) {

            currentPath = currentPath
                ? `${currentPath}/${folder}`
                : folder;

            if (!createdFolders.has(currentPath)) {

                createdFolders.add(currentPath);

                await session.run(
                    `
                    MERGE (d:Directory {path:$path})
                    SET d.name=$name
                    `,
                    {
                        path: currentPath,
                        name: folder,
                    }
                );

                if (parentPath === null) {

                    await session.run(
                        `
                        MATCH (r:Repository {id:$repositoryId})
                        MATCH (d:Directory {path:$directory})

                        MERGE (r)-[:CONTAINS]->(d)
                        `,
                        {
                            repositoryId: repository.id,
                            directory: currentPath,
                        }
                    );

                } else {

                    await session.run(
                        `
                        MATCH (parent:Directory {path:$parent})
                        MATCH (child:Directory {path:$child})

                        MERGE (parent)-[:CONTAINS]->(child)
                        `,
                        {
                            parent: parentPath,
                            child: currentPath,
                        }
                    );
                }

            }

            parentPath = currentPath;
        }

        const fileName = parts[parts.length - 1];

        if (parentPath) {

            await session.run(
                `
                MATCH (d:Directory {path:$directory})
                MATCH (f:File {path:$file})

                MERGE (d)-[:CONTAINS]->(f)
                `,
                {
                    directory: parentPath,
                    file: file.file,
                }
            );

        } else {

            await session.run(
                `
                MATCH (r:Repository {id:$repositoryId})
                MATCH (f:File {path:$file})

                MERGE (r)-[:CONTAINS]->(f)
                `,
                {
                    repositoryId: repository.id,
                    file: file.file,
                }
            );

        }

    }

    console.log("Directory hierarchy saved.");
}