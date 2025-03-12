import React, { useState } from "react";

const Profilepage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Kumaran",
    email: "kumaran@example.com",
    dob: "2004-01-01",
    phone: "123-456-7890",
    gender: "Male",
    address: "123 Main St, chennai, TN",
    height: "5'9\"",
    weight: "70kg",
    bloodGroup: "O+",
    bloodPressure: "120/80",
    sugarLevel: "Normal",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  return (
    <div className="profile">
      <section className="profilessection">
        <div className="container mt-3">
          <h2>My Profile</h2>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-4 text-start">My Personal Information</h4>
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
                  readOnly 
                  placeholder="Enter Patient Name"
                  required
                  autoComplete="off"
                  className="form-control"
                />
                <label htmlFor="floatingName">Name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="date" 
                  name="DOB"
                  id="floatingDOB" 
                  value={formData.dob} 
                  readOnly 
                  placeholder="Enter Patient Date of Birth"
                  required
                  autoComplete="off"
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
                  placeholder="Enter Patient Email"
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
                  placeholder="Enter Patient Phone"
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
                  placeholder="Enter Patient Gender"
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
                  placeholder="Enter Patient Address"
                  required
                  autoComplete="off"
                  className="form-control"                  
                />
                <label htmlFor="floatingAddress">Address</label>
              </div>
            </div>
          </div>
          
          <h4 className="mt-4 text-start">My Health Information</h4>
          <hr className="border border-3 border-success" />
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" 
                  id="floatingHeight" 
                  name="height" 
                  value={formData.height} 
                  onChange={handleChange} 
                  disabled={!isEditing}
                  placeholder="Enter Patient Height"
                  required
                  autoComplete="off"
                  className="form-control"
                />
                <label htmlFor="floatingHeight">Height</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" 
                  id="floatingWeight" 
                  name="weight" 
                  value={formData.weight} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  placeholder="Enter Patient Weight"
                  required
                  autoComplete="off"
                  className="form-control"
                />
                <label htmlFor="floatingWeight">Weight</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" 
                  id="floatingBloodGroup" 
                  name="bloodGroup" 
                  value={formData.bloodGroup} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  placeholder="Enter Patient Blood Group"
                  required
                  autoComplete="off"
                  className="form-control"
                />
                <label htmlFor="floatingBloodGroup">Blood Group</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" 
                  id="floatingBloodPressure" 
                  name="bloodPressure" 
                  value={formData.bloodPressure} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  placeholder="Enter Patient Blood Pressure"
                  required
                  autoComplete="off"
                  className="form-control"
                />
                <label htmlFor="floatingBloodPressure">Blood Pressure</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" 
                  id="floatingSugarLevel" 
                  name="sugarLevel" 
                  value={formData.sugarLevel} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  placeholder="Enter Patient Sugaar Level"
                  required
                  autoComplete="off"
                  className="form-control"
                />
                <label htmlFor="floatingSugarLevel">Sugar Level</label>
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
    </div>
  );
};

export default Profilepage;
