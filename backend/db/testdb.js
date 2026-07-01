import driver from "./neo4j.js";

const session = driver.session();

await session.run("RETURN 'Hello Neo4j'");

console.log("Connected");