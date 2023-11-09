import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import albumSlice from "./albumSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      album: albumSlice.reducer,
      theme: themeSlice.reducer,
   },
});

export default store;
