import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",

   initialState: {
      loading: true,
      error: null,
      user: null,
   },

   reducers: {
      loginStart: (state) => {
         return {
            ...state,
            loading: true,
            error: null,
            user: null,
         };
      },

      loginSuccess: (state, action) => {
         return {
            ...state,
            loading: false,
            error: null,
            user: action.payload,
         };
      },

      loginFailure: (state, action) => {
         return {
            ...state,
            loading: false,
            error: action.payload,
            user: null,
         };
      },

      logout: (state) => {
         return {
            ...state,
            user: null,
            loading: false,
            error: null,
         };
      },
   },
});

export const { loginStart, loginSuccess, loginFailure, registerSuccess, logout } = authSlice.actions;

export default authSlice;
