import axios from "axios";

const API_BASE_URL =  "https://44.210.125.81/graph";

export const addData = (patientId,graphData) => {
    return axios.post(`${API_BASE_URL}/add/${patientId}`,graphData);
};

export const getGraphDataById = (graphId) => {
    return axios.get(`${API_BASE_URL}/get/${graphId}`);
};

export const getALLGraphData = () => {
    return axios.get(`${API_BASE_URL}/getAll`);
};