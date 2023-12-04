import { axiosInstance } from "./axiosInstance";

const authAPI = {
   login: (values) => axiosInstance.post("/auth/login", values),
   register: (values) => axiosInstance.post("/auth/register", values),
   authInfo: (accessToken) =>
      axiosInstance.get("/auth/profile", {
         headers: {
            "x-access-token": accessToken,
         },
      }),
};

export default authAPI;
