import { createSlice } from "@reduxjs/toolkit";

const vacationSlice = createSlice({
   name: "vacation",

   initialState: {
      fetchDataVacationSlice: false,
   },

   reducers: {
      setFetchDataVacation: (state) => {
         state.fetchDataVacationSlice = true;
      },
   },
});

export const { setFetchDataVacation } = vacationSlice.actions;
export const selectFetchDataVacation = (state) => state.vacation;

export default vacationSlice.reducer;
