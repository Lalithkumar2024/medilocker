import React, { useState , useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { addScheduleTime } from "../api/ScheduleService";
import { addLeave } from "../api/LeaveService"; 
import { getDoctorId } from "../api/DoctorService";
import { getAllAppointments } from "../api/AppointmentService";

const DoctorDashboard = () => {
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveApplied, setLeaveApplied] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [availabilityFrom, setAvailabilityFrom] = useState("");
  const [availabilityTo, setAvailabilityTo] = useState("");
  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("users"));
  const userId = user.user_id;
  const userName = user.name;
  console.log("Logged-in user:", user);

  useEffect(() => { 
    fetchAppointments();
  },[]);

  const fetchAppointments = async () => {
    try{
      const response = await getAllAppointments();
      const filtered = response.data.filter(item => item.doctorName === userName);

      setAppointments(filtered);
      console.log("Appointments :" , filtered);
    }catch(error){
      console.log("Error fetching appointments",error);
    }
  };

  const handleApplyLeave = async () => {
    if (leaveReason && leaveDate) {
      const leaveData = {
        leaveDate: leaveDate,
        leaveReason: leaveReason,
        leaveStatus: "Pending", 
      };
      
      const doctor = await getDoctorId(userId);
      const doctorId = doctor.data;

      try {
        await addLeave(doctorId, leaveData);
        setLeaveApplied(true);
        Swal.fire("Leave Applied!", `Leave applied successfully for ${leaveDate} due to "${leaveReason}"!`, "success");
      } catch (error) {
        console.error("Failed to apply leave", error);
        Swal.fire("Error", "Failed to apply for leave. Please try again.", "error");
      }
    }
  }; 

  const handleAddAvailability = async () => {
    if (availabilityDate && availabilityFrom && availabilityTo) {
      const scheduleData = {
        scheduleDate: availabilityDate,
        fromTime: availabilityFrom,
        toTime: availabilityTo
      };

      const doctor = await getDoctorId(userId);
      const doctorId = doctor.data;
  
      try {
        await addScheduleTime(doctorId, scheduleData);
        setAvailableTimes([...availableTimes, scheduleData]);
        setAvailabilityDate("");
        setAvailabilityFrom("");
        setAvailabilityTo("");
        Swal.fire("Schedule Added!", `Schedule Time on ${availabilityDate} Confirmed.`, "success");
      } catch (error) {
        console.error("Failed to add availability", error);
        Swal.fire("Error", "Failed to add schedule. Please try again.", "error");
      }
    }
  };
  

  return (
    <div className="doctordashboard">
      <Header />
      <section className="doctordashboardsection">
        <div className="container mt-4">
          <h2 className="text-start">Doctor Dashboard</h2>
          <h3 className="text-start mt-3">Welcome, Dr. {userName}!</h3>
          
          {/* appointments */}
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
                    <td>{appointment.patient.patientName}</td>
                    <td>{appointment.appointmentDate}</td>
                    <td>{appointment.appointmentTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* schedule time */}
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
                      <td>{slot.scheduleDate}</td>
                      <td>{slot.fromTime}</td>
                      <td>{slot.toTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* leaves  */}
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

          </div>          
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
