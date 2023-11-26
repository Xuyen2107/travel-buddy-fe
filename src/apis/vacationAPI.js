import { axiosInstance } from "./axiosInstance";

export const vacationAPI = {
   create: (values) =>
      axiosInstance.post("/vacation/create", values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   getSingle: (vacationId) => axiosInstance.get(`/vacation/single/${vacationId}`),
   getAll: () => axiosInstance.get("/vacation/all?page=1"),
   getAllOfUser: () => axiosInstance.get("/vacation/all-user"),
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
