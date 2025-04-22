import axios from 'axios';

const API_BASE_URL = 'https://184.72.80.63/leave';

export const addLeave = (doctorId, leaveData) => {
    return axios.post(`${API_BASE_URL}/addLeave/${doctorId}`, leaveData);
};

export const getLeave = (leaveId) => {
    return axios.get(`${API_BASE_URL}/getLeave/${leaveId}`);
};

export const getAllLeaves = () => {
    return axios.get(`${API_BASE_URL}/getAllLeave`);
};

export const updateLeave = (leaveId,leaveData) => {
    return axios.put(`${API_BASE_URL}/update/${leaveId}`,leaveData);
}; 