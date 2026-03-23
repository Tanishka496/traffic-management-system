import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "/drivers";

export const getDrivers = () => axios.get(API);

export const addDriver = (driver) => axios.post(API, driver);