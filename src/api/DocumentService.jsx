import axios from 'axios';

const API_BASE_URL = 'http://54.204.207.122:8080/document';

export const uploadDocument = (patientId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_BASE_URL}/upload/${patientId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDocument = (documentId) => {
    return axios.get(`${API_BASE_URL}/getDocument/${documentId}`);
};

export const getAllDocuments = () => {
    return axios.get(`${API_BASE_URL}/getAllDocument`);
};

export const downloadDocument = (fileName) => {
    return axios.get(`${API_BASE_URL}/download/${fileName}`, {
    responseType: 'blob',
  });
};

export const shareDocument = (fileName) => {
    return axios.get(`${API_BASE_URL}/share/${fileName}`);
};
