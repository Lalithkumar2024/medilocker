import React, { useState , useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPatient , getPatientId , updatePatient } from "../api/PatientService";
import { getUserById , updateUser } from "../api/UserService";
import Swal from "sweetalert2";

const Profilepage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userId,setUserId] = useState();
  const [patientId,SetPatientId] = useState();

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
  const [patientData,setPatientData] = useState({
    height: "",
    weight: "",
    bloodGroup: "",
    bloodPressure: "",
    sugarLevel: "",
    bloodDonationDate : "",
  });

  useEffect(() => {  
    fetchData();
  }, [patientId, userId]);
  
  const fetchData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("users"));
      
      const userId = storedUser.user_id;
      setUserId(userId);
      // console.log("UserId :",userId);
        
      const patient = await getPatientId(userId);
      const patientId = patient.data;
      SetPatientId(patientId);
      // console.log("PatientId :",patientId);

      const [patientRes, userRes] = await Promise.all([
        getPatient(patientId),
        getUserById(userId),
      ]);
        setPatientData(patientRes.data);
        setUserData(userRes.data);
    } catch (err) {
      console.error("Failed to fetch patient or user data", err);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };
  
  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    try{
      updatePatient(patientId,patientData);
      updateUser(userId,userData);
      setIsEditing(false);
      Swal.fire("Success","Profile updated successfully!","success");
    }catch(error){
      Swal.fire("Error","Failed to update profile.","error");
    }
  };
    
  const handleCancel = () => {
    setIsEditing(false);
    Promise.all([getPatient(patientId), getUserById(userId)])
    .then(([patientRes, userRes]) => {
      setPatientData(patientRes.data);
      setUserData(userRes.data);
    })
    .catch((err) => {
      console.error("Failed to reload data", err);
    });
  };

  return (
    <div className="profile">
      <Header/>
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
                  <input type="text" 
                    id="floatingName" 
                    name="name" 
                    value={userData.name} 
                    readOnly 
                    placeholder="Enter Patient Name"
                    required
                    autoComplete="off"
                    className="form-control"/>
                  <label htmlFor="floatingName">Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="date" 
                    name="DOB"
                    id="floatingDOB" 
                    value={userData.dateOfBirth} 
                    readOnly 
                    placeholder="Enter Patient Date of Birth"
                    required
                    autoComplete="off"
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
                    placeholder="Enter Patient Email"
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
                    placeholder="Enter Patient Phone"
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
                    value={userData.address} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    placeholder="Enter Patient Address"
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
            
            <h4 className="mt-4 text-start">My Health Information</h4>
            <hr className="border border-3 border-success" />
            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" 
                    id="floatingHeight" 
                    name="height" 
                    value={patientData.height} 
                    onChange={handleChange} 
                    disabled={!isEditing}
                    placeholder="Enter Patient Height"
                    required
                    autoComplete="off"
                    className="form-control"/>
                  <label htmlFor="floatingHeight">Height</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" 
                    id="floatingWeight" 
                    name="weight" 
                    value={patientData.weight} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    placeholder="Enter Patient Weight"
                    required
                    autoComplete="off"
                    className="form-control"/>
                  <label htmlFor="floatingWeight">Weight</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" 
                    id="floatingBloodGroup" 
                    name="bloodGroup" 
                    value={patientData.bloodGroup} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    placeholder="Enter Patient Blood Group"
                    required
                    autoComplete="off"
                    className="form-control"/>
                  <label htmlFor="floatingBloodGroup">Blood Group</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <select id="floatingBloodPressure"
                    name="bloodPressure"
                    value={patientData.bloodPressure}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-select"
                    required>
                    <option value="">Select Blood Pressure</option>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </select>
                  <label htmlFor="floatingBloodPressure">Blood Pressure</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <select id="floatingSugarLevel"
                    name="sugarLevel"
                    value={patientData.sugarLevel}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-select"
                    required>
                    <option value="">Select Sugar Level</option>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </select>
                  <label htmlFor="floatingSugarLevel">Sugar Level</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="date" 
                    id="floatingBloodDonationDate" 
                    name="bloodDonationDate" 
                    value={patientData.bloodDonationDate} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    placeholder="Enter Patient Blood Donation Date"
                    required
                    autoComplete="off"
                    className="form-control"/>
                  <label htmlFor="floatingBloodDonationDate">Blood Donation Date</label>
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

export default Profilepage;
