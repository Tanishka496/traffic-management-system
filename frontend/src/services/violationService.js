import axios from "axios";

const API = "http://localhost:5000/violations";

export const getViolations = () => axios.get(API);
export const addViolation = (data) => axios.post(API, data);
export const updateViolation = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteViolation = (id) => axios.delete(`${API}/${id}`);