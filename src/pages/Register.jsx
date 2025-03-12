import React from "react";
import SignUpForm from "../components/RegisterForm";

const Register = () =>{

    return(
        <div className="register">
            <section className="registersection">
                <h2>Register</h2>
                <br />
                <SignUpForm/>
            </section>    
        </div>
    )
}

export default Register;