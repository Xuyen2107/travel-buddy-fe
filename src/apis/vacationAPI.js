import { axiosInstance } from "./axiosInstance";

const vacationAPI = {
   create: (values) =>
      axiosInstance.post("/vacation/create", values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   getSingle: (vacationId) => axiosInstance.get(`/vacation/single/${vacationId}`),
   getAll: () => axiosInstance.get("/vacation/all?page=1"),
   getAllHaveUser: () => axiosInstance.get("/vacation/all-have-user"),
   getAllByUser: () => axiosInstance.get("/vacation/all-by-user"),
   update: (vacationId, values) =>
      axiosInstance.put(`/vacation/update/${vacationId}`, values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   remove: (vacationId) => axiosInstance.delete(`/vacation/remove/${vacationId}`),
   like: (vacationId) => axiosInstance.put(`/vacation/like/${vacationId}`),
};

export default vacationAPI;
