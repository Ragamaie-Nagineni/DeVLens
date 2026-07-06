import { Router } from "express";
import { 
    getFileGraph,
    getFunctionGraph
 } from "../controllers/graphController.js";

const router = Router();

router.get("/file", getFileGraph);
router.get("/function", getFunctionGraph);

export default router;