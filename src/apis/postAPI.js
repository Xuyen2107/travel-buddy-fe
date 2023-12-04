import { axiosInstance } from "./axiosInstance";

const postAPI = {
   create: (values) =>
      axiosInstance.post("/post/create", values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   getSingle: (postId) => axiosInstance.get(`/post/single/${postId}`),
   getAll: () => axiosInstance.get("post/all"),
   getAllByUser: (userId) => axiosInstance.get(`/post/all-by-user/${userId}`),
   getAllByMilestone: (milestoneId) => axiosInstance.get(`/post/by-milestone/${milestoneId}`),
   update: (postId, values) =>
      axiosInstance.put(`/post/update/${postId}`, values, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   remove: (postId) => axiosInstance.delete(`/post/delete/${postId}`),
   like: (postId) => axiosInstance.put(`/post/${postId}/like`),
};

export default postAPI;
