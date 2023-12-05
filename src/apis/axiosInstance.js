import axios from "axios";
// import { io } from "socket.io-client";
const accessToken = localStorage.getItem("accessToken") === null ? null : JSON.parse(localStorage.getItem("accessToken"));

export const axiosInstance = axios.create({
   baseURL: import.meta.env.REACT_APP_BASE_API || "http://localhost:3001/api/v1",
   timeout: 30000,
   headers: {
      "x-access-token": accessToken,
   },
});

// export const socket = io("http://localhost:3001");
