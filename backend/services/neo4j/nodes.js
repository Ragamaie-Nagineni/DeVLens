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