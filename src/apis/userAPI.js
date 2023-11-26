import { axiosInstance } from "./axiosInstance";

export const userAPI = {
   getSingle: (userId) => axiosInstance.get(`/user/profile/${userId}`),
   update: (value) =>
      axiosInstance.put("/user/update", value, {
         headers: {
            "Content-Type": "application/json",
         },
      }),
   uploadAvatar: (value) =>
      axiosInstance.put("/user/upload-avatar/", value, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }),
   updatePassword: (value) => axiosInstance.put("/user/update-password/", value),
   getFriends: (userId) => axiosInstance.get(`/user/friends/${userId}`),
   getSingleFriend: (userId) => axiosInstance.get(`/user/friend/${userId}`),
   sendFriend: (userId) => axiosInstance.post(`/user/send-friend/${userId}`),
   acceptFriend: (userId) => axiosInstance.put(`/user/accept-friend/${userId}`),
   removeFriend: (userId) => axiosInstance.put(`/user/remove-friend/${userId}`),
};
