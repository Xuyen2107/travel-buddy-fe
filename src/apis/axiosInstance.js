import axios from "axios";

export const axiosInstance = axios.create({
   baseURL:
      // "https://travel-buddy-be.onrender.com/api/v1" ||
      "http://localhost:3001/api/v1",
   timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
   const accessToken = JSON.parse(localStorage.getItem("accessToken"));

   if (accessToken) {
      config.headers["x-access-token"] = accessToken;
   }

   return config;
});
