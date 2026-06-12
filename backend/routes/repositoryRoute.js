import {Router} from "express";
const router=Router();

router.post("/",async(req,res)=>{
    const {repoUrl}=req.body;
    if (!repoUrl.startsWith("https://github.com/")) {
    return res.status(400).json({
        success: false,
        message: "Invalid GitHub URL"
    });
    }
    console.log("repository url:",repoUrl);
    res.json({
        status:true,
        repoUrl
    });
});

export default router;