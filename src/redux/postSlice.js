import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
   name: "post",

   initialState: {
      allPosts: null,
      postUser: null,
      post: null,
   },

   reducers: {
      getSinglePost: (state, action) => {
         state.post = action.payload;
      },

      getAllPosts: (state, action) => {
         state.allPosts = action.payload;
      },

      getAllPostsUser: (state, action) => {
         state.postUser = action.payload;
      },

      updatePost: (state, action) => {
         const updatedPost = action.payload.post;

         state.post = updatedPost;

         [state.allPosts, state.postUser].forEach((array, index) => {
            const updatedArray = array.map((item) => (item._id === updatedPost._id ? updatedPost : item));

            if (index === 0) {
               state.allPosts = updatedArray;
            } else {
               state.postUser = updatedArray;
            }
         });
      },

      deletePost: (state, action) => {
         state.allPosts = state.allPosts.filter((post) => post._id !== action.payload);

         state.postUser = state.postUser.filter((post) => post._id !== action.payload);

         if (state.post && state.post._id === action.payload) {
            state.post = null;
         }
      },
   },
});

export const { getSinglePost, getAllPosts, getAllPostsUser, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
