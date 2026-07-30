import { Router } from "express";
import { getImpactAnalysis } from "../controllers/impactAnalysisController.js";

const router = Router();

router.get("/", getImpactAnalysis);

export default router;