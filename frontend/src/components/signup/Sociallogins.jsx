import react from "react";
import "./Signup.css"

function Sociallogins() {
  return (
    <div className="social-login">
      <div className="divider">
        <hr></hr>
        <p>or continue with</p>
        <hr></hr>
      </div>
      <button className="social-btn">Github</button>
      <button className="social-btn">Google</button>
    </div>
  )
}

export default Sociallogins;