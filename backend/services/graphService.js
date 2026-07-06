import driver from "../db/neo4j.js";

export async function getFileGraphService(repositoryId, path) {
    const session = driver.session();

    try {

        const result = await session.run(
            `
            MATCH (f:File {
                repositoryId:$repositoryId,
                path:$path
            })

            OPTIONAL MATCH (f)-[:IMPORTS]->(i:File)

            OPTIONAL MATCH (f)-[:EXPORTS]->(e)

            OPTIONAL MATCH (f)-[:DECLARES]->(d)

            RETURN
                f,
                collect(DISTINCT i) AS imports,
                collect(DISTINCT e) AS exports,
                collect(DISTINCT d) AS declarations
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

        return {
            file: record.get("f").properties,

            imports: record
                .get("imports")
                .filter(node => node)
                .map(node => node.properties),

            exports: record
                .get("exports")
                .filter(node => node)
                .map(node => node.properties),

            functions: record
                .get("declarations")
                .filter(node => node && node.labels.includes("Function"))
                .map(node => node.properties),

            classes: record
                .get("declarations")
                .filter(node => node && node.labels.includes("Class"))
                .map(node => node.properties),
        };

    } finally {
        await session.close();
    }
}

export async function getFunctionGraphService(
    repositoryId,
    file,
    name
) {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (fn:Function {
                repositoryId:$repositoryId,
                file:$file,
                name:$name
            })

            MATCH (f:File {
                repositoryId:$repositoryId,
                path:$file
            })

            OPTIONAL MATCH (fn)-[:CALLS]->(callee:Function)

            OPTIONAL MATCH (caller:Function)-[:CALLS]->(fn)

            RETURN
                fn,
                f,
                collect(DISTINCT callee) AS calls,
                collect(DISTINCT caller) AS calledBy
            `,
            {
                repositoryId,
                file,
                name
            }
        );

        if (result.records.length === 0) {
            return null;
        }

        const record = result.records[0];

        return {
            function: record.get("fn").properties,

            declaredIn: record.get("f").properties,

            calls: record
                .get("calls")
                .filter(node => node)
                .map(node => node.properties),

            calledBy: record
                .get("calledBy")
                .filter(node => node)
                .map(node => node.properties)
        };

    } finally {
        await session.close();
    }
}
export async function getDependenciesGraphService(
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

            OPTIONAL MATCH (f)-[:IMPORTS]->(dep:File)

            OPTIONAL MATCH (user:File)-[:IMPORTS]->(f)

            RETURN
                f,
                collect(DISTINCT dep) AS dependsOn,
                collect(DISTINCT user) AS usedBy
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

        return {
            file: record.get("f").properties,

            dependsOn: record
                .get("dependsOn")
                .filter(node => node)
                .map(node => node.properties),

            usedBy: record
                .get("usedBy")
                .filter(node => node)
                .map(node => node.properties)
        };

    } finally {
        await session.close();
    }
}
export async function getImpactGraphService(
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

        return {
            file: record.get("f").properties,
            affectedFiles,
            totalAffected: affectedFiles.length
        };

    } finally {

        await session.close();

    }

}