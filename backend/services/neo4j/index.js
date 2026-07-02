import driver from "../../db/neo4j.js";

import {
    saveRepositoryNode,
    saveFileNodes,
} from "./nodes.js";

import {
    saveImportRelationships,
    saveFunctionNodes
} from "./relationships.js";

export async function saveGraph(repository, graph, repositoryAnalysis) {

    const session = driver.session();

    try {
        await saveRepositoryNode(session, repository);
        await saveFileNodes(session, repository, graph);
        await saveImportRelationships(session, repositoryAnalysis);
        await saveFunctionNodes(session, repositoryAnalysis);
        console.log("Neo4j graph saved.");

    } catch (err) {
        console.error("Neo4j Error:", err);
    } finally {
        await session.close();
    }
}