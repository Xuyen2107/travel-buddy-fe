import axios from "axios";

const accessToken = localStorage.getItem("accessToken") === null ? null : JSON.parse(localStorage.getItem("accessToken"));

export const axiosInstance = axios.create({
   baseURL: import.meta.env.REACT_APP_BASE_API || "https://travel-buddy-be.onrender.com/api/v1" || "http://localhost:3001/api/v1",
   timeout: 30000,
   headers: {
      "x-access-token": accessToken,
   },
});
