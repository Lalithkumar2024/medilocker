import React, { useState , useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getDoctor, updateDoctor,getDoctorId } from "../api/DoctorService";
import { getUserById,updateUser } from "../api/UserService";
import Swal from "sweetalert2";

const DoctorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userId,setUserId] = useState();
  const [doctorId,SetDoctorId] = useState();

  const [userData, setUserData] = useState({
    name: "",
    emailId: "",
    dateOfBirth: "",
    phone: "",
    gender: "", 
    address: "",
    password: "",
    role: "",
  });
    
  const [doctorData,setDoctorData] = useState({
    specialization: "",
    yoe: "",
  });
    

  useEffect(() => {   
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("users"));

      const userId = storedUser.user_id;
      setUserId(userId);
      // console.log("UserId :",userId);

      const doctor = await getDoctorId(userId);
      const doctorId = doctor.data;
      SetDoctorId(doctorId);
      // console.log("DoctorID :",doctorId)

      const [doctorRes, userRes] = await Promise.all([
        getDoctor(doctorId),
        getUserById(userId),
      ]);
      setDoctorData(doctorRes.data);
      setUserData(userRes.data);
    } catch (err) {
      console.error("Failed to fetch patient or user data", err);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    try{
      updateDoctor(doctorId,doctorData);
      updateUser(userId,userData);
      setIsEditing(false);
      Swal.fire("Success","Profile updated successfully!","success");
    }catch(error){
      Swal.fire("Error","Failed to update profile.","error");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    Promise.all([getDoctor(doctorId), getUserById(userId)])
      .then(([doctorRes, userRes]) => {
      setDoctorData(doctorRes.data);
      setUserData(userRes.data);
      })
      .catch((err) => {
        console.error("Failed to reload data", err);
      });
  };

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
                  <input type="text"  
                    id="floatingName"
                    name="name"
                    value={userData.name} 
                    placeholder="Enter Doctor Name"
                    required
                    autoComplete="off"
                    readOnly
                    className="form-control"/>
                  <label htmlFor="floatingName">Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="date" 
                    id="floatingDOB"
                    name="dateOfBirth"
                    value={userData.dateOfBirth} 
                    placeholder="Enter Doctor Date of Birth"
                    required
                    autoComplete="off"
                    readOnly
                    className="form-control"/>
                  <label htmlFor="floatingDOB">Date of Birth</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="email" 
                    id="floatingEmail" 
                    name="email" 
                    value={userData.emailId} 
                    onChange={handleChange} 
                    disabled={!isEditing}
                    placeholder="Enter Doctor Email"
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
                    value={userData.phone} 
                    onChange={handleChange} 
                    disabled={!isEditing}
                    placeholder="Enter Doctor Phone"
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
                    value={userData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter Doctor Gender"
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
                    value={userData.address} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    placeholder="Enter Doctor Address"
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
                    value={userData.role}
                    readOnly 
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
                    value={userData.password}
                    onChange={handleChange}
                    disabled={!isEditing} 
                    placeholder="Enter your Password"
                    required
                    autoComplete="off"
                    className="form-control" />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
              </div>
            </div>

            <h4 className="mt-4">My Specialty & Experience</h4>
            <hr className="border border-3 border-success" />
                
            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" 
                    id="floatingSpecialization" 
                    name="specialization" 
                    value={doctorData.specialization} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
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
                    value={doctorData.yoe} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    placeholder="Enter Doctor yoe"
                    required
                    autoComplete="off"
                    className="form-control"/>
                  <label htmlFor="floatingyoe">Years of Experience</label>
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