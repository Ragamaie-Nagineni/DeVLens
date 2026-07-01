import driver from "../db/neo4j.js"

export async function saveRepository(repository){
    const session=driver.session();
     try {
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
        console.log("Repository saved to Neo4j");
    } catch (err) {
        console.error("Neo4j Error:", err);
    } finally {
        await session.close();
    }
}