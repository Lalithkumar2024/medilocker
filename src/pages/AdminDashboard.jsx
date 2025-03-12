import React, { useState } from "react";

const AdminDashboard = ({ adminName = "Admin" }) => {

  const [doctorLeaves, setDoctorLeaves] = useState([
    { id: 1, 
      doctor: "Dr. John - Cardiologist", 
      date: "2025-03-10", 
      reason: "Medical Conference", 
      status: "Pending" },
    { id: 2, 
      doctor: "Dr. Smith - Dermatologist", 
      date: "2025-03-15", 
      reason: "Personal Leave", 
      status: "Pending" },
  ]);

  const [patientAppointments, setPatientAppointments] = useState([
    { id: 1, 
      patient: "Kumaran", 
      doctor: "Dr. Sam - Neurologist", 
      date: "2025-03-08", 
      time: "10:30 AM" },
    { id: 2, 
      patient: "Desigan", 
      doctor: "Dr. Johnson - Orthopedic", 
      date: "2025-03-09", 
      time: "03:00 PM" },
  ]);

  const [searchDoctor, setSearchDoctor] = useState("");
  const [searchPatient, setSearchPatient] = useState("");

  const handleLeaveDecision = (id, status) => {
    setDoctorLeaves(doctorLeaves.map(leave => leave.id === id ? { ...leave, status } : leave));
  };

  const filteredDoctorLeaves = doctorLeaves.filter(leave =>
    leave.doctor.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const filteredAppointments = patientAppointments.filter(appointment =>
    appointment.patient.toLowerCase().includes(searchPatient.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchPatient.toLowerCase())
  );

  return (
    <div className="admindashboard">
      <section className="admindashboardsection">
        <div className="container mt-4">
          <h2 className="text-start">Admin Dashboard</h2>
          <h3 className="text-start mt-3">Welcome, {adminName}!</h3>
          <div className="mt-4">
            <h4>Doctors' Leave Details</h4>
            <hr className="border border-3 border-danger" />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search doctor..."
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />
            {filteredDoctorLeaves.length === 0 ? (
              <p className="text-muted">No leave requests available.</p>
            ) : (
              <ul className="list-group">
                {filteredDoctorLeaves.map((leave) => (
                  <li key={leave.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                       {leave.doctor} -  {leave.date} -  {leave.reason} - 
                      <span className={`ms-2 badge ${leave.status === "Approved" ? "bg-success" : leave.status === "Rejected" ? "bg-danger" : "bg-warning"}`}>
                        {leave.status}
                      </span>
                    </div>
                    {leave.status === "Pending" && (
                      <div>
                        <button className="btn btn-success btn-sm me-2" onClick={() => handleLeaveDecision(leave.id, "Approved")}>Approve</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleLeaveDecision(leave.id, "Rejected")}>Reject</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-5">
            <h4>Patients' Appointments</h4>
            <hr className="border border-3 border-primary" />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search patient or doctor..."
              value={searchPatient}
              onChange={(e) => setSearchPatient(e.target.value)}
            />
            {filteredAppointments.length === 0 ? (
              <p className="text-muted">No active appointments.</p>
            ) : (
              <ul className="list-group">
                {filteredAppointments.map((appointment) => (
                  <li key={appointment.id} className="list-group-item">
                     {appointment.patient} -  {appointment.date} -  {appointment.time} - {appointment.doctor}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
