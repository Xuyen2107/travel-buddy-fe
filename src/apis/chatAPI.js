import { axiosInstance } from "./axiosInstance";

const chatAPI = {
   createChat: (userChat) => axiosInstance.post(`/chat/create/${userChat}`),
   findUserChats: () => axiosInstance.get("/chat/chat-by-user"),
   findChat: (userChat) => axiosInstance.get(`/chat/find/${userChat}`),
   findByChat: (userChat) => axiosInstance.get(`/chat/find-Chat/${userChat}`),
};

export default chatAPI;
