import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "../index.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      setIsLoggedIn(true);
      setRole(userRole);      
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("users");
    setRole(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center fs-2 fw-bold" href="/home">
            <img src="/assets/HeaderLogo.png" alt="Logo" width="50" height="40" className="me-2" />
            MediLocker
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav fs-5 fw-bold">
              <li className="nav-item"><a className={`nav-link btn-effect ${location.pathname === "/" ? "active-link" : ""}`} href="/">Home</a></li>
              <li className="nav-item"><a className={`nav-link btn-effect ${location.pathname === "/about" ? "active-link" : ""}`} href="/about">About Us</a></li>
              <li className="nav-item"><a className={`nav-link btn-effect ${location.pathname === "/contact" ? "active-link" : ""}`} href="/contact">Contact Us</a></li>
              <li className="nav-item"><a className={`nav-link btn-effect ${location.pathname === "/hospital" ? "active-link" : ""}`} href="/hospital">NearBy Hospitals</a></li>
              <li className="nav-item"><a className={`nav-link btn-effect ${location.pathname === "/pharmacy" ? "active-link" : ""}`} href="/pharmacy">NearBy Pharmacys</a></li>
            </ul>
          </div>
          <div className="d-flex ms-auto align-items-center">
            {!isLoggedIn ? (
              <div>
                <a className="btn me-3 fw-bold rounded-pill btn-effect" href="/login">Log In</a>
                <a className="btn btn-success fw-bold px-4 rounded-pill btn-effect" href="/register">Sign Up</a>
              </div>
            ) : (
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle rounded-pill" type="button" data-bs-toggle="dropdown">
                  <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/gender-neutral-user.png" alt="user-icon"/>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {role === "Admin" && (
                    <div>
                      <li><a className="dropdown-item" href="/admindashboard">Admin Dashboard</a></li>
                      <li><a className="dropdown-item" href="/managedoctor">Manage Doctors</a></li>
                      <li><a className="dropdown-item" href="/managepatient">Manage Patients</a></li>
                    </div>
                  )}
                  {role === "Doctor" && (
                    <div>
                      <li><a className="dropdown-item" href="/doctordashboard">My Dashboard</a></li>
                      <li><a className="dropdown-item" href="/doctorprofile">My Profile</a></li>
                    </div>
                  )}
                  {role === "Patient" && (
                    <div>
                      <li><a className="dropdown-item" href="/dashboard">My Dashboard</a></li>
                      <li><a className="dropdown-item" href="/profile">My Profile</a></li>
                      <li><a className="dropdown-item" href="/document">My Documents</a></li>
                    </div>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item text-danger" href="/" onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
