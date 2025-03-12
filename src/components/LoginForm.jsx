import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');
    const [error, setError] = useState('');

    const navigate = useNavigate(); 


    const sampleUsers = [
        { email: "admin@medilocker.com", password: "admin123", role: "admin" },
        { email: "kumaran@medilocker.com", password: "kumaran123", role: "patient" },
        { email: "john@medilocker.com", password: "john123", role: "doctor" }
    ];

    function handleLogin(e) {
        e.preventDefault();

        const user = sampleUsers.find(user => user.email === email && user.password === password && user.role === role);

        if (user) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userRole", user.role);
            localStorage.setItem("userEmail", user.email);

            console.log("Login Successful:", user);
            if(user.role === "admin"){
                navigate("/admindashboard");
            }else if (user.role === "patient"){
                navigate("/dashboard");
            }else{
                navigate("/doctordashboard");
            }           
        } else {
            setError("Invalid email, password, or role selection.");
        }
    }

    return (
        <div className="loginform card">
            <div className="card-body">
                <h2 className="card-title p-3">Welcome Back!</h2>
                <form onSubmit={handleLogin}>
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
                    <div className="form-floating mb-3">
                        <input type="password"
                            id="floatingPassword"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your Password"
                            required
                            autoComplete="off"
                            className="form-control" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="mb-3 p-2">
                        <label className="form-label d-block fw-medium text-start">Select Role:</label>
                        <div className="d-flex align-items-center">
                            <input type="radio"
                                id="admin"
                                name="role"
                                value="admin"
                                checked={role === "admin"}
                                onChange={(e) => setRole(e.target.value)}
                                className="me-1" />
                            <label htmlFor="admin" className="me-3">Admin</label>

                            <input type="radio"
                                id="patient"
                                name="role"
                                value="patient"
                                checked={role === "patient"}
                                onChange={(e) => setRole(e.target.value)}
                                className="me-1" />
                            <label htmlFor="patient" className="me-3">Patient</label>

                            <input type="radio"
                                id="doctor"
                                name="role"
                                value="doctor"
                                checked={role === "doctor"}
                                onChange={(e) => setRole(e.target.value)}
                                className="me-1" />
                            <label htmlFor="doctor">Doctor</label>
                        </div>
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-success w-100">Login</button>
                    </div>
                    <br />
                    <p className="form-text">
                        <a href="/forgotpassword" className="form-link text-black">Forgot Password?</a>
                    </p>
                    <p className="form-text">
                        Don't have an account? <a href="/register" className="form-link text-black">Create an Account</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
