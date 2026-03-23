import axios from "axios";

const API = "/api/challans";

export const addChallan = (payload) => axios.post(API, payload);
export const getChallans = () => axios.get(API);
