import axios from "axios";

const API_BASE_URL = 'https://medilocker-rmo3.onrender.com/users';

export const registerUser = (userData) => {
  return axios.post(`${API_BASE_URL}/addUser`, userData);
};

export const loginUser = (loginData) => {
  return axios.post(`${API_BASE_URL}/login`, loginData);
};

export const emergencyLogin = (data) => {
  return axios.post(`${API_BASE_URL}/emergenceLogin`, data);
};

export const getUserById = (userId) => {
  return axios.get(`${API_BASE_URL}/getUser/${userId}`);
};

export const getAllUsers = () => {
  return axios.get(`${API_BASE_URL}/getAllUser`);
};

export const updateUser = (userId, userData) => {
  return axios.put(`${API_BASE_URL}/updateUser/${userId}`, userData);
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_BASE_URL}/deleteUser/${userId}`);
};

export const forgetPassword = async (data) => {
  return await axios.put(`${API_BASE_URL}/forgetpassword`, data);
};