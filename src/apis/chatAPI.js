import { axiosInstance } from "./axiosInstance";

export const chatAPI = {
   createChat: (values) =>
      axiosInstance.post("/chat/", values, {
         headers: {
            "Content-Type": "application/json", // Set the Content-Type to application/json
         },
      }),
   findUserChats: (userId) => axiosInstance.get(`/chat/${userId}`),
   findChat: (firstId, secondId) => axiosInstance.get(`/find/${firstId}/${secondId}`),
};