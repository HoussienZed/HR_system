import axios from "axios";

const token = localStorage.getItem("token");

const axiosBaseUrl = axios.create({
  baseURL: "http://13.37.211.34/hr-server/api/v1",

  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosBaseUrl;