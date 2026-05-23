import express from "express";
import cors from "cors";
import {Pool} from "pg";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes.js"
import pool from "./db/db.js";

const app=express();
const port=3000;
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);



app.get("/",(req,res)=>{
    res.json({message:"hello from backend"});
})

app.listen((port),()=>{
    console.log(`app is listening to  port ${port}`);
})