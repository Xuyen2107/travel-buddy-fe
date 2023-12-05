import axios from "axios";
// import { io } from "socket.io-client";
const accessToken = localStorage.getItem("accessToken") === "undefined" || null ? null : JSON.parse(localStorage.getItem("accessToken"));
export const axiosInstance = axios.create({
   baseURL:
      // "https://travel-buddy-be.onrender.com/api/v1" ||
      "http://localhost:3001/api/v1",
   timeout: 30000,
   headers: {
      "x-access-token": accessToken,
   },
});

// export const socket = io("http://localhost:3001");
