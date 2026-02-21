import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const API = axios.create({
  baseURL: `${BASE_URL}/auth`,
});

export const loginUser = (data) => API.post("/login", data);

export const signupUser = (data) => API.post("/signup", data);
