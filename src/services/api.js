import axios from "axios";

const axiosInstance = axios.create({
   baseURL: import.meta.env.REACT_APP_BASE_API || "https://travel-buddy-be.onrender.com/api/v1",
   timeout: 30000,
   headers: {
      "x-access-token": localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")) : undefined,
   },
});

export const authAPI = {
   login: (values) => axiosInstance.post("/auth/login", values),
   register: (values) => axiosInstance.post("/auth/register", values),
   authInfo: (values) =>
      axiosInstance.get("/auth/profile", {
         headers: {
            "x-access-token": values,
         },
      }),
};

export const vacationAPI = {
   create: (values) =>
      axiosInstance.post("/vacation/create", values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   getSingle: (vacationId) => axiosInstance.get(`/vacation/${vacationId}`),
   getAll: () => axiosInstance.get("/vacation/all"),
   update: (vacationId, values) =>
      axiosInstance.put(`/vacation/${vacationId}/update`, values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   remove: (vacationId) => axiosInstance.put(`/vacation/${vacationId}/remove`),
};

export const postAPI = {
   create: (values) =>
      axiosInstance.post("/post/create", values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   getSingle: (postId) => axiosInstance.get(`/post/${postId}`),
   getAll: () => axiosInstance.get("post/all"),
   getAllByUser: () => axiosInstance.get("/post/all-by-user"),
   update: (postId, values) =>
      axiosInstance.put(`/post/${postId}/update`, values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   remove: (postId) => axiosInstance.put(`/post/${postId}/delete`),
   like: (postId) => axiosInstance.put(`/post/${postId}/like`),
};

export const albumAPI = {
   create: (values) =>
      axiosInstance.post("/album/create", values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   getSingle: (albumId) => axiosInstance.get(`/album/${albumId}`),
   getAll: () => axiosInstance.get("album/all"),
   getAllByUser: () => axiosInstance.get("/album/all-by-user"),
   update: (albumId, values) =>
      axiosInstance.put(`/album/${albumId}/update`, values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   remove: (albumId) => axiosInstance.put(`/album/${albumId}/delete`),
};
