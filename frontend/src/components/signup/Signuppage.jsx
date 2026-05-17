import react from "react";
import Form from "./Form";
import Sociallogins from "./Sociallogins";
import "./Signup.css"

function Signuppage() {
    return (
        <div className="signup-container">
            <div className="logo">
                <h2>De<span>V</span>Lens</h2>
            </div>
            <h2>Create Account</h2>
            <p className="subtitle">Start understanding your code base today</p>
            <div className="signup-card">
                <Form />
                <Sociallogins />
            </div>
            <div className="login-text">
            <p>Alredy have an account?</p>
            <a>Login</a>
            </div>
        </div>
    )
}
export default Signuppage;