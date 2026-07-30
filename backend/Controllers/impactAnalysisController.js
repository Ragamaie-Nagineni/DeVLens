import { getImpactAnalysisService } from "../services/impactAnalysisService.js";

export async function getImpactAnalysis(req, res) {

    try {

        const { repositoryId, path } = req.query;

        if (!repositoryId || !path) {
            return res.status(400).json({
                message: "repositoryId and path are required"
            });
        }

        const result = await getImpactAnalysisService(
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