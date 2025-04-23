import axios from 'axios';

const API_BASE_URL = 'https://medilocker-rmo3.onrender.com/appointment';

export const addAppointment = (patientId, appointmentData) => {
  return axios.post(`${API_BASE_URL}/addAppointment/${patientId}`, appointmentData);
};

export const getAppointment = (appointmentId) => {
  return axios.get(`${API_BASE_URL}/getAppointment/${appointmentId}`);
};

export const getAllAppointments = () => {
  return axios.get(`${API_BASE_URL}/getAllAppointment`);
};

export const deleteAppointment = (appointmentId) => {
  return axios.delete(`${API_BASE_URL}/deleteAppointment/${appointmentId}`);
};
