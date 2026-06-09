import express from "express";
import { Router } from "express";
import upload from "../Controllers/uploadController.js";

const router = Router();

router.post("/upload",upload.single("repoZip"),(req,res)=>{
    console.log("Request received");
    console.log(req.file);
    res.status(200).json({success:true,filename:req.file.filename})
})

export default router;