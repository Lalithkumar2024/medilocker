import React, { useState , useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Swal from "sweetalert2";
import { addAppointment, getAllAppointments, deleteAppointment } from "../api/AppointmentService";
import { addData, getALLGraphData } from "../api/GraphService";
import { getPatientId } from "../api/PatientService";
import { getAllDoctors } from "../api/DoctorService";
import { getAllScheduleTimes } from "../api/ScheduleService";

const Dashboard = () => {
  const [sugarData, setSugarData] = useState([]);
  const [beforeEating, setBeforeEating] = useState("");
  const [afterEating, setAfterEating] = useState("");
  const [selectedRange, setSelectedRange] = useState("week");

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const user = JSON.parse(localStorage.getItem("users"));
  const userId = user.user_id;
  const userName = user.name;
  console.log("Logged-in user:", user);

  const loadScheduleTimes = async () => {
    if (selectedDoctor) {
      const slots = await scheduleTime(selectedDoctor);
      setAvailableTimeSlots(slots);
    } else {
      setAvailableTimeSlots([]);
    }
  };

  const isTimeAvailable = () => {
    if (!appointmentTime || !appointmentDate || availableTimeSlots.length === 0) return false;
  
    return availableTimeSlots.some(slot => {
      return slot.date === appointmentDate && appointmentTime >= slot.from && appointmentTime <= slot.to;
    });
  };

  
  useEffect(() => {  
    fetchGraphData();
    fetchDoctors();
    fetchAppointments();
    loadScheduleTimes();
    if (selectedDoctor && appointmentTime && appointmentDate && !isTimeAvailable()) {
      Swal.fire("Unavailable Time Slot","The selected time is not available for this doctor. Please choose a different time.","error");
    }
  }, [appointmentDate, appointmentTime, selectedDoctor, loadScheduleTimes, isTimeAvailable]);

  const fetchGraphData = async () => {
    try{
    const patient = await getPatientId(userId);
    const patientId = patient.data;

    const res = await getALLGraphData(); 
    const filteredData = res.data.filter(item => item.patient.patient_id === patientId);
    
    const simplified = filteredData.map(item => ({
      date: item.dataDate,
      beforeEating: item.beforeEating,
      afterEating: item.afterEating,
    }));
  
    setSugarData(simplified);
    console.log("sugar data:",simplified);
    }catch(error){
      console.log("error fetching sugar data",error);
    }
  };

  const fetchAppointments = async () => {
    try{
      const patient = await getPatientId(userId);
      const patientId = patient.data;

      const response = await getAllAppointments();
      const filtered = response.data.filter(item => item.patient.patient_id === patientId);

      setAppointments(filtered);
      console.log("Appointments :" , filtered);
    }catch(error){
      console.log("Error fetching appointments",error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await getAllDoctors();
      setDoctors(res.data);
      console.log("doctors :",res.data); 
    } catch (error) {
      console.error("Failed to fetch doctors", error);
    }
  };


  const handleChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleBookAppointment = async() => {
    if (selectedDoctor && appointmentDate && appointmentTime) {
      const newAppointment = {
        doctorName: selectedDoctor,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
      };
      
      const patient = await getPatientId(userId);
      const patientId = patient.data;
      console.log("PatientId :",patientId);

      try {
        await addAppointment(patientId, newAppointment); 
        setAppointments([...appointments, newAppointment]);
        setSelectedDoctor("");
        setAppointmentDate("");
        setAppointmentTime("");
        Swal.fire("Appointment Booked!", `Appointment for ${selectedDoctor} on ${appointmentDate} at ${appointmentTime} Booked Successfully!`, "success");
      } catch (error) {
        Swal.fire("Error", "Failed to book appointment.", "error");
      }
    }
  };

  const handleCancelAppointment = async (index) => {
    const appointmentToCancel = appointments[index];
  
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, cancel it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id = appointmentToCancel.appointment_id;
          console.log("appointment_id:",id);
          await deleteAppointment(id); 
          const updatedAppointments = appointments.filter((_, i) => i !== index);
          setAppointments(updatedAppointments);
          Swal.fire("Cancelled!", "The appointment has been cancelled.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to cancel appointment in backend.", "error");
        }
      }
    });
  };
  
  const scheduleTime = async (selectedDoctorName) => {
    try {
      const response = await getAllScheduleTimes();
      const allSchedules = response.data;
      const doctorAvailableTimes = allSchedules.filter(
        (schedule) => schedule.doctorName === selectedDoctorName
      );
      const availableSlots = doctorAvailableTimes.map((schedule) => ({
        date: schedule.scheduleDate,
        from: schedule.fromTime,
        to: schedule.toTime,
      }));
  
      return availableSlots;
    } catch (error) {
      console.error("Failed to fetch schedule times:", error);
      return [];
    }
  };

  const handleAddSugarData = async() => {
    const now = new Date();
    const hours = now.getHours();

    const patient = await getPatientId(userId);
    const patientId = patient.data;
    console.log("PatientId :",patientId);
    
    if (hours < 6 || hours >= 8) {
      Swal.fire("Error", "Sugar level data can only be uploaded between 6 AM and 8 AM.", "error");
      return;
    }

    if (beforeEating && afterEating) {
      const newData = {
        beforeEating: parseInt(beforeEating),
        afterEating: parseInt(afterEating)
      };
      try {
        await addData(patientId, newData);
        setSugarData([...sugarData, newData]);
        setBeforeEating("");
        setAfterEating("");
        await fetchGraphData();
        Swal.fire("Valued Added!", "Sugar level Data Updated.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to upload data.", "error");
      }
    }
  };

  const generateChartData = () => {
    let dates = [];
    let today = new Date();
  
    for (let i = 0; i < (selectedRange === "week" ? 7 : 30); i++) {
      let date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }
  
    return dates
      .map((date) => {
        let entry = sugarData.find((data) => data.date === date); 
        return entry
          ? { ...entry, time: date }
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

          {/* patient sugar detail graph */}
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
                    name="beforeEating"
                    autoComplete="off"
                    required
                    placeholder="Before Eating"
                    value={beforeEating}
                    onChange={(e) => setBeforeEating(e.target.value)}/>
                  <label htmlFor="beforeEating">Sugar Level (Before Eating)</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="afterEating"
                    name="afterEating"
                    autoComplete="off"
                    required
                    placeholder="After Eating"
                    value={afterEating}
                    onChange={(e) => setAfterEating(e.target.value)}/>
                  <label htmlFor="afterEating">Sugar Level (After Eating)</label>
                </div>
              </div>

              <div className="col-md-4 d-flex align-items-center">
                <button
                  className="btn button btn-success w-100"
                  onClick={handleAddSugarData}
                  disabled={!beforeEating || !afterEating}>
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
                className={`btn button ${selectedRange === "week" ? "btn-success" : "btn-outline-success"} me-2`}
                onClick={() => setSelectedRange("week")}>
                Weekly View
              </button>
              <button
                className={`btn button ${selectedRange === "month" ? "btn-success" : "btn-outline-success"}`}
                onClick={() => setSelectedRange("month")}>
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
                  <select className="form-control"
                    id="floatingDoctor"
                    value={selectedDoctor}
                    onChange={handleChange}>
                  <option value="">Select a Doctor</option>
                  {doctors.map((doctor, index) => (
                    <option key={index} value={doctor.doctorName}>
                      {doctor.doctorName} - {doctor.specialization}
                    </option>
                  ))}
                  </select>
                  <label htmlFor="floatingDoctor">Choose a Doctor</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating">
                  <input type="date"
                    className="form-control"
                    id="floatingDate"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}/>
                  <label htmlFor="floatingDate">Select Date</label>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="form-floating">
                  <input type="time"
                    className="form-control"
                    id="floatingTime"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    disabled={!selectedDoctor}/>
                  <label htmlFor="floatingTime">Select Time</label>
                </div>
              </div>

              <div className="col-md-12 d-flex justify-content-end">
                <button className="btn btn-success appointment-btn"
                  onClick={handleBookAppointment}
                  disabled={
                    !selectedDoctor ||
                    !appointmentDate ||
                    !appointmentTime ||
                    !isTimeAvailable()
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
                    {appointment.appointmentDate} -  {appointment.appointmentTime} - {appointment.doctorName}
                  </span>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => handleCancelAppointment(index)}>
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
