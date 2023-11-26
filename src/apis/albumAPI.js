import { axiosInstance } from "./axiosInstance";

export const albumAPI = {
   create: (values) =>
      axiosInstance.post("/album/create", values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   getSingle: (albumId) => axiosInstance.get(`/album/${albumId}`),
   getAll: () => axiosInstance.get("/album/all"),
   getAllByUser: () => axiosInstance.get("/album/all-by-user"),
   update: (albumId, values) =>
      axiosInstance.put(`/album/update/${albumId}`, values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   remove: (albumId) => axiosInstance.delete(`/album/delete/${albumId}`),
};

const 
