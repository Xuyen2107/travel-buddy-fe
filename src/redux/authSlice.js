import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",

   initialState: {
      user: null,
      isLogin: localStorage.getItem("accessToken") === null ? false : true,
      loading: false,
      error: null,
   },

   reducers: {
      loginStart: (state) => {
         return {
            ...state,
            user: null,
            isLogin: false,
            loading: true,
            error: null,
         };
      },

      loginSuccess: (state, action) => {
         return {
            ...state,
            user: action.payload,
            isLogin: true,
            loading: false,
            error: null,
         };
      },

      loginFailure: (state, action) => {
         return {
            ...state,
            user: null,
            isLogin: false,
            loading: false,
            error: action.payload,
         };
      },

      logout: (state) => {
         return {
            ...state,
            user: null,
            isLogin: false,
            loading: false,
            error: null,
         };
      },
   },
});

export const { loginStart, loginSuccess, loginFailure, registerSuccess, logout } = authSlice.actions;

export default authSlice;
