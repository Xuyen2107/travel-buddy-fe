import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
   name: "album",

   initialState: {
      albums: [],
      status: "idle",
      error: null,
   },

   reducers: {
      addAlbum: (state, action) => {
         
         state.albums.push(action.payload);
         
      },
      
      removeAlbum: (state, action) => {
         state.albums = state.albums.filter((album) => album.id !== action.payload);
      },

   },
});
export const { addAlbum, removeAlbum } = albumSlice.actions;
export default albumSlice;
