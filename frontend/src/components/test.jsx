import react from "react";
import { useState,useEffect } from "react";

function test(){
   const [message,setmessage]=useState("");
   useEffect(()=>{
    fetch("http://localhost:3000/")
    .then(res=>res.json())
    .then(data=>setmessage(data.message))
   })
   return(
    <div>{message}</div>
   )
}

export default test;
