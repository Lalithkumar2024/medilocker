import React, { useState , useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { registerUser, updateUser , deleteUser } from "../api/UserService";
import { addDoctor , getAllDoctors , getDoctorId , updateDoctor } from "../api/DoctorService";

const ManageDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    name: "", 
    dateOfBirth: "", 
    emailId: "", 
    phone: "", 
    gender: "", 
    address: "", 
    password: "",
    role: "", 
    specialization: "",
    yoe: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);
  
  const fetchDoctors = async () => {
    try {
      const response = await getAllDoctors();
      setDoctors(response.data);
      // console.log("Doctor Data :",response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = async() => {
    if (!formData.name || !formData.emailId || !formData.phone || !formData.password || !formData.role ||
      !formData.gender || !formData.address || !formData.dateOfBirth || !formData.specialization || !formData.yoe) {
      Swal.fire("Error","Please fill in all required fields.","error");
      return; 
    }
    try {
      const userPayload = {
        name: formData.name,
        emailId: formData.emailId,
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phone,
        gender: formData.gender,
        address: formData.address,
        password: formData.password,
        role: formData.role,
      };
    
      const userResponse = await registerUser(userPayload);
      const userId = userResponse.data.user_id;
      // console.log("userId :", userId);
      
      const doctor = await getDoctorId(userId);
      const doctorId = doctor.data;
      // console.log("DoctorId :" ,doctorId); 
    
      const doctorPayload = {
        specialization: formData.specialization,
        yoe: formData.yoe,
      };
      await addDoctor(doctorId,doctorPayload);
       
      Swal.fire("Success", "Doctor added successfully!", "success");
      resetForm();
      fetchDoctors();
    } catch (error) {
      console.error("Error adding Doctor:", error);
      Swal.fire("Error", "Something went wrong while saving Doctor data.", "error");
    }
  };

  const handleEditDoctor = (doctor) => {
    const combineData = {
      ...doctor,...doctor.users
    };

    setFormData(combineData);
    setIsEditing(true);
    setSelectedDoctor(doctor);
  };

  const handleUpdateDoctor =  async(doctor) => {

    setSelectedDoctor(doctor);
    const userId = selectedDoctor.users.user_id;
    // console.log("UserId : ",userId);
    const doctorId =selectedDoctor.doctor_id;
    // console.log("DoctorId : ",doctorId);
    
      try { 
        const updatedUser = {
          name: formData.name,
          emailId: formData.emailId,
          dateOfBirth: formData.dateOfBirth,
          phone: formData.phone,
          gender: formData.gender,
          address: formData.address, 
          password: formData.password,
          role: formData.role,
        };
      
        const updatedDoctor = {
          specialization: formData.specialization,
          yoe: formData.yoe,
        };
      
        await updateUser(userId, updatedUser);
        await updateDoctor(doctorId, updatedDoctor); 
          
        Swal.fire("Success", "Doctor updated successfully", "success");
        fetchDoctors();
        resetForm();
      } catch (error) {
        console.error("Error updating doctor:", error);
        Swal.fire("Error", "Failed to update doctor", "error");
      }
  };

  const handleDeleteDoctor = async(userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteUser(userId);
        setDoctors(doctors.filter(doctor => doctor.users.user_id !== userId)); 
        fetchDoctors();
        Swal.fire("Success", "Doctor deleted successfully!", "success");
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Failed to delete doctor", "error");
      }
    }
    }); 
  };

  const resetForm = () => {
    setFormData({   
      id: null,
      name: "", 
      dateOfBirth: "", 
      emailId: "", 
      phone: "", 
      gender: "", 
      address: "", 
      password: "",
      role: "",  
      specialization: "",
      yoe: "",
    });
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
                    <input type="text"
                      id="floatingName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Doctor Name"
                      required
                      autoComplete="off"
                      className="form-control"/>
                    <label htmlFor="floatingName">Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="date"
                      id="floatingDateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="form-control"/>
                    <label htmlFor="floatingDateOfBirth">Date of Birth</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="email"
                      id="floatingEmail"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      required
                      autoComplete="off"
                      className="form-control"/>
                    <label htmlFor="floatingEmail">Email</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text"
                      id="floatingPhone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      required
                      autoComplete="off"
                      className="form-control"/>
                    <label htmlFor="floatingPhone">Phone</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <select id="floatingGender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      placeholder="Enter Patient Gender"
                      required
                      autoComplete="off"
                      className="form-select">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    </select>
                    <label htmlFor="floatingGender">Gender</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text"
                      id="floatingAddress"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter Address"
                      required
                      autoComplete="off"
                      className="form-control"/>
                    <label htmlFor="floatingAddress">Address</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text"
                      id="floatingRole"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Enter Role"
                      required
                      autoComplete="off"
                      className="form-control" />
                    <label htmlFor="floatingRole">Role</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="password"
                      id="floatingPassword"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your Password"
                      required
                      autoComplete="off"
                      className="form-control" />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                </div>      
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text" 
                      id="floatingSpecialization" 
                      name="specialization" 
                      value={formData.specialization} 
                      onChange={handleChange} 
                      placeholder="Enter Doctor Specialization"
                      required
                      autoComplete="off"
                      className="form-control"/>
                    <label htmlFor="floatingSpecialization">Specialization</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text" 
                      id="floatingyoe" 
                      name="yoe" 
                      value={formData.yoe} 
                      onChange={handleChange} 
                      placeholder="Enter Doctor yoe"
                      required
                      autoComplete="off"
                      className="form-control"/>
                    <label htmlFor="floatingyoe">Years of Experience</label>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                {isEditing ? (
                  <div>
                    <button className="btn btn-success me-2" onClick={handleUpdateDoctor}>Update</button>
                    <button className="btn btn-danger" onClick={resetForm}>Cancel</button>
                  </div>
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
                    <li key={doctor.doctor_id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        {doctor.users.name} - {doctor.specialization} -  {doctor.users.phone}
                      </div>
                      <div>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditDoctor(doctor)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteDoctor(doctor.users.user_id)}>Delete</button>
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
