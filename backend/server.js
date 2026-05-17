import express from "express";
import cors from "cors";


const app=express();
const port=3000;
app.use(cors());

app.get("/",(req,res)=>{
    res.json({message:"hello from backend"});
})

app.listen((port),()=>{
    console.log(`app is listening to  port ${port}`);
})