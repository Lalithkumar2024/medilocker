import React, { useState } from "react";

const ForgotPassword = () =>{

    const [email,setEmail]= useState();

    return(
        <div className="forgotpassword">
            <section className="forgotpasswordsection">
            <h2 className="card-title p-3">Forgot Password</h2>
            <br />
            <br />
                <div className="loginform card">
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
                                    <button type="submit" className="btn btn-success w-100">Submit</button>
                                </div>
                            </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ForgotPassword;