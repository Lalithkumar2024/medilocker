import axios from 'axios';

const API_BASE_URL = 'https://44.210.125.81/schedule';

export const addScheduleTime = (doctorId, scheduleData) => {
  return axios.post(`${API_BASE_URL}/add/${doctorId}`, scheduleData);
};

export const getScheduleTime = (scheduleId) => {
  return axios.get(`${API_BASE_URL}/get/${scheduleId}`);
};

export const getAllScheduleTimes = () => {
  return axios.get(`${API_BASE_URL}/getAll`);
};
