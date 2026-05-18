import react from "react";
import { useState,useEffect } from "react";
import "./Login.css";

function Form(){

return(
    <div>
        <form className="form">
        <input type="text" placeholder="email*" required ></input><br></br>
        <input type="password" placeholder="password*" required></input><br></br>
        <button type="submit">Login</button>
        </form>
    </div>
)
}
export default Form;