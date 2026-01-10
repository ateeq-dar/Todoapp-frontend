import axios from "axios";
import { getToken } from "./utils/auth";

const API = axios.create({
  baseURL: "https://todoapp-backend-x5vo.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
