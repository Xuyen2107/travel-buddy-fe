import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",

   initialState: {
      loading: true,
      isLogin: false,
      userLogin: null,
      isUploadingAvatar: false,
      isUpdatingUser: false,
   },
   reducers: {
      login: (state, action) => {
         state.loading = false;
         state.isLogin = true;
         state.userLogin = action.payload;
      },

      logout: (state) => {
         state.loading = false;
         state.isLogin = false;
         state.userLogin = null;
      },

      updateUser: (state, action) => {
         state.userLogin = action.payload;
      },

      startUploadAvatar: (state) => {
         state.isUploadingAvatar = true;
      },

      finishUploadAvatar: (state) => {
         state.isUploadingAvatar = false;
      },

      startUpdateUser: (state) => {
         state.isUpdatingUser = true;
      },

      finishUpdateUser: (state) => {
         state.isUpdatingUser = false;
      },
   },
});

export const { login, logout, updateUser, startUploadAvatar, finishUploadAvatar, startUpdateUser, finishUpdateUser } = authSlice.actions;

export default authSlice.reducer;
