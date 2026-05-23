import React from "react";
import AuthForm from "../Global/AuthForm";
import Sociallogins from "../Global/Sociallogins";
import "./Signup.css";
import { Link } from "react-router-dom";

function Signuppage() {

  const signupFields = [
  {
    name: "username",
    type: "text",
    placeholder: "Name"
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email*"
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password*"
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password*"
  }
];

  return (
    <div className="signup-container">

      <div className="logo">
        <h2>
          De<span className="accent">V</span>Lens
        </h2>
      </div>

      <h2>Create Account</h2>

      <p className="subtitle">
        Start understanding your code base today
      </p>

      <div className="signup-card">

        <AuthForm
          fields={signupFields}
          buttonText="Sign Up"
        />

        <Sociallogins />

      </div>

      <div className="login-text">
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>

    </div>
  );
}

export default Signuppage;