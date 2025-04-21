import axios from 'axios';

const API_BASE_URL = 'http://54.204.207.122:8080/leave';

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