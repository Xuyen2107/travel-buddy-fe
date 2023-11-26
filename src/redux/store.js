import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import albumSlice from "./albumSlice";
import themeSlice from "./themeSlice";
import vacationSlice from "./vacationSlice";
import postSlice from "./postSlice";

const store = configureStore({
   reducer: {
      theme: themeSlice,
      auth: authSlice,
      vacation: vacationSlice,
      post: postSlice,
      album: albumSlice,
   },
});

export default store;
