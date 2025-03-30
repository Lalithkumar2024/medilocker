import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "../index.css"; 
import Swal from "sweetalert2";

const LoginRegister = () => {
const location = useLocation(); 
const [isSignUp, setIsSignUp] = useState(location.pathname === "/register");

useEffect(() => {
  setIsSignUp(location.pathname === "/register");
}, [location.pathname]); 

const handleToggle = (showSignUp) => {
    setIsSignUp(showSignUp);
    navigate(showSignUp ? "/register" : "/login"); 
};

const [signUpName, setSignUpName] = useState('');
const [signUpEmail, setSignUpEmail] = useState('');
const [signUpDob, setSignUpDob] = useState('');
const [signUpPhone, setSignUpPhone] = useState('');
const [signUpPassword, setSignUpPassword] = useState('');
const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
const [role, setRole] = useState('patient');

const [loginEmail, setLoginEmail] = useState('');
const [loginPassword, setLoginPassword] = useState('');

const navigate = useNavigate(); 

const sampleUsers = [
    { loginEmail: "admin@medilocker.com", loginPassword: "admin@123", role: "admin" },
    { loginEmail: "kumaran@medilocker.com", loginPassword: "kumaran@123", role: "patient" },
    { loginEmail: "john@medilocker.com", loginPassword: "john@123", role: "doctor" }
];

const isValidEmail = (signUpEmail,loginEmail) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(signUpEmail,loginEmail);
const isValidPhone = (signUpPhone) => /^\d{10}$/.test(signUpPhone);
const isValidPassword = (signUpPassword,loginPassword) => 
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(signUpPassword,loginPassword);

function handleLogin(e) {
  e.preventDefault();

  if (!isValidEmail(loginEmail)) {
    Swal.fire("Error", "Please enter a valid email address", "error");
    return;
  }
  if (!isValidPassword(loginPassword)) {
    Swal.fire("Error", "Password must be at least 8 characters, contain letters, numbers, and a special character.", "error");
    return;
  }

  const user = sampleUsers.find((user) => user.loginEmail === loginEmail && user.loginPassword === loginPassword);

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", user.loginEmail);
    localStorage.setItem("userRole", user.role);

    Swal.fire("Success", "Login Successful!", "success").then(() => {
      navigate(user.role === "admin" ? "/admindashboard" : user.role === "patient" ? "/dashboard" : "/doctordashboard");
    });
  } else {
    Swal.fire("Error", "Invalid email or password.", "error");
  }
}

function handleSubmit(e) {
  e.preventDefault();

  if (!signUpName.trim()) {
    Swal.fire("Error", "Name cannot be empty", "error");
    return;
  }
  if (!isValidEmail(signUpEmail)) {
    Swal.fire("Error", "Please enter a valid email address", "error");
    return;
  }
  if (!signUpDob) {
    Swal.fire("Error", "Date of birth cannot be empty", "error");
    return;
  }
  if (!isValidPhone(signUpPhone)) {
    Swal.fire("Error", "Phone number must be 10 digits", "error");
    return;
  }
  if (!isValidPassword(signUpPassword)) {
    Swal.fire("Error", "Password must be at least 8 characters, contain letters, numbers, and a special character.", "error");
    return;
  }
  if (signUpPassword !== signUpConfirmPassword) {
    Swal.fire("Error", "Passwords do not match", "error");
    return;
  }

  Swal.fire("Success", "Registration Successful!", "success").then(() => {
    navigate("/login");
  });
}

return (
    <div className="loginregister">
        <section className="loginregistersection">
            <div className={`wrapper ${isSignUp ? "animated-signup" : "animated-signin"}`}>
                <div className="registerform card sign-up">
                    <div className="card-body">
                        <h2 className="card-title p-3">Create an Account</h2>
                        <form>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    id="floatingName"
                                    name="name"
                                    value={signUpName}
                                    onChange={(e) => setSignUpName(e.target.value)}
                                    placeholder="Enter your Name"
                                    required
                                    autoComplete="off"
                                    className="form-control" />
                                <label htmlFor="floatingName">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email"
                                        id="floatingEmail"
                                        name="email"
                                        value={signUpEmail}
                                        onChange={(e) => setSignUpEmail(e.target.value)}
                                        placeholder="Enter your Email"
                                        required
                                        autoComplete="off"
                                        className="form-control" />
                                <label htmlFor="floatingEmail">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="date"
                                    id="floatingDate"
                                    name="dob"
                                    value={signUpDob}
                                    onChange={(e) => setSignUpDob(e.target.value)}
                                    required
                                    autoComplete="off"
                                    className="form-control" />
                                <label htmlFor="floatingDate">Date of Birth</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="tel"
                                    id="floatingPhone"
                                    name="phone"
                                    value={signUpPhone}
                                    onChange={(e) => setSignUpPhone(e.target.value)}
                                    placeholder="Enter your Phone"
                                    required
                                    autoComplete="off"
                                    className="form-control" />
                                <label htmlFor="floatingPhone">Phone</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password"
                                    id="floatingPassword"
                                    name="password"
                                    value={signUpPassword}
                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                    placeholder="Enter your Password"
                                    required
                                    autoComplete="off"
                                    className="form-control" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password"
                                    id="floatingConfirmPassword"
                                    name="confirmPassword"
                                    value={signUpConfirmPassword}
                                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                                    placeholder="Confirm your Password"
                                    required
                                    autoComplete="off"
                                    className="form-control" />
                                <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                            </div>
                            <div className="mb-3 p-2">
                                <label className="form-label d-block fw-medium text-start">Select Role:</label>
                                <div className="d-flex align-items-center">
                                    <input type="radio" 
                                        id="doctor" 
                                        name="role" 
                                        value="doctor"
                                        checked={role === "doctor"} 
                                        onChange={(e) => setRole(e.target.value)}
                                        className="me-1" />
                                    <label htmlFor="doctor" className="me-3">Doctor</label>

                                    <input type="radio" 
                                        id="patient" 
                                        name="role" 
                                        value="patient"
                                        checked={role === "patient"} 
                                        onChange={(e) => setRole(e.target.value)}
                                        className="me-1" />
                                    <label htmlFor="patient">Patient</label>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <button type="submit" className="btn btn-success w-100" onClick={handleSubmit}>Register</button>
                            </div>
                            <br />
                            <p className="form-text">
                                Already have an account? <a onClick={() => handleToggle(false)} className="signin-link link">Log in</a>                            
                            </p>
                        </form>
                    </div>
                </div>
                <div className="loginform card sign-in">
                    <div className="card-body mt-3">
                        <h2 className="card-title mt-5 p-3">Welcome Back!</h2>
                        <form>
                            <div className="form-floating mb-3">
                                <input type="email"
                                    id="floatingInput"
                                    name="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    // required
                                    autoComplete="off"
                                    className="form-control" />
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password"
                                    id="floatingPassword"
                                    name="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder="Enter your Password"
                                    // required
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

                            <div className="col-12 mt-4">
                                <button type="submit" className="btn btn-success w-100" onClick={handleLogin}>Login</button>
                            </div>
                            <br />
                            <p className="form-text">
                                <a href="/forgotpassword" className="form-link forget">Forgot Password?</a>
                            </p>
                            <p className="form-text">
                                Don't have an account? <a onClick={() => handleToggle(true)} className="signup-link form-link link">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default LoginRegister;
