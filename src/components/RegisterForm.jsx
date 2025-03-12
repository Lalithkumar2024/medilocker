import React, { useState } from "react";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('patient'); 

    function handleSubmit(e) {
        e.preventDefault();
        const user = { name, email, dob, phone, password, confirmPassword, role };
        console.log(user);
    }

    return (
        <div className="registerform card">
            <div className="card-body">
                <h2 className="card-title p-3">Create an Account</h2>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text"
                            id="floatingName"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                            autoComplete="off"
                            className="form-control" />
                        <label htmlFor="floatingDate">Date of Birth</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="tel"
                            id="floatingPhone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Already have an account? <a href="/login" className="form-link text-black">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
