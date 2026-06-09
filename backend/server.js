import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes.js"
import pool from "./db/db.js";
import uploadRoutes from "./routes/uploadRoute.js";

const app=express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/upload",uploadRoutes);


app.get("/",(req,res)=>{
    res.json({message:"hello from backend"});
})

app.listen((port),()=>{
    console.log(`app is listening to  port ${port}`);
})