import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
   name: "theme",

   initialState: {
      darkMode: localStorage.getItem("darkMode") !== null ? JSON.parse(localStorage.getItem("darkMode")) : "light",
   },

   reducers: {
      toggleTheme: (state) => {
         state.darkMode = state.darkMode === "light" ? "dark" : "light";
         localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
      },
   },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
