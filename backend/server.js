import express from "express";
import cors from "cors";

const app=express();
app.use(cors());
const port=3000;

app.get("/",(req,res)=>{
    res.json({message:"hello from backend"});
})

app.listen(port,()=>{
    console.log(`app is listening to port ${port}`);
})