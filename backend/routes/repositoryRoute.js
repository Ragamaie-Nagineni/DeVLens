import {Router} from "express";
const router=Router();

router.post("/",async(req,res)=>{
    const {repoUrl}=req.body;
    console.log("repository url:",repoUrl);
    res.json({
        status:true,
        repoUrl
    });
});

export default router;