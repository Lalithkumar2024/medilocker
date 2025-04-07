import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Swal from "sweetalert2";

const Dashboard = ({ userName = "Kumaran" }) => {
  const [sugarData, setSugarData] = useState([ 
    { time: getDate(-6), beforeEating: 110, afterEating: 140 },
    { time: getDate(-5), beforeEating: 120, afterEating: 150 },
    { time: getDate(-4), beforeEating: 115 },
    { time: getDate(-3), beforeEating: 130, afterEating: 160 },
    { time: getDate(-2), beforeEating: 125, afterEating: 155 },
    { time: getDate(-1), beforeEating: 118, afterEating: 148 },
    { time: getDate(0), beforeEating: null, afterEating: null },]);
  const [beforeEating, setBeforeEating] = useState("");
  const [afterEating, setAfterEating] = useState("");
  const [selectedRange, setSelectedRange] = useState("week");

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  const doctors = [
    { name: "Dr. John - Cardiologist", unavailableTimes: ["10:00", "15:00"] },
    { name: "Dr. Smith - Dermatologist", unavailableTimes: ["12:30", "16:00"] },
    { name: "Dr. Sam - Neurologist", unavailableTimes: ["09:00", "14:00"] },
    { name: "Dr. Johnson - Orthopedic", unavailableTimes: ["11:00", "17:30"] },
  ];

  function getDate(daysAgo) {
    let date = new Date();
    date.setDate(date.getDate() + daysAgo);
    return date.toLocaleDateString();
  }
    
  const handleChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleBookAppointment = () => {
    if (selectedDoctor && appointmentDate && appointmentTime) {
      const newAppointment = {
        doctor: selectedDoctor,
        date: appointmentDate,
        time: appointmentTime,
      };

      setAppointments([...appointments, newAppointment]);
      setSelectedDoctor("");
      setAppointmentDate("");
      setAppointmentTime("");
    }
  };

  const handleCancelAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  const getUnavailableTimes = () => {
    const doctor = doctors.find((doc) => doc.name === selectedDoctor);
    return doctor ? doctor.unavailableTimes : [];
  };

  const handleAddSugarData = () => {
    const now = new Date();
    const hours = now.getHours();
    
    if (hours < 6 || hours >= 8) {
      // Swal.fire("Error","Sugar level data can only be uploaded between 6 AM and 8 AM.","error");
      alert("Sugar level data can only be uploaded between 6 AM and 8 AM.");
      return;
    }

    if (beforeEating && afterEating) {
      setSugarData([...sugarData, { time: now.toLocaleDateString(), beforeEating, afterEating }]);
      setBeforeEating("");
      setAfterEating("");
    }
  };
  const generateChartData = () => {
    let dates = [];
    let today = new Date();
    for (let i = 0; i < (selectedRange === "week" ? 7 : 30); i++) {
      let date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toLocaleDateString());
    }

    return dates
      .map((date) => {
        let entry = sugarData.find((data) => data.time === date);
        return entry
          ? entry
          : { time: date, beforeEating: null, afterEating: null };
      })
      .reverse();
  };

  return (
    <div className="dashboard">
      <Header />
      <section className="dashboardsection">
        <div className="container mt-4">
          <h2 className="text-start">Dashboard</h2>
          <h3 className="text-start mt-3">Welcome, {userName}!</h3>

          <div className="mt-5">
            <h4>Track Your Sugar Levels</h4>
            <hr className="border border-3 border-success" />
            <div className="row g-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="beforeEating"
                    placeholder="Before Eating"
                    value={beforeEating}
                    onChange={(e) => setBeforeEating(e.target.value)}
                  />
                  <label htmlFor="beforeEating">Sugar Level (Before Eating)</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="afterEating"
                    placeholder="After Eating"
                    value={afterEating}
                    onChange={(e) => setAfterEating(e.target.value)}
                  />
                  <label htmlFor="afterEating">Sugar Level (After Eating)</label>
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <button
                  className="btn btn-success w-100"
                  onClick={handleAddSugarData}
                  disabled={!beforeEating || !afterEating}
                >
                  Add Data
                </button>
              </div>
            </div>
          </div>

          {/* graph */}
          <div className="mt-5">
            <h4>Sugar Level Graph</h4>
            <hr className="border border-3 border-success" />
            <div className="d-flex">
              <button
                className={`btn ${selectedRange === "week" ? "btn-success" : "btn-outline-success"} me-2`}
                onClick={() => setSelectedRange("week")}
              >
                Weekly View
              </button>
              <button
                className={`btn ${selectedRange === "month" ? "btn-success" : "btn-outline-success"}`}
                onClick={() => setSelectedRange("month")}
              >
                Monthly View
              </button>
            </div>
          </div>

          <div className="mt-5">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={generateChartData()}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />               
                <Line type="monotone" dataKey="beforeEating" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="afterEating" stroke="#82ca9d" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* book appointment */}
        <div className="mt-5">
               <h4>Book an Appointment</h4>
               <hr className="border border-3 border-success" />
               <div className="row g-3 mt-2">
                 <div className="col-md-4">
                     <div className="form-floating">
                     <select
                      className="form-control"
                      id="floatingDoctor"
                      value={selectedDoctor}
                      onChange={handleChange}>
                      <option value="">Select a Doctor</option>
                      {doctors.map((doctor, index) => (
                        <option key={index} value={doctor.name}>
                          {doctor.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="floatingDoctor">Choose a Doctor</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="floatingDate"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                    <label htmlFor="floatingDate">Select Date</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating">
                    <input
                      type="time"
                      className="form-control"
                      id="floatingTime"
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      disabled={!selectedDoctor}
                    />
                    <label htmlFor="floatingTime">Select Time</label>
                  </div>
                  {selectedDoctor && getUnavailableTimes().includes(appointmentTime) && (
                    <p className="text-danger mt-2"> This time slot is unavailable!</p>
                  )}
                </div>
                <div className="col-md-12 d-flex justify-content-end">
                  <button
                    className="btn btn-success appointment-btn"
                    onClick={handleBookAppointment}
                    disabled={
                      !selectedDoctor ||
                      !appointmentDate ||
                      !appointmentTime ||
                      getUnavailableTimes().includes(appointmentTime)
                    }>
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>

            {/* my appointments */}
            <div className="mt-5">
              <h4>My Appointments</h4>
              <hr className="border border-3 border-success" />
              {appointments.length === 0 ? (
                <p className="text-muted">No active appointments.</p>
              ) : (
                <ul className="list-group">
                  {appointments.map((appointment, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                      <span>
                        {appointment.date} -  {appointment.time} - {appointment.doctor}
                      </span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancelAppointment(index)}
                      >
                        Cancel
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
