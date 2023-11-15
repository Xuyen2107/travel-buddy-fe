import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",

   initialState: {
      loading: true,
      token: localStorage.getItem("accessToken") === null ? null : JSON.parse(localStorage.getItem("accessToken")),
      user: null,
      profileUser: null,
      upload: false,
   },

   reducers: {
      login: (state, action) => {
         state.user = action.payload;
         state.loading = false;
      },

      logout: (state) => {
         state.token = null;
         state.user = null;
         state.loading = false;
         state.profileUser = null;
         localStorage.removeItem("accessToken");
      },

      setFriendUser: (state, action) => {
         const user = action.payload;
         if (state.user) {
            state.user.friends = user.friends;
         } else {
            console.error("Không tìm thấy user");
         }
      },

      setFriendProfileUser: (state, action) => {
         const profileUser = action.payload;
         if (state.profileUser) {
            state.profileUser.friends = profileUser.friends;
         } else {
            console.error("Không tìm thấy user");
         }
      },

      setAvatarUser: (state, action) => {
         if (state.user) {
            state.user.avatar = action.payload.avatar;
         } else {
            console.error("Không tìm thấy user");
         }
      },

      updateUser: (state, action) => {
         state.user = action.payload;
      },

      uploadStart: (state) => {
         state.upload = true;
      },

      uploadFinish: (state) => {
         state.upload = false;
      },
   },
});

export const { login, logout, uploadStart, uploadFinish, setAvatarUser, setFriendProfileUser, setFriendUser, updateUser } = authSlice.actions;

export default authSlice.reducer;
