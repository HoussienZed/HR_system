import axios from "axios";

const token = localStorage.getItem("token");

const axiosBaseUrl = axios.create({
  // baseURL: "http://localhost:8000/api/v1",
  baseURL: "http://15.188.49.159/hr-server/api/v1",

  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosBaseUrl;
