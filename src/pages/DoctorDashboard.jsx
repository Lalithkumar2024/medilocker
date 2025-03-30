import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DoctorDashboard = ({ doctorName="John" }) => {
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveApplied, setLeaveApplied] = useState(false);

  const appointments = [
    { id: 1, 
      patientName: "Kumaran", 
      date: "2025-03-10", 
      time: "10:00 AM" },
    { id: 2, 
      patientName: "Desigan", 
      date: "2025-03-12", 
      time: "2:00 PM" },
    { id: 3, 
      patientName: "Kumar", 
      date: "2025-03-15", 
      time: "4:30 PM" },
  ];

  const handleLeaveChange = (e) => {
    setLeaveReason(e.target.value);
  };

  const handleLeaveDateChange = (e) => {
    setLeaveDate(e.target.value);
  };

  const handleApplyLeave = () => {
    if (leaveReason && leaveDate) {
      setLeaveApplied(true);
    }
  };

  return (
    <div className="doctordashboard">
      <Header/>
        <section className="doctordashboardsection">
            <div className="container mt-4">
            <h2 className="text-start">Doctor Dashboard</h2>
            <h3 className="text-start mt-3">Welcome, Dr. {doctorName}!</h3>
            <div className="mt-4">
                <h4>Booked Appointments</h4>
                <hr className="border border-3 border-success" />
                
                <table className="table table-striped mt-2">
                <thead>
                    <tr>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="3" className="text-center">No Appointments</td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            <div className="mt-4">
                <h4>Apply for Leave</h4>
                <hr className="border border-3 border-success" />

                <div className="row g-3 mt-2">
                <div className="col-md-6">
                    <div className="form-floating">
                    <input
                        type="date"
                        id="floatingLeaveDate"
                        name="leaveDate"
                        value={leaveDate}
                        onChange={handleLeaveDateChange}
                        placeholder="Select Leave Date"
                        required
                        autoComplete="off"
                        className="form-control"
                    />
                    <label htmlFor="leaveDate">Select Leave Date</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-floating">
                    <input
                        type="text"
                        id="floatingLeaveReason"
                        name="leaveReason"
                        value={leaveReason}
                        onChange={handleLeaveChange}
                        placeholder="Enter reason for leave"
                        required
                        autoComplete="off"
                        className="form-control"
                    />
                    <label htmlFor="leaveReason">Reason for Leave</label>
                    </div>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <button
                    className="btn btn-success leave-btn"
                    onClick={handleApplyLeave}
                    disabled={!leaveReason || !leaveDate}
                    >
                    Apply for Leave
                    </button>
                </div>
                </div>

                {leaveApplied && (
                <div className="alert alert-success mt-3" role="alert">
                    Leave applied successfully for {leaveDate} due to "{leaveReason}"!
                </div>
                )}
            </div>
            </div>
        </section>
      <Footer/>
    </div>
  );
};

export default DoctorDashboard;
