import axios from "axios";

const API = "/api/vehicles";

export const getVehicles = () => axios.get(API);
export const addVehicle = (data) => axios.post(API, data);
