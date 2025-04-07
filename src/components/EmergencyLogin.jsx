import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EmergencyLogin = ()=>{
    const [name,setName] = useState('');
    const [dob,setDob] = useState('');
    const [role,setRole] = useState('patient');

    const navigate = useNavigate();

    const sampleUsers = [
        { name: "kumaran", dob: "30-03-2025", role:"patient"},
        { name: "ram" ,dob: "30-03-2025", role: "patient"},
        {name:"desigan",dob:"30-03-2025",role:"patient"},
        {name:"john",dob:"30-03-2025",role:"doctor"}
    ];

    function formatDate(inputDate) {
        const parts = inputDate.split("-");
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    const formattedDob = formatDate(dob);

    function handleLogin(e){
        e.preventDefault();

        const user = sampleUsers.find((user) => user.name === name && user.dob === formattedDob && user.role === role);

        if (!name.trim()) {
            Swal.fire("Error", "Name cannot be empty", "error");
            return;
        }
        if (!dob) {
            Swal.fire("Error", "Date of birth cannot be empty", "error");
            return;
        }

        if (user) {

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userRole", user.role);

            Swal.fire("Success", "Login Successful!", "success").then(() => {
            navigate(user.role === "patient" ? "/dashboard" : "/doctordashboard");
            });
          } else {
            Swal.fire("Error", "Invalid name or dob.", "error");
          }        
    }

    return(
        <div className="emergencylogin card">
            <div className="card-body">
                <h2 className="card-title p-2">Emergency Login</h2>
                <form action="#">
                    <div className="form-floating mb-3">
                        <input type="email"
                            id="floatingInput"
                            name="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your Name"
                            required
                            autoComplete="off"
                            className="form-control"/>
                        <label for="floatingInput">Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="date" 
                            id="floatingDate"
                            name="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            placeholder="Enter your Date of Birth"
                            required
                            autoComplete="off"
                            className="form-control"  />
                        <label for="floatingDate">Date of Birth</label>
                    </div>

                    <div class="col-12 mt-4">
                        <button type="submit" className="btn btn-success w-100" onClick={handleLogin}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmergencyLogin;