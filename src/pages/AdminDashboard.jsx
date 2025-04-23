import React, { useState , useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllAppointments } from "../api/AppointmentService"; 
import { getAllLeaves, updateLeave } from "../api/LeaveService";


const AdminDashboard = () => {
  const [doctorLeaves, setDoctorLeaves] = useState([]);
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [searchPatient, setSearchPatient] = useState("");

  const user = JSON.parse(localStorage.getItem("users"));
  const userName = user.name;

  useEffect(() => {
    fetchLeaves();
    fetchAppointments();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await getAllLeaves();
      setDoctorLeaves(response.data);
      // console.log("leaves :",response.data);
    } catch (error) {
      console.error("Error fetching doctor leaves:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await getAllAppointments();
      setPatientAppointments(response.data);
      // console.log("appointments :",response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleLeaveDecision = async (leaveId, status) => {
    try {
      const leaveToUpdate = doctorLeaves.find(leave => leave.leave_id === leaveId);

      const updatedLeave = {
        ...leaveToUpdate,
        leaveStatus: status,
      };

      await updateLeave(leaveId, updatedLeave);
      setDoctorLeaves(prevLeaves =>
      prevLeaves.map(leave =>
      leave.leave_id === leaveId ? { ...leave, leaveStatus: status } : leave
      )); 
    } catch (error) {
      console.error("Error updating leave status:", error);
      alert("Failed to update leave status. Try again.");
    }
  }

  const filteredDoctorLeaves = doctorLeaves.filter(leave =>
    leave.doctor.doctorName?.toLowerCase().includes(searchDoctor.toLowerCase())
  );
    
  const filteredAppointments = patientAppointments.filter(appointment =>
    appointment.patient?.patientName?.toLowerCase().includes(searchPatient.toLowerCase()) ||
    appointment.doctorName?.toLowerCase().includes(searchPatient.toLowerCase())
  );

  return (
    <div className="admindashboard">
      <Header/>
        <section className="admindashboardsection">
          <div className="container mt-4">
            <h2 className="text-start">Admin Dashboard</h2>
            <h3 className="text-start mt-3">Welcome, {userName}!</h3>

            {/* Doctors leave deatails */}
            <div className="mt-4">
              <h4>Doctors' Leave Details</h4>
              <hr className="border border-3 border-success" />
                <input type="text"
                  className="form-control mb-3"
                  placeholder="Search doctor..."
                  value={searchDoctor}
                  onChange={(e) => setSearchDoctor(e.target.value)}/>
                {filteredDoctorLeaves.length === 0 ? (
                  <p className="text-muted">No leave requests available.</p>
                ) : (
                  <ul className="list-group">
                    {filteredDoctorLeaves.map((leave) => (
                      <li key={leave.leave_id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          {leave.doctor.doctorName} -  {leave.leaveDate} -  {leave.leaveReason} - 
                          <span className={`ms-2 badge ${leave.leaveStatus === "Approved" ? "bg-success" : leave.leaveStatus === "Rejected" ? "bg-danger" : "bg-warning"}`}>
                            {leave.leaveStatus}
                          </span>
                        </div>
                        {leave.leaveStatus === "Pending" && (
                          <div>
                            <button className="btn btn-success btn-sm me-2" onClick={() => handleLeaveDecision(leave.leave_id, "Approved")}>Approve</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleLeaveDecision(leave.leave_id, "Rejected")}>Reject</button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
            </div>

            {/* patients Appointments */}
            <div className="mt-5">
              <h4>Patients' Appointments</h4>
              <hr className="border border-3 border-success" />
              <input type="text"
                className="form-control mb-3"
                placeholder="Search patient or doctor..."
                value={searchPatient}
                onChange={(e) => setSearchPatient(e.target.value)}/>
                {filteredAppointments.length === 0 ? (
                  <p className="text-muted">No active appointments.</p>
                ) : (
                  <ul className="list-group">
                    {filteredAppointments.map((appointment) => (
                      <li key={appointment.appointment_id} className="list-group-item">
                        {appointment.patient.patientName} -  {appointment.appointmentDate} -  {appointment.appointmentTime} - {appointment.doctorName}
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

  export default AdminDashboard;
