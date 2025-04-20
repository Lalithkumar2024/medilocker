import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllUsers, forgetPassword } from "../api/UserService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [patients, setPatients] = useState([]);
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) =>  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isValidPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setPatients(res.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      Swal.fire("Error", "Please enter a valid email address", "error");
      return;
    }

    const user = patients.find((user) => user.emailId === email);
    if (user) {
      Swal.fire("Success", "Email verified! Enter your new password.", "success");
      setShowPasswordBox(true);
    } else {
      Swal.fire("Error", "Invalid email! Not found in the database.", "error");
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
        Swal.fire("Error", "Password must be at least 8 characters, contain letters, numbers, and a special character.", "error");
        return;
    }
    if (password !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match", "error");
        return;
    }

    try {
      await forgetPassword({ emailId: email, password });
      Swal.fire("Success", "Password updated successfully!", "success").then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("Error updating password:", error);
      Swal.fire("Error", "Failed to update password.", "error");
    }
  };

  return (
    <div className="forgotpassword">
      <section className="forgotpasswordsection">
        <h2 className="card-title p-3">Forgot Password</h2>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title p-3">Reset your password</h2>
            <p className="p-2">
                {showPasswordBox ? 
                "Enter your New Password" :
                "If the account exists, we will allow you to reset the password."}
            </p>
  
            {!showPasswordBox ? ( 
            <form>
                <div className="form-floating mb-3">
                    <input type="email"
                    id="floatingInput"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="off"
                    className="form-control"/>
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-success w-100" onClick={handleSubmitEmail}>Verify Email</button>
                </div>
            </form>
            ):(
            <form>
                <div>
                  <div className="form-floating mt-4">
                    <input type={showPassword ? "text" : "password"}
                      id="floatingPassword"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      autoComplete="off"
                      className="form-control"/>
                    <label htmlFor="floatingPassword">New Password</label>
                    <button type="button"
                        className="position-absolute"
                        style={{ top: "50%", right: "10px", transform: "translateY(-50%)" ,backgroundColor:"white"}}
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}>
                    {showPassword ? <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/hide.png" alt="hide"/> : <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/visible--v1.png" alt="visible--v1"/>}
                    </button>
                  </div>
                  <div className="form-floating mt-4">
                    <input type={showPassword ? "text" : "password"}
                      id="floatingConfirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Enter new Confirm Password"
                      required
                      autoComplete="off"
                      className="form-control"/>
                    <label htmlFor="floatingConfirmPassword">Confirm New Password</label>
                    <button type="button"
                        className="position-absolute"
                        style={{ top: "50%", right: "10px", transform: "translateY(-50%)" ,backgroundColor:"white"}}
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}>
                    {showPassword ? <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/hide.png" alt="hide"/> : <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/visible--v1.png" alt="visible--v1"/>}
                    </button>
                  </div>
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      onClick={handleSubmitPassword}>
                      Update Password
                    </button>
                  </div>
                </div>
            </form>
            )}
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;