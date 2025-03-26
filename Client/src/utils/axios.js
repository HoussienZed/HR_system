import axios from "axios";

const token = localStorage.getItem("token");

const axiosBaseUrl = axios.create({
  // baseURL: "http://localhost:8000/api/v1",
  baseURL: "http://52.47.74.242/snippet-server/api/v1",
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosBaseUrl;
