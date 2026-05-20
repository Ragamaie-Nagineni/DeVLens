import react from "react";
import "../signup/Signup.css"
import { FaGithub, FaGoogle } from "react-icons/fa";
import "./Sociallogins.css";

function Sociallogins() {
  return (
    <div className="social-login">
      <div className="divider">
        <hr></hr>
        <p>or continue with</p>
        <hr></hr>
      </div>
      <button className="social-btn">
        <FaGithub />
        Github
      </button>

      <button className="social-btn">
        <FaGoogle />
        Google
      </button>
    </div>
  )
}

export default Sociallogins;