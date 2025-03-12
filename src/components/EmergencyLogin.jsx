import React, { useState } from "react";

const EmergencyLogin = ()=>{


    const [name,setName] = useState('')
    const [dob,setDob] = useState('')

    function handleName (e){
        setName(e.target.value);
    }

    function handleDob(e){
        setDob(e.target.value);
    }

    function handleLogin(e){
        e.preventDefault();

        const user ={name,dob};
        console.log(user);
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
                            onChange={handleName}
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
                            onChange={handleDob}
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