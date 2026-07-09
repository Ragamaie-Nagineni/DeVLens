import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes.js"
import pool from "./db/db.js";
import uploadRoutes from "./routes/uploadRoute.js";
import repositoryroutes from "./routes/repositoryRoute.js";
import graphRoutes from "./routes/graphRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const app=express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/repository",repositoryroutes);
app.use("/api/graph", graphRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/",(req,res)=>{
    res.json({message:"hello from backend"});
})

app.listen((port),()=>{
    console.log(`app is listening to  port ${port}`);
})