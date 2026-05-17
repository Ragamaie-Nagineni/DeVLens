import react from "react";
import Form from "./Form";
import Sociallogins from "./Sociallogins";

function Signuppage() {
    return (
        <div>
            <h2>Create Account</h2>
            <h4>Start understanding your code base today</h4>
            <div>
                <Form />
                <Sociallogins />
            </div>
            <div>
            <p>Alredy have an account?</p>
            <a>Login</a>
            </div>
        </div>
    )
}
export default Signuppage;