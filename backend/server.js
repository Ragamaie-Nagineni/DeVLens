import express from "express";
const app=express();
const port=3000;

app.use(express.static());


app.get("/",(req,res)=>{
   res.redirect();
})

app.listen(port,()=>{
    console.log(`app is running on ${port}`);
});