import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const ManagePatient = () => {
  const [patients, setPatients] = useState([
    {  
        id: 1,
        name: "Kumaran",
        email: "kumaran@medilocker.com",
        dob: "2004-01-01",
        phone: "123-456-7890",
        gender: "Male",
        address: "123 Main St, Chennai, TN",
        height: "5'9\"",
        weight: "70kg",
        bloodGroup: "O+",
        bloodPressure: "120/80",
        sugarLevel: "Normal",
        document: null
    }
  ]);

  const [formData, setFormData] = useState({
    id: null, 
    name: "", 
    dob: "", 
    email: "", 
    phone: "", 
    gender: "", 
    address: "",  
    height: "",
    weight: "",
    bloodGroup: "",
    bloodPressure: "",
    sugarLevel: "",
    document: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, document: file });
  };

  const handleAddPatient = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    const newPatient = { ...formData, id: patients.length + 1 };
    setPatients([...patients, newPatient]);
    Swal.fire("Success", "Patient added Successful!", "success");  
    resetForm();
  };

  const handleEditPatient = (patient) => {
    setFormData(patient);
    setIsEditing(true);
    setSelectedPatient(patient);
  };

  const handleUpdatePatient = () => {
    setPatients(patients.map(pat => (pat.id === formData.id ? formData : pat)));
    Swal.fire("Success", "Updated Successful!", "success");  
    resetForm();
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter(pat => pat.id !== id));
    Swal.fire("Success", "Deleted Successful!", "success");    
  };

  const resetForm = () => {
    setFormData({
      id: null, 
      name: "", 
      dob: "", 
      email: "", 
      phone: "", 
      gender: "", 
      address: "",  
      height: "",
      weight: "",
      bloodGroup: "",
      bloodPressure: "",
      sugarLevel: "",
      document: null
    });
    setIsEditing(false);
    setSelectedPatient(null);
  };

  return (
    <div className="managepatient">
      <Header/>
        <section className="managepatientsection">
          <div className="container mt-4">
            <h2 className="text-start">Manage Patients</h2>
            
            <div className="mt-4">
            <h4>{isEditing ? "Edit Patient" : "Add Patient"}</h4>
               <hr className="border border-3 border-success" />
               <div className="row g-3 mt-2">
                 <div className="col-md-6">
                   <div className="form-floating">
                    <input 
                      type="text"
                      id="floatingName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
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
                      id="floatingDob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                    <label htmlFor="floatingDob">Date of Birth</label>
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
                      placeholder="Enter Email"
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
                      placeholder="Enter Phone Number"
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
                      placeholder="Enter Gender"
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
                      placeholder="Enter Address"
                      required
                      autoComplete="off"
                      className="form-control"
                    />
                    <label htmlFor="floatingAddress">Address</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input 
                      type="text"
                      id="floatingHeight"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="Enter Height"
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
                      placeholder="Enter Weight"
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
                      placeholder="Enter Blood Group"
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
                      placeholder="Enter Blood Pressure"
                      required
                      autoComplete="off"
                      className="form-control"
                    />
                    <label htmlFor="floatingbloodPressure">Blood Pressure</label>
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
                      placeholder="Enter Sugar Level"
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
                  <label className="form-label">Upload Document</label>
                  <input type="file" className="form-control" onChange={handleFileUpload} />
                </div>
              )}

              <div className="mt-3">
                {isEditing ? (
                  <>
                    <button className="btn btn-success me-2" onClick={handleUpdatePatient}>Update</button>
                    <button className="btn btn-danger" onClick={resetForm}>Cancel</button>
                  </>
                ) : (
                  <button className="btn btn-success" onClick={handleAddPatient}>Add Patient</button>
                )}
              </div>
            </div>
            <div className="mt-5">
              <h4>Patients List</h4>
              <hr className="border border-3 border-success" />
              {patients.length === 0 ? (
                <p className="text-muted">No patients found.</p>
              ) : (
                <ul className="list-group">
                  {patients.map((patient) => (
                    <li key={patient.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        {patient.name} - {patient.email} - {patient.phone}
                      </div>
                      <div>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditPatient(patient)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      <Footer/>
    </div>
  );
};

export default ManagePatient;
