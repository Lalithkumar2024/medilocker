import React, { useState } from "react";

const Dashboard = ({ userName = "Kumaran" }) => {
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

  return (
    <div className="dashboard">
      <section className="dashboardsection">
        <div className="container mt-4">
          <h2 className="text-start">Dashboard</h2>
          <h3 className="text-start mt-3">Welcome, {userName}!</h3>
          <div className="mt-4">
            <h4>Book an Appointment</h4>
            <hr className="border border-3 border-success" />

            <div className="row g-3 mt-2">
              <div className="col-md-4">
                <div className="form-floating">
                  <select
                    className="form-control"
                    id="floatingDoctor"
                    value={selectedDoctor}
                    onChange={handleChange}
                  >
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
                  className="btn btn-success"
                  onClick={handleBookAppointment}
                  disabled={
                    !selectedDoctor ||
                    !appointmentDate ||
                    !appointmentTime ||
                    getUnavailableTimes().includes(appointmentTime)
                  }
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
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
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
