import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import albumSlice from "./albumSlice";

const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      album: albumSlice.reducer,
   },
});


export default store;
