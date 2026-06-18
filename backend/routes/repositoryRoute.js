import { Router } from "express";
import cloneRepository from "../services/cloneRepository.js";
import walkDirectory from "../services/fileWalker.js";
import parseJavaScriptFile from "../services/parserService.js"
import buildGraph from "../services/graphBuilder.js";
import path from "path"

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { repoUrl } = req.body;
        if (!repoUrl.startsWith("https://github.com/")) {
            return res.status(400).json({
                success: false,
                message: "Invalid GitHub URL"
            });
        }
        console.log("repository url:", repoUrl);
        const result = await cloneRepository(repoUrl);
        console.log(result);
        const files = await walkDirectory(result.clonePath);
        const repositoryAnalysis = [];
        console.log("Files found:");
        console.log(files);
        for (const file of files) {
            const fullPath = path.join(result.clonePath, file);
            const parsed = await parseJavaScriptFile(fullPath);
            repositoryAnalysis.push({
                file,
                ...parsed
            });
            //console.log(repositoryAnalysis);
            console.log(JSON.stringify(repositoryAnalysis, null, 2));
            //JSON.stringify(value, replacer, space)
        }
        const graph = buildGraph(repositoryAnalysis);
        console.log(graph);
        res.json({
            success: true,
            message: "repository clones successfully",
            jobId: result.jobId,
            localPath: result.clonePath
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: "failed to clone repository" })
    }
});

export default router;