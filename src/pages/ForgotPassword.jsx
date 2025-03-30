import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = () =>{

const [email,setEmail]= useState();
const navigate = useNavigate();

const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const sampleuser = [
    {email:"kumaran@medilocker.com"}
];
function handleSubmit(e){

    e.preventDefault();

    if (!isValidEmail(email)) {
        Swal.fire("Error", "Please enter a valid email address", "error");
        return;
    }
    const user = sampleuser.find((user)=> user.email===email);
    if (user) 
    {   
        Swal.fire("Success", "Reset password mail sent Successful!", "success").then(() => {
            navigate("/login");
        });
    } else {
        Swal.fire("Error", "Invalid email!", "error");
    }        
}

return(
    <div className="forgotpassword">
        <section className="forgotpasswordsection">
        <h2 className="card-title p-3">Forgot Password</h2>
        <br />
        <br />
            <div className="card">
                <div className="card-body">                        
                    <h2 className="card-title p-3">Reset your password</h2>
                    <p className="p-2">If the account exist, we will email you instructions to reset the password.</p>
                    <form action="#">
                        <div className="form-floating mb-3">
                            <input type="email"
                                id="floatingInput"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                autoComplete="off"
                                className="form-control" />
                            <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="col-12 mt-4">
                                <button type="submit" className="btn btn-success w-100" onClick={handleSubmit}>Submit</button>
                            </div>
                        </form>
                </div>
            </div>
         </section>
    </div>
);
}

export default ForgotPassword;