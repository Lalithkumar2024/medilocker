import axios from 'axios';

const API_BASE_URL = 'https://44.210.125.81/patients';

export const addPatient = (patientId, patientData) => {
    return axios.post(`${API_BASE_URL}/addPatient/${patientId}`, patientData);
};

export const getPatient = (patientId) => {
    return axios.get(`${API_BASE_URL}/getPatient/${patientId}`);
};

export const getPatientId = (userId) => {
    return axios.get(`${API_BASE_URL}/getPatientId/${userId}`);
};

export const getAllPatients = () => {   
    return axios.get(`${API_BASE_URL}/getAllPatient`);
};

export const updatePatient = (patientId, patientData) => {
    return axios.put(`${API_BASE_URL}/updatePatient/${patientId}`, patientData);
};

export const deletePatient = (patientId) => {
    return axios.delete(`${API_BASE_URL}/deletePatient/${patientId}`);
};