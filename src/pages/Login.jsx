import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () =>{

    return(
        <div className="login">
            <section className="loginsection">
                <h2>Login</h2>
                <br />
                <LoginForm/>
            </section>
        </div>
    )
}

export default Login;