import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
   name: "album",

   initialState: {
      allAlbums: null,
      albumUser: null,
      album: null,
   },

   reducers: {
      getSingleAlbum: (state, action) => {
         state.album = action.payload;
      },

      getAllAlbums: (state, action) => {
         state.allAlbums = action.payload;
      },

      getAllAlbumsUser: (state, action) => {
         state.albumUser = action.payload;
      },

      updateAlbum: (state, action) => {
         const updatedAlbum = action.payload.album;

         state.album = updatedAlbum;

         [state.allAlbums, state.albumUser].forEach((array, index) => {
            const updatedArray = array.map((item) => (item._id === updatedAlbum._id ? updatedAlbum : item));

            if (index === 0) {
               state.allAlbums = updatedArray;
            } else {
               state.albumUser = updatedArray;
            }
         });
      },

      deleteAlbum: (state, action) => {
         state.allAlbums = state.allAlbums.filter((album) => album._id !== action.payload);

         state.albumUser = state.albumUser.filter((album) => album._id !== action.payload);

         if (state.album && state.album._id === action.payload) {
            state.album = null;
         }
      },
   },
});

export const { getSingleAlbum, getAllAlbums, getAllAlbumsUser, updateAlbum, deleteAlbum } = albumSlice.actions;

export default albumSlice.reducer;
