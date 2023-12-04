import { axiosInstance } from "./axiosInstance";

const commentAPI = {
   createComment: (postId, values) => axiosInstance.post(`/comment/create/${postId}`, values),
   updateComment: (commentId, values) => axiosInstance.put(`/comment/update/${commentId}`, values),
   removeComment: (commentId) => axiosInstance.put(`/comment/remove/${commentId}`),
};

export default commentAPI;
