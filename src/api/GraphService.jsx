import axios from "axios";

const API_BASE_URL =  "http://54.204.207.122:8080/graph";

export const addData = (patientId,graphData) => {
    return axios.post(`${API_BASE_URL}/add/${patientId}`,graphData);
};

export const getGraphDataById = (graphId) => {
    return axios.get(`${API_BASE_URL}/get/${graphId}`);
};

export const getALLGraphData = () => {
    return axios.get(`${API_BASE_URL}/getAll`);
};