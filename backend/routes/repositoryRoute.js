import { Router } from "express";
import cloneRepository from "../services/cloneRepository.js";
import walkDirectory from "../services/fileWalker.js";
import parseJavaScriptFile from "../services/parserService.js"
import buildGraph from "../services/graphBuilder.js";
import path from "path";
import pool from "../db/db.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        //const { repoUrl } = req.body;
        const { repoUrl, userId } = req.body;
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
            //console.log(JSON.stringify(repositoryAnalysis, null, 2));
            //JSON.stringify(value, replacer, space)
        }
        const repoName = repoUrl.split("/").filter(Boolean).pop();
        const metrics = {
            repository: {
                name: repoName,
                summary: `Successfully analyzed ${repoName}.
                 DevLens extracted source files, functions, classes, and dependency relationships to build an interactive repository knowledge graph.`,
            },
            files: repositoryAnalysis.length,
            functions: repositoryAnalysis.reduce(
                (s, f) => s + (f.functions?.length || 0),
                0
            ),
            classes: repositoryAnalysis.reduce(
                (s, f) => s + (f.classes?.length || 0),
                0
            ),
            imports: repositoryAnalysis.reduce(
                (s, f) => s + (f.imports?.length || 0),
                0
            ),
            exports: repositoryAnalysis.reduce(
                (s, f) => s + (f.exports?.length || 0),
                0
            ),
        };
        
        const graph = buildGraph(repositoryAnalysis);
        console.log("Saving repository...");
        await pool.query(`INSERT INTO repositories
                         (user_id, repo_name, repo_url, summary, metrics, graph, repository_analysis)
                          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                userId,
                repoName,
                repoUrl,
                metrics.repository.summary,
                JSON.stringify(metrics),
                JSON.stringify(graph),
                JSON.stringify(repositoryAnalysis),
            ]
        );
        console.log("Repository saved!");
        //console.log(graph);
        res.json({
            success: true,
            message: "Repository analyzed successfully",
            jobId: result.jobId,
            graph,
            repositoryAnalysis,
            metrics
        });
        
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: "failed to clone repository" })
    }
});

export default router;