import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DoctorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Dr. John",
    email: "dr.john@medilocker.com",
    dob: "1980-05-15",
    phone: "987-654-3210",
    gender: "Male",
    address: "456 Clinic St, chennai, TN",
    specialty: "Cardiology",
    experience: "15 years",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  return (
    <div className="doctorprofile">
        <Header/>
            <section className="doctorprofilesection">
                <div className="container mt-3">
                <h2>My Profile</h2>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mt-4">Personal Information</h4>
                    {!isEditing && <button className="btn btn-success" onClick={handleEdit}>Edit</button>}
                </div>
                <hr className="border border-3 border-success" />

                <div className="row g-3 mt-2">
                    <div className="col-md-6">
                    <div className="form-floating">
                        <input 
                            type="text"  
                            id="floatingName"
                            name="name"
                            value={formData.name} 
                            placeholder="Enter Doctor Name"
                            required
                            autoComplete="off"
                            readOnly
                            className="form-control"
                        />
                        <label htmlFor="floatingName">Name</label>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-floating">
                        <input 
                            type="date" 
                            id="floatingDOB"
                            name="DOB"
                            value={formData.dob} 
                            placeholder="Enter Doctor Date of Birth"
                            required
                            autoComplete="off"
                            readOnly
                            className="form-control"
                        />
                        <label htmlFor="floatingDOB">Date of Birth</label>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-floating">
                        <input 
                            type="email" 
                            id="floatingEmail" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            disabled={!isEditing}
                            placeholder="Enter Doctor Email"
                            required
                            autoComplete="off"
                            className="form-control" 
                        />
                        <label htmlFor="floatingEmail">Email</label>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-floating">
                        <input 
                            type="text" 
                            id="floatingPhone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            disabled={!isEditing}
                            placeholder="Enter Doctor Phone"
                            required
                            autoComplete="off"
                            className="form-control"
                        />
                        <label htmlFor="floatingPhone">Phone</label>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-floating">
                        <input 
                            type="text" 
                            id="floatingGender" 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleChange} 
                            disabled={!isEditing} 
                            placeholder="Enter Doctor Gender"
                            required
                            autoComplete="off"
                            className="form-control"
                        />
                        <label htmlFor="floatingGender">Gender</label>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-floating">
                        <input 
                            type="text" 
                            id="floatingAddress" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            disabled={!isEditing} 
                            placeholder="Enter Doctor Address"
                            required
                            autoComplete="off"
                            className="form-control"
                        />
                        <label htmlFor="floatingAddress">Address</label>
                    </div>
                    </div>
                </div>

                <h4 className="mt-4">My Specialty & Experience</h4>
                <hr className="border border-3 border-primary" />
                
                <div className="row g-3 mt-2">
                    <div className="col-md-6">
                    <div className="form-floating">
                        <input 
                            type="text" 
                            id="floatingSpecialty" 
                            name="specialty" 
                            value={formData.specialty} 
                            onChange={handleChange} 
                            disabled={!isEditing} 
                            placeholder="Enter Doctor Specialty"
                            required
                            autoComplete="off"
                            className="form-control"                        
                        />
                        <label htmlFor="floatingSpecialty">Specialty</label>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-floating">
                        <input 
                            type="text" 
                            id="floatingExperience" 
                            name="experience" 
                            value={formData.experience} 
                            onChange={handleChange} 
                            disabled={!isEditing} 
                            placeholder="Enter Doctor Experience"
                            required
                            autoComplete="off"
                            className="form-control"
                        />
                        <label htmlFor="floatingExperience">Years of Experience</label>
                    </div>
                    </div>
                </div>
                {isEditing && (
                    <div className="mt-3">
                    <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                    <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    </div>
                )}
                </div>
            </section>
        <Footer/>
    </div>
  );
};

export default DoctorProfile;
