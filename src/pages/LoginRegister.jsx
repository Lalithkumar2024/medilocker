import React, { useState , useEffect } from "react";
import { useNavigate , useLocation , Link } from "react-router-dom";
import "../index.css"; 
import Swal from "sweetalert2";
import { registerUser , loginUser } from "../api/UserService";

const LoginRegister = () => {

    const location = useLocation(); 
    const navigate = useNavigate(); 

    const [isSignUp, setIsSignUp] = useState(location.pathname === "/register");

    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpDob, setSignUpDob] = useState('');
    const [signUpPhone, setSignUpPhone] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('Patient');

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    useEffect(() => {
        setIsSignUp(location.pathname === "/register");
    }, [location.pathname]); 
    
    const handleToggle = (showSignUp) => {
        setIsSignUp(showSignUp);
        navigate(showSignUp ? "/register" : "/login"); 
    };

    const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isValidPhone = (phone) => /^\d{10}$/.test(phone);
    const isValidPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    async function handleLogin(e) {
        e.preventDefault();

        if (!isValidEmail(loginEmail)) {
            Swal.fire("Error", "Please enter a valid email address", "error");
            return;
        }
        if (!isValidPassword(loginPassword)) {
            Swal.fire("Error", "Password must be at least 8 characters, contain letters, numbers, and a special character or Invaild Password.", "error");
            return;
        }

        const users ={
            emailId: loginEmail,
            password: loginPassword,
            role: role,
        }
        // console.log(users);

        try {
            const response = await loginUser(users);
            // console.log(response.data);
            localStorage.setItem("users", JSON.stringify(response.data));
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", loginEmail);
            localStorage.setItem("userRole", role);

            Swal.fire("Success", "Login Successful!", "success").then(() => {
            navigate(role === "Admin" ? "/admindashboard" : role === "Patient" ? "/dashboard" : "/doctordashboard");
            });
        } catch (error) {
            Swal.fire("Error", "Invalid email or password or role.", "error");
        }
    }

    async function handleSubmit(e) {
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
        const user = {
            name: signUpName,
            emailId: signUpEmail,
            dateOfBirth: signUpDob,
            phone: signUpPhone,
            password: signUpPassword,
            confirmPassword: signUpConfirmPassword,
            role: role,
        };
        // console.log(user);
      
        try {
            await registerUser(user);
            Swal.fire("Success", "Registration Successful!", "success").then(() => {
            navigate("/login");
        });
        } catch (error) {
            Swal.fire("Error", "Registration failed.", "error");
        }
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
                                <input type={showPassword ? "text" : "password"}
                                    id="floatingPassword"
                                    name="password"
                                    value={signUpPassword}
                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                    placeholder="Enter your Password"
                                    required
                                    autoComplete="off"
                                    className="form-control" />
                                <label htmlFor="floatingPassword">Password</label>
                                <button type="button"
                                    className="position-absolute"
                                    style={{ top: "50%", right: "10px", transform: "translateY(-50%)" ,backgroundColor:"white"}}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    tabIndex={-1}>
                                {showPassword ? <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/hide.png" alt="hide"/> : <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/visible--v1.png" alt="visible--v1"/>}
                                </button>
                            </div>
                            <div className="form-floating mb-3">
                                <input type={showPassword ? "text" : "password"}
                                    id="floatingConfirmPassword"
                                    name="confirmPassword"
                                    value={signUpConfirmPassword}
                                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                                    placeholder="Confirm your Password"
                                    required
                                    autoComplete="off"
                                    className="form-control" />
                                <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                                <button type="button"
                                    className="position-absolute"
                                    style={{ top: "50%", right: "10px", transform: "translateY(-50%)" ,backgroundColor:"white"}}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    tabIndex={-1}>
                                {showPassword ? <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/hide.png" alt="hide"/> : <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/visible--v1.png" alt="visible--v1"/>}
                                </button>
                            </div>
                            <div className="mb-3 p-2">
                                <label className="form-label d-block fw-medium text-start">Select Role:</label>
                                <div className="d-flex align-items-center">
                                    <input type="radio" 
                                        id="doctor" 
                                        name="role" 
                                        value="Doctor"
                                        checked={role === "Doctor"} 
                                        onChange={(e) => setRole(e.target.value)}
                                        className="me-1" />
                                    <label htmlFor="doctor" className="me-3">Doctor</label>

                                    <input type="radio" 
                                        id="patient" 
                                        name="role" 
                                        value="Patient"
                                        checked={role === "Patient"} 
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
                                Already have an account? <Link onClick={() => handleToggle(false)} className="signin-link link">Log in</Link>                            
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
                                <input type={showPassword ? "text" : "password"}
                                    id="floatingPassword"
                                    name="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder="Enter your Password"
                                    // required
                                    autoComplete="off"
                                    className="form-control" />
                                <label htmlFor="floatingPassword">Password</label>
                                <button type="button"
                                    className="position-absolute"
                                    style={{ top: "50%", right: "10px", transform: "translateY(-50%)" ,backgroundColor:"white"}}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    tabIndex={-1}>
                                {showPassword ? <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/hide.png" alt="hide"/> : <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/visible--v1.png" alt="visible--v1"/>}
                                </button>
                            </div>
                            <div className="mb-3 p-2">
                                <label className="form-label d-block fw-medium text-start">Select Role:</label>
                                <div className="d-flex align-items-center">
                                    <input type="radio"
                                        id="admin"
                                        name="role"
                                        value="Admin"
                                        checked={role === "Admin"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="me-1" />
                                    <label htmlFor="admin" className="me-3">Admin</label>

                                    <input type="radio"
                                        id="patient"
                                        name="role"
                                        value="Patient"
                                        checked={role === "Patient"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="me-1" />
                                    <label htmlFor="patient" className="me-3">Patient</label>

                                    <input type="radio"
                                        id="doctor"
                                        name="role"
                                        value="Doctor"
                                        checked={role === "Doctor"}
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
                                Don't have an account? <Link onClick={() => handleToggle(true)} className="signup-link form-link link">Sign up</Link>
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
