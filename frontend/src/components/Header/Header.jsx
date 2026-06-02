import react from "react";
import Logo from "../../assets/Logo.png";
import "./Header.css"
function Header(){
  return(
    <div>
       <img src={Logo} className="logo" alt="DevLens Logo"/>
       <h1>De<spav>V</spav>Lens</h1>
    </div>
  ) 
}

export default Header;