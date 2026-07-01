import driver from "../db/neo4j.js";

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
}