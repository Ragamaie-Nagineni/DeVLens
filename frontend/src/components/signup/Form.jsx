import react from "react";
import { useState,useEffect } from "react";

function Form(){

return(
    <div>
        <form >
        <input type="text" placeholder="email*" required ></input><br></br>
        <input type="password" placeholder="password*" required></input><br></br>
        <input type="password" placeholder="re-enter password*" required></input><br></br>
        <button>Sign Up</button>
        </form>
    </div>
)
}
export default Form;