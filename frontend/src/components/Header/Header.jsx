import react from "react";
import Logo from "../../assets/Logo.png";

function Header(){
  return(
    <div>
       <img src={Logo} alt="DevLens Logo"/>
       <h1>DeVLens</h1>
    </div>
  ) 
}

export default Header;