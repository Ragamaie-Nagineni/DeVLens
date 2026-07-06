import { Router } from "express";
import { 
    getFileGraph,
    getFunctionGraph,
    getDependenciesGraph,
    getImpactGraph
 } from "../controllers/graphController.js";

const router = Router();

router.get("/file", getFileGraph);
router.get("/function", getFunctionGraph);
router.get("/dependencies", getDependenciesGraph);
router.get("/impact", getImpactGraph);

export default router;