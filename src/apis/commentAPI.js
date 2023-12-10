import { axiosInstance } from "./axiosInstance";

const commentAPI = {
   createComment: (postId, values) => axiosInstance.post(`/comment/create/${postId}`, values),
   getCommentsByPost: (postId, page, limit) => axiosInstance.get(`/comment/all-by-post/${postId}?page=${page}&limit=${limit}`),
   getNumberComments: (postId) => axiosInstance.get(`/comment/number-comment/${postId}`),
   updateComment: (commentId, values) => axiosInstance.put(`/comment/update/${commentId}`, values),
   removeComment: (commentId) => axiosInstance.put(`/comment/remove/${commentId}`),
};

export default commentAPI;
