import axios from "axios";

const accessToken = localStorage.getItem("accessToken") !== null ? JSON.parse(localStorage.getItem("accessToken")) : null;

const axiosInstance = axios.create({
   baseURL: import.meta.env.REACT_APP_BASE_API || "http://localhost:3001/api/v1",
   timeout: 300000,
   headers: {
      "x-access-token": accessToken,
   },
});

export const authAPI = {
   login: (values) => axiosInstance.post("/auth/login", values),
   register: (values) => axiosInstance.post("/auth/register", values),
   authInfo: (accessToken) =>
      axiosInstance.get("/auth/profile", {
         headers: {
            "x-access-token": accessToken,
         },
      }),
   uploadAvatar: (value) =>
      axiosInstance.put("/user/upload-avatar", value, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
};

export const userAPI = {
   getSingle: (userId) => axiosInstance.get(`/user/profile/${userId}`),
   update: (userId, value) =>
      axiosInstance.put(`/user/:${userId}`, value, {
         headers: {
            "Content-Type": "application/json",
         },
      }),
   uploadAvatar: (userId, value) =>
      axiosInstance.put(`/user/upload-avatar/${userId}`, value, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   updatePassword: (userId, value) => axiosInstance.put(`/user/update-password/${userId}`, value),
   getFriends: (userId) => axiosInstance.get(`/user/friends/${userId}`),
   getSingleFriend: (userId) => axiosInstance.get(`/user/friend/${userId}`),
   sendFriend: (userId) => axiosInstance.post(`/user/send-friend/${userId}`),
   acceptFriend: (userId) => axiosInstance.put(`/user/accept-friend/${userId}`),
   removeFriend: (userId) => axiosInstance.put(`/user/remove-friend/${userId}`),
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
   remove: (vacationId) => axiosInstance.delete(`/vacation/${vacationId}/remove`),
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
   remove: (postId) => axiosInstance.delete(`/post/${postId}/delete`),
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
   getAll: () => axiosInstance.get("/album/all"),
   getAllByUser: () => axiosInstance.get("/album/all-by-user"),
   update: (albumId, values) =>
      axiosInstance.put(`/album/${albumId}/update`, values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   remove: (albumId) => axiosInstance.delete(`/album/${albumId}/delete`),
};
