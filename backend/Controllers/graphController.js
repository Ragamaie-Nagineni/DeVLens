import { 
    getFileGraphService,
    getFunctionGraphService,
    getDependenciesGraphService,
    getImpactGraphService,
    getRepositoryGraphService
 } from "../services/graphService.js";

export async function getFileGraph(req, res) {
    try {
        const { repositoryId, path } = req.query;

        if (!repositoryId || !path) {
            return res.status(400).json({
                message: "repositoryId and path are required"
            });
        }

        const file = await getFileGraphService(repositoryId, path);

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        res.json(file);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
export async function getFunctionGraph(req, res) {
    try {
        const { repositoryId, file, name } = req.query;

        const result = await getFunctionGraphService(
            repositoryId,
            file,
            name
        );

        if (!result) {
            return res.status(404).json({
                message: "Function not found"
            });
        }

        res.json(result);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
export async function getDependenciesGraph(req, res) {
    try {
        const { repositoryId, path } = req.query;

        if (!repositoryId || !path) {
            return res.status(400).json({
                message: "repositoryId and path are required"
            });
        }

        const result = await getDependenciesGraphService(
            repositoryId,
            path
        );

        if (!result) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        res.json(result);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
export async function getImpactGraph(req, res) {
    try {

        const { repositoryId, path } = req.query;

        if (!repositoryId || !path) {
            return res.status(400).json({
                message: "repositoryId and path are required"
            });
        }

        const result = await getImpactGraphService(
            repositoryId,
            path
        );

        if (!result) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
}
export async function getRepositoryGraph(req, res) {
    try {

        const { repositoryId } = req.query;

        if (!repositoryId) {
            return res.status(400).json({
                message: "repositoryId is required"
            });
        }

        const result = await getRepositoryGraphService(repositoryId);

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
}