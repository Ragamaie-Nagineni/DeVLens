import React from "react";
import AuthForm from "../Global/AuthForm";
import Sociallogins from "../Global/Sociallogins";
import "./Login.css";
import { Link } from "react-router-dom";

function Loginpage() {

  const loginFields = [
    {
      type: "email",
      placeholder: "Email*"
    },
    {
      type: "password",
      placeholder: "Password*"
    }
  ];

  return (
    <div className="Login-container">

      <div className="logo">
        <h2>
          De<span className="accent">V</span>Lens
        </h2>
      </div>

      <h2>Welcome Back</h2>

      <p className="subtitle">
        Continue understanding your code base
      </p>

      <div className="Login-card">

        <AuthForm
          fields={loginFields}
          buttonText="Login"
        />

        <Sociallogins />

      </div>

      <div className="login-text">
        <p>Don't have an account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>

    </div>
  );
}

export default Loginpage;