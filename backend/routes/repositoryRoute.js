import { Router } from "express";
import cloneRepository from "../services/cloneRepository.js";
import walkDirectory from "../services/fileWalker.js";
import parseJavaScriptFile from "../services/parserService.js"
import buildGraph from "../services/graphBuilder.js";
import fs from "fs/promises";
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
        /*  const normalizedRepoUrl = repoUrl.trim().replace(/\.git$/, "").replace(/\/$/, "").toLowerCase();
         const existingRepo = await pool.query(`SELECT * FROM repositories WHERE LOWER(repo_url) = $1 LIMIT 1`,
             [normalizedRepoUrl]
         );
 
         if (existingRepo.rows.length > 0) {
             console.log("Repository already analyzed. Returning cached result.");
 
             return res.json({
                 success: true,
                 cached: true,
                 graph: existingRepo.rows[0].graph,
                 repositoryAnalysis: existingRepo.rows[0].repository_analysis,
                 metrics: existingRepo.rows[0].metrics,
             }); 
         }*/

        const result = await cloneRepository(repoUrl);
        console.log(result);
        const files = await walkDirectory(result.clonePath);
        const repositoryAnalysis = [];
        //console.log("Files found:");
        //console.log(files);
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

        const graph = buildGraph(repositoryAnalysis, repoName);
        //check
        //console.log(JSON.stringify(repositoryAnalysis, null, 2));
        console.log("Saving repository...");
        //console.log(typeof metrics);


        const repoInsert = await pool.query(
            `
  INSERT INTO repositories
  (
    user_id,
    name,
    source,
    github_repo_url,
    language,
    status,
    analyzed_at,
    clone_path
  )
  VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
  RETURNING id
  `,
            [
                userId,
                repoName,
                "github",
                repoUrl,
                "JavaScript",
                "ready",
                result.clonePath,
            ]
        );
        const repositoryId = repoInsert.rows[0].id;
        console.log("saved into repository table");
        await pool.query(
            `
  INSERT INTO analysis_snapshots
  (
    repository_id,
    triggered_by,
    total_files,
    total_dependencies,
    metrics,
    graph,
    repository_analysis
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  `,
            [
                repositoryId,
                userId,
                repositoryAnalysis.length,
                graph.edges.length,
                metrics,
                graph,
                JSON.stringify(repositoryAnalysis),
            ]
        );
        console.log("saved into analysis_snapshots table");
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
router.get("/latest/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await pool.query(
            `
  SELECT
      r.*,
      s.graph,
      s.metrics,
      s.repository_analysis
  FROM repositories r
  LEFT JOIN LATERAL (
      SELECT *
      FROM analysis_snapshots
      WHERE repository_id = r.id
      ORDER BY created_at DESC
      LIMIT 1
  ) s ON TRUE
  WHERE r.user_id = $1
  ORDER BY r.created_at DESC
  LIMIT 1
  `,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.json(null);
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to fetch repository",
        });
    }
});
router.get("/recent/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            `
  SELECT
      r.*,
      s.metrics,
      s.graph,
      s.repository_analysis
  FROM repositories r
  LEFT JOIN LATERAL (
      SELECT *
      FROM analysis_snapshots
      WHERE repository_id = r.id
      ORDER BY created_at DESC
      LIMIT 1
  ) s ON TRUE
  WHERE r.user_id = $1
  ORDER BY r.created_at DESC
  `,
            [userId]
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch repositories" });
    }
});
router.get("/:repoId/file", async (req, res) => {
    try {
        const { repoId } = req.params;
        const { filePath } = req.query;

        const result = await pool.query(`SELECT clone_path FROM repositories WHERE id = $1`, [repoId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Repository not found" });
        }
        const clonePath = result.rows[0].clone_path;
        const fullPath = path.join(clonePath, filePath);
        const content = await fs.readFile(fullPath, "utf-8");
        res.json({ content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to read file" });
    }
})

export default router;