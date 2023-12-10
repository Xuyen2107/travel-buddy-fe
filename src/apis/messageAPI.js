import { axiosInstance } from "./axiosInstance";

const messageAPI = {
   createMessage: (values) =>
      axiosInstance.post(`/messages/create`, values, {
         header: {
            "Content-Type": "application/json",
         },
      }),
   getAllMessages: (chatId) => axiosInstance.get(`/messages/get-all-by-chat/${chatId}`),
};

export default messageAPI;
