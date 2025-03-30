import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const ManageDoctor = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, 
      name: "Dr. John", 
      dob: "1980-05-15", 
      email: "dr.john@medilocker.com", 
      phone: "987-654-3210", 
      gender: "Male", 
      address: "456 Clinic St, Chennai, TN", 
      specialty: "Cardiology", 
      experience: "15 years" }
  ]);

  const [formData, setFormData] = useState({
    id: null, 
    name: "", 
    dob: "", 
    email: "", 
    phone: "", 
    gender: "", 
    address: "", 
    specialty: "", 
    experience: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = () => {
    if (!formData.name || !formData.email || !formData.specialty || !formData.experience) {
      alert("Please fill in all required fields.");
      return;
    }
    const newDoctor = { ...formData, id: doctors.length + 1 };
    setDoctors([...doctors, newDoctor]);
    Swal.fire("Success", "Doctor added Successful!", "success");  
    resetForm();
  };

  const handleEditDoctor = (doctor) => {
    setFormData(doctor);
    setIsEditing(true);
  };

  const handleUpdateDoctor = () => {
    setDoctors(doctors.map(doc => (doc.id === formData.id ? formData : doc)));
    Swal.fire("Success", "Updated Successful!", "success");  
    resetForm();
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter(doc => doc.id !== id));
    Swal.fire("Success", "Deleted Successful!", "success");  
  };

  const resetForm = () => {
    setFormData({ id: null,  
                  name: "",  
                  dob: "", 
                  email: "", 
                  phone: "", 
                  gender: "", 
                  address: "", 
                  specialty: "", 
                  experience: "" });
    setIsEditing(false);
  };

  return (
    <div className="managedoctor">
      <Header/>
        <section className="managedoctorsection">
          <div className="container mt-4">
            <h2 className="text-start">Manage Doctors</h2>

            <div className="mt-4">
              <h4>{isEditing ? "Edit Doctor" : "Add Doctor"}</h4>
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
                      placeholder="Enter Doctor Name"
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
                      id="floatingSpecialty"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      placeholder="Enter Specialty"
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
                      placeholder="Enter Experience (e.g., 10 years)"
                      required
                      autoComplete="off"
                      className="form-control"
                    />
                    <label htmlFor="floatingExperience">Experience</label>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                {isEditing ? (
                  <>
                    <button className="btn btn-success me-2" onClick={handleUpdateDoctor}>Update</button>
                    <button className="btn btn-danger" onClick={resetForm}>Cancel</button>
                  </>
                ) : (
                  <button className="btn btn-success" onClick={handleAddDoctor}>Add Doctor</button>
                )}
              </div>
            </div>
            <div className="mt-5">
              <h4>Doctors List</h4>
              <hr className="border border-3 border-success" />
              {doctors.length === 0 ? (
                <p className="text-muted">No doctors found.</p>
              ) : (
                <ul className="list-group">
                  {doctors.map((doctor) => (
                    <li key={doctor.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        {doctor.name} - {doctor.specialty} -  {doctor.phone}
                      </div>
                      <div>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditDoctor(doctor)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
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

export default ManageDoctor;
