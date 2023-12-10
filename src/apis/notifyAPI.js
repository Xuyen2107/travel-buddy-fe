import { axiosInstance } from "./axiosInstance";

const notifyAPI = {
   getAllNotify: () => axiosInstance.get("/notify/all-for-recipient"),
};

export default notifyAPI;
