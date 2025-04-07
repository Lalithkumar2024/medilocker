import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const DoctorDashboard = ({ doctorName = "John" }) => {
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveApplied, setLeaveApplied] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [availabilityFrom, setAvailabilityFrom] = useState("");
  const [availabilityTo, setAvailabilityTo] = useState("");

  const appointments = [
    { id: 1, patientName: "Kumaran", date: "2025-03-10", time: "10:00 AM" },
    { id: 2, patientName: "Desigan", date: "2025-03-12", time: "2:00 PM" },
    { id: 3, patientName: "Kumar", date: "2025-03-15", time: "4:30 PM" },
  ];

  const handleApplyLeave = () => {
    if (leaveReason && leaveDate) {
      Swal.fire('Leave Applied!',`Leave applied successfully for ${leaveDate} due to "${leaveReason}"!`,'success');
      setLeaveApplied(true);
    }
  };

  const handleAddAvailability = () => {
    if (availabilityDate && availabilityFrom && availabilityTo) {
      setAvailableTimes([...availableTimes, { date: availabilityDate, from: availabilityFrom, to: availabilityTo }]);
      setAvailabilityDate("");
      setAvailabilityFrom("");
      setAvailabilityTo("");
      Swal.fire("Schedule Added!",`Schedule Time on ${availabilityDate} Confrimed.`,"success");
    }
  };

  return (
    <div className="doctordashboard">
      <Header />
      <section className="doctordashboardsection">
        <div className="container mt-4">
          <h2 className="text-start">Doctor Dashboard</h2>
          <h3 className="text-start mt-3">Welcome, Dr. {doctorName}!</h3>
          
          <div className="mt-5">
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
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <h4>Available Times</h4>
            <hr className="border border-3 border-success" />
            <div className="row g-3 mt-2">
              <div className="col-md-4">
                <div className="form-floating">
                  <input type="date" 
                    id="floatingDate"
                    name="date"
                    value={availabilityDate} 
                    onChange={(e) => setAvailabilityDate(e.target.value)} 
                    placeholder="Enter date"
                    required
                    autoComplete="off"
                    className="form-control" />
                  <label htmlFor="floatingDate">Select Date</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input type="time"
                    id="floatingFromTime"
                    name="fromtime"
                    value={availabilityFrom} 
                    onChange={(e) => setAvailabilityFrom(e.target.value)}
                    placeholder="Enter from time"
                    required
                    autoComplete="off"
                    className="form-control" />
                  <label htmlFor="floatingFromTime">From</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input type="time" 
                    id="floatingToTime"
                    name="totime"
                    value={availabilityTo} 
                    onChange={(e) => setAvailabilityTo(e.target.value)} 
                    placeholder="Enter to time"
                    required
                    autoComplete="off"
                    className="form-control" />
                  <label htmlFor="floatingToTime">To</label>
                </div>
              </div>
              <div className="col-md-12 d-flex justify-content-end">
                <button className="btn btn-success leave-btn" onClick={handleAddAvailability} disabled={!availabilityDate || !availabilityFrom || !availabilityTo}>
                  Add Availability
                </button>
              </div>
            </div>

            {availableTimes.length > 0 && (
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {availableTimes.map((slot, index) => (
                    <tr key={index}>
                      <td>{slot.date}</td>
                      <td>{slot.from}</td>
                      <td>{slot.to}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-5">
            <h4>Apply for Leave</h4>
            <hr className="border border-3 border-success" />
            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="date" 
                      id="floatingLeaveDate"
                      name="leavedate"
                      value={leaveDate} 
                      onChange={(e) => setLeaveDate(e.target.value)} 
                      placeholder="Enter your Leave Date"
                      required
                      autoComplete="off"
                      className="form-control" />
                  <label htmlFor="floatingLeaveDate">Select Leave Date</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" 
                    id="floatingLeaveReason"
                    name="leavereason"
                    value={leaveReason} 
                    onChange={(e) => setLeaveReason(e.target.value)}
                    placeholder="Enter reason for leave" 
                    required
                    autoComplete="off"
                    className="form-control" />
                  <label htmlFor="floatingLeaveReason">Reason for Leave</label>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <button className="btn btn-success leave-btn" onClick={handleApplyLeave} disabled={!leaveReason || !leaveDate}>
                  Apply for Leave
                </button>
              </div>
            </div>
            {/* {leaveApplied && <div className="alert alert-success mt-3">Leave applied successfully for {leaveDate} due to "{leaveReason}"!</div>} */}
          </div>

          
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
