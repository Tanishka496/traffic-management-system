import axios from "axios";

const PAYMENT_API = "/api/payments";
const DASHBOARD_API = "/api/dashboard/summary";

export const addPayment = (payload) => axios.post(PAYMENT_API, payload);
export const getPayments = () => axios.get(PAYMENT_API);
export const getDashboardSummary = () => axios.get(DASHBOARD_API);
