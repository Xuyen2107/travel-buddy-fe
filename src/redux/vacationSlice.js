import { createSlice } from "@reduxjs/toolkit";

const vacationSlice = createSlice({
   name: "vacation",

   initialState: {
      vacation: null,
      handleLike: false,
      handleCreate: false,
      handleUpdate: false,
      handleRemove: false,
   },

   reducers: {
      likeStart: (state, actions) => {
         state.handleLike = true;
         state.vacation = actions.payload;
      },

      likeFinish: (state) => {
         state.handleLike = false;
         state.vacation = null;
      },

      createStart: (state, actions) => {
         state.handleCreate = true;
         state.vacation = actions.payload;
      },

      createFinish: (state) => {
         state.handleCreate = false;
         state.vacation = null;
      },

      updateStart: (state, actions) => {
         state.handleUpdate = true;
         state.vacation = actions.payload;
      },

      updateFinish: (state) => {
         state.handleUpdate = false;
         state.vacation = null;
      },

      removeStart: (state, actions) => {
         state.handleRemove = true;
         state.vacation = actions.payload;
      },

      removeFinish: (state) => {
         state.handleRemove = false;
         state.vacation = null;
      },
   },
});

export const { likeStart, likeFinish, createStart, createFinish, updateStart, updateFinish, removeStart, removeFinish } = vacationSlice.actions;

export default vacationSlice.reducer;
