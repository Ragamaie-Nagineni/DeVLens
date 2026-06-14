import { Router } from "express";
import cloneRepository from "../services/cloneRepository.js";
import walkDirectory from "../services/fileWalker.js";

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
         console.log("Files found:");
         console.log(files);
        res.json({
            success: true,
            message:"repository clones successfully",
            jobId:result.jobId,
            localPath:result.clonePath
        });
    }catch(e){
        console.error(e);
        return res.status(500).json({success:false,message:"failed to clone repository"})
    }
});

export default router;