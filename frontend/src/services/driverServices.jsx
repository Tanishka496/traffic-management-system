import axios from "axios";

const API = "/api/drivers";

export const getDrivers = () => axios.get(API);

export const addDriver = (driver) => axios.post(API, driver);