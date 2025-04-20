import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { emergencyLogin } from "../api/UserService";

const EmergencyLogin = ()=>{
    const [name,setName] = useState('');
    const [dob,setDob] = useState('');
    // const [role,setRole] = useState('Patient');

    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();

        if (!name.trim()) {
            Swal.fire("Error", "Name cannot be empty", "error");
            return;
        }
        if (!dob) {
            Swal.fire("Error", "Date of birth cannot be empty", "error");
            return;
        }

        const user = {
            name: name,
            dateOfBirth: dob,
            role: "Patient"
        }

        console.log(user);
        try {
            const response = await emergencyLogin(user);
            console.log("logged-in user : ",response.data);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userRole", role);
            localStorage.setItem("users", JSON.stringify(response.data));


            Swal.fire("Success", "Login Successful!", "success").then(() => {
            navigate("/dashboard");
            });
          } catch(error) {
            Swal.fire("Error", "Invalid name or dob.", "error");
          }        
    }

    return(
        <div className="emergencylogin card">
            <div className="card-body">
                <h2 className="card-title p-2">Emergency Login</h2>
                <form action="#">
                    <div className="form-floating mb-3">
                        <input type="text"
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