import axios from 'axios';

const API_BASE_URL = 'https://44.210.125.81/doctor';

export const addDoctor = (doctorId, doctorData) => {
    return axios.post(`${API_BASE_URL}/addDoctor/${doctorId}`, doctorData);
};

export const getDoctor = (doctorId) => {
    return axios.get(`${API_BASE_URL}/getDoctor/${doctorId}`);
};

export const getDoctorId = (userId) => {
    return axios.get(`${API_BASE_URL}/getDoctorId/${userId}`);
};

export const getAllDoctors = () => {
    return axios.get(`${API_BASE_URL}/getAllDoctor`);
};

export const updateDoctor = (doctorId, doctorData) => {
    return axios.put(`${API_BASE_URL}/updateDoctor/${doctorId}`, doctorData);
};

export const deleteDoctor = (doctorId) => {
    return axios.delete(`${API_BASE_URL}/deleteDoctor/${doctorId}`);
};