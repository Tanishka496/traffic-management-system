import axios from "axios";

export const login = (username, password) =>
  axios.post("/api/auth/login", { username, password });

export const register = (username, password, fullName) =>
  axios.post("/api/auth/register", {
    username,
    password,
    full_name: fullName,
  });
