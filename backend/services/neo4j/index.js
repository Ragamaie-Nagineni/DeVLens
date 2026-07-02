import driver from "../../db/neo4j.js";

import {
    saveRepositoryNode,
    saveFileNodes,
    saveFolderNodes
} from "./nodes.js";

import {
    saveImportRelationships,
    saveFunctionNodes,
    saveCallRelationships,
} from "./relationships.js";

export async function saveGraph(repository, graph, repositoryAnalysis) {

    const session = driver.session();

    try {
        await saveRepositoryNode(session, repository);
        await saveFolderNodes(session,repositoryAnalysis,repository);
        await saveFileNodes(session, repository, graph);
        await saveImportRelationships(session, repositoryAnalysis);
        await saveFunctionNodes(session, repositoryAnalysis);
        await saveCallRelationships(session,repositoryAnalysis);
        console.log("Neo4j graph saved.");

    } catch (err) {
        console.error("Neo4j Error:", err);
    } finally {
        await session.close();
    }
}