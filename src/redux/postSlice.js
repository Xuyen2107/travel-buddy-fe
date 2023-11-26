import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
   name: "post",

   initialState: {
      fetchDataPost: false,
   },

   reducers: {
      setFetchDataPost: (state) => {
         state.fetchDataPost = true;
      },
   },
});

export const { setFetchDataPost } = postSlice.actions;
export const selectFetchDataPost = (state) => state.post;

export default postSlice.reducer;
