import driver from "../db/neo4j.js";
export async function getImpactAnalysisService(
    repositoryId,
    path
) {

    const session = driver.session();

    try {

        const result = await session.run(
            `
            MATCH (f:File {
                repositoryId:$repositoryId,
                path:$path
            })

            OPTIONAL MATCH (affected:File)-[:IMPORTS*1..]->(f)

            RETURN
                f,
                collect(DISTINCT affected) AS affectedFiles
            `,
            {
                repositoryId,
                path
            }
        );

        if (result.records.length === 0) {
            return null;
        }

        const record = result.records[0];

        const affectedFiles = record
            .get("affectedFiles")
            .filter(node => node)
            .map(node => node.properties);
        const filesImpacted = affectedFiles.length;

        let overallRisk = "Low";

        if (filesImpacted >= 5) {
            overallRisk = "High";
        } else if (filesImpacted >= 2) {
            overallRisk = "Medium";
        }
        const functionsResult = await session.run(
            `
    MATCH (file:File)-[:DECLARES]->(fn:Function)
    WHERE file.repositoryId = $repositoryId
      AND file.path IN $paths

    RETURN count(fn) AS totalFunctions
    `,
            {
                repositoryId,
                paths: affectedFiles.map(f => f.path)
            }
        );

        const functionsImpacted =
            functionsResult.records[0]
                .get("totalFunctions")
                .toNumber();

        const depthResult = await session.run(
            `
    MATCH p=(affected:File)-[:IMPORTS*]->(f:File {
        repositoryId:$repositoryId,
        path:$path
    })

    RETURN max(length(p)) AS depth
    `,
            {
                repositoryId,
                path
            }
        );

        const dependencyDepth =
            depthResult.records[0]
                .get("depth")
                ?.toNumber() || 0;

        return {
            target: record.get("f").properties,

            overallRisk,

            filesImpacted,

            functionsImpacted,

            dependencyDepth,

            affectedFiles,

            dependencyTree: affectedFiles
        };

    } finally {

        await session.close();

    }

}