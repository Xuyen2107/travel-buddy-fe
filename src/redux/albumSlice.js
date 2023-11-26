import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
   name: "album",

   initialState: {
      fetchDataAlbum: false,
   },

   reducers: {
      setFetchDataAlbum: (state) => {
         state.fetchDataAlbum = true;
      },
   },
});

export const { setFetchDataAlbum } = albumSlice.actions;
export const selectFetchDataAlbum = (state) => state.album;

export default albumSlice.reducer;
