import { Router } from "express";
import { 
    getFileGraph,
    getFunctionGraph,
    getDependenciesGraph,
    getImpactGraph,
    getRepositoryGraph
 } from "../controllers/graphController.js";

const router = Router();

router.get("/file", getFileGraph);
router.get("/function", getFunctionGraph);
router.get("/dependencies", getDependenciesGraph);
router.get("/impact", getImpactGraph);
router.get("/repository", getRepositoryGraph);
router.get("/impactanalysis", async (req, res) => {
    try {
        const { repositoryId, file } = req.query;

        if (!repositoryId || !file) {
            return res.status(400).json({
                message: "repositoryId and file are required"
            });
        }

        res.json({
            target: file,
            overallRisk: "Medium",
            filesImpacted: 0,
            functionsImpacted: 0,
            dependencyDepth: 0,
            affectedFiles: [],
            affectedFunctions: [],
            dependencyTree: []
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to analyze impact"
        });
    }
});


export default router;