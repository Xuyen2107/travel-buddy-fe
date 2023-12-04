import { axiosInstance } from "./axiosInstance";

const replyCommentAPI = {
   createComment: (commentId, values) => axiosInstance.post(`/reply-comment/create/${commentId}`, values),
   updateComment: (commentId, values) => axiosInstance.put(`/reply-comment/update/${commentId}`, values),
   removeComment: (commentId) => axiosInstance.delete(`/reply-comment/remove/${commentId}`),
};

export default replyCommentAPI;
