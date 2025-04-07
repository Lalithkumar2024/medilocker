import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Hospital from './pages/Hospital';
import Pharmacy from './pages/Pharmacy';
import LoginRegister from './pages/LoginRegister';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profilepage from './pages/Profilepage';
import Document from './pages/Document';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorProfile from './pages/DoctorProfile';
import AdminDashboard from './pages/AdminDashboard';
import ManageDoctor from './pages/ManageDoctor';
import ManagePatient from './pages/ManagePatient';


function App() {
  return (
    <div className="App">
      <BrowserRouter>        
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/hospital' element={<Hospital />}></Route>
          <Route path='/pharmacy' element={<Pharmacy />}></Route>
          <Route path='/login' element={<LoginRegister/>}></Route>
          <Route path='/register' element={<LoginRegister/>}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/profile' element={<Profilepage />}></Route>
          <Route path='/document' element={<Document />}></Route>
          <Route path='/doctordashboard' element={<DoctorDashboard />}></Route>
          <Route path='/doctorprofile' element={<DoctorProfile />}></Route>
          <Route path='/admindashboard' element={<AdminDashboard />}></Route>
          <Route path='/managedoctor' element={<ManageDoctor />}></Route>
          <Route path='/managepatient' element={<ManagePatient />}></Route>
        </Routes>       
      </BrowserRouter>
    </div>
  );
}

export default App;
