import React, { useState , useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { addPatient , updatePatient , getAllPatients , getPatientId } from "../api/PatientService";
import { registerUser , updateUser , deleteUser } from "../api/UserService";
import { uploadDocument } from "../api/DocumentService";

const ManagePatient = () => {
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    name: "", 
    dateOfBirth: "", 
    emailId: "", 
    phone: "", 
    gender: "", 
    address: "", 
    password: "",
    role: "", 
    height: "",
    weight: "",
    bloodGroup: "",
    bloodPressure: "",
    sugarLevel: "", 
    bloodDonationDate: "",
    document: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await getAllPatients();
      setPatients(response.data);
      // console.log("Patient Data:",response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, document: file });
  };

  const handleAddPatient = async () => {
    if (!formData.name || !formData.emailId || !formData.phone || !formData.password || !formData.role ||
        !formData.gender || !formData.address || !formData.dateOfBirth || !formData.height || !formData.weight ||
        !formData.bloodGroup || !formData.sugarLevel || !formData.bloodPressure) {
      Swal.fire("Error", "Please fill in all required fields.", "error");
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
      // console.log("UserId : ",userId);
  
      const patient = await getPatientId(userId);
      const patientId = patient.data;
      // console.log("PatientId : ",patientId); 

      const patientPayload = {
        height: formData.height,
        weight: formData.weight,
        bloodGroup: formData.bloodGroup,
        bloodPressure: formData.bloodPressure,
        sugarLevel: formData.sugarLevel,
        bloodDonationDate: formData.bloodDonationDate,
      };
      await addPatient(patientId,patientPayload);
   
      Swal.fire("Success", "Patient added successfully!", "success");
      resetForm();
      fetchPatients();
    } catch (error) {
      console.error("Error adding patient:", error);
      Swal.fire("Error", "Something went wrong while saving patient data.", "error");
    }
  };

  const handleEditPatient = (patient) => {
    const combineData = {
      ...patient,...patient.users
    };

    setFormData(combineData);
    setIsEditing(true);
    setSelectedPatient(patient);
  };

  const handleUpdatePatient = async (patient) => {

    setSelectedPatient(patient);
    const userId = selectedPatient.users.user_id;
    // console.log("UserId : ",userId);
    const patientId =selectedPatient.patient_id;
    // console.log("PatientId : ",patientId);

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
  
      const updatedPatient = {
        height: formData.height,
        weight: formData.weight,
        bloodGroup: formData.bloodGroup,
        bloodPressure: formData.bloodPressure,
        sugarLevel: formData.sugarLevel,
        bloodDonationDate: formData.bloodDonationDate,
      };
  
      await updateUser(userId, updatedUser);
      await updatePatient(patientId, updatedPatient); 

      if (formData.document) {
        await uploadDocument(patientId,formData.document);
      }
  
      Swal.fire("Success", "Patient updated successfully", "success");
      fetchPatients();
      resetForm();
    } catch (error) {
      console.error("Error updating patient:", error);
      Swal.fire("Error", "Failed to update patient", "error");
    }
  };


  const handleDeletePatient = async (userId) => {
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
      setPatients(patients.filter(patient => patient.users.user_id !== userId)); 
      fetchPatients();
      Swal.fire("Success", "Patient deleted successfully!", "success");
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error", "Failed to delete patient", "error");
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
      height: "",
      weight: "",
      bloodGroup: "",
      bloodPressure: "",
      sugarLevel: "",
      password: "",
      role: "",
      bloodDonationDate: "",
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
                    <input type="text"
                      id="floatingName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
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
                      id="floatingDob"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      placeholder="Enter Date of Birth"
                      required
                      autoComplete="off"
                      className="form-control"/>
                    <label htmlFor="floatingDob">Date of Birth</label>
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
                      id="floatingHeight"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="Enter Height"
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
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="Enter Weight"
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
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      placeholder="Enter Blood Group"
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
                      value={formData.bloodPressure}
                      onChange={handleChange}
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
                      value={formData.sugarLevel}
                      onChange={handleChange}
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
                      value={formData.bloodDonationDate}
                      onChange={handleChange}
                      placeholder="Enter Blood Donation Date"
                      required
                      autoComplete="off"
                      className="form-control"/>
                    <label htmlFor="floatingBloodDonationDate">Blood Donation Date</label>
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
                  <div>
                    <button className="btn btn-success me-2" onClick={handleUpdatePatient}>Update</button>
                    <button className="btn btn-danger" onClick={resetForm}>Cancel</button>
                  </div>
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
                    <li key={patient.patient_id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        {patient.users.name} - {patient.users.emailId} - {patient.users.phone}
                      </div>
                      <div>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditPatient(patient)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeletePatient(patient.users.user_id)}>Delete</button>
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