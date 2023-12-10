import { axiosInstance } from "./axiosInstance";

const replyCommentAPI = {
   createComment: (commentId, values) => axiosInstance.post(`/reply-comment/create/${commentId}`, values),
   getCommentsById: (commentId, page, limit) => axiosInstance.get(`/reply-comment/all-by-comment/${commentId}?page=${page}&limit=${limit}`),
   updateComment: (commentId, values) => axiosInstance.put(`/reply-comment/update/${commentId}`, values),
   removeComment: (commentId) => axiosInstance.delete(`/reply-comment/remove/${commentId}`),
};

export default replyCommentAPI;
