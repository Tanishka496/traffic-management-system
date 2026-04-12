import axios from "axios";

const API = "/api/officers";

export const getOfficers = () => axios.get(API);
