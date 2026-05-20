import express from "express";
import cors from "cors";
import {Pool} from "pg";
import dotenv from "dotenv";
dotenv.config();

const app=express();
const port=3000;
app.use(cors());

const pool=new Pool(
    {
        connectionString:process.env.DATABASE_URL,
        ssl:{
           rejectUnauthorized:false,
        }
    }
)

pool.query("SELECT NOW()",(err,res)=>{
     if(err){console.log("DB connection failed!");console.error(err);}
     else{console.log("DB Connected!");console.log(res.rows);}
})

app.get("/",(req,res)=>{
    res.json({message:"hello from backend"});
})

app.listen((port),()=>{
    console.log(`app is listening to  port ${port}`);
})