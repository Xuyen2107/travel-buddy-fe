import { createSlice } from "@reduxjs/toolkit";

const vacationSlice = createSlice({
   name: "vacation",

   initialState: {
      allVacations: null,
      vacationUser: null,
      vacation: null,
   },

   reducers: {
      getSingleVacation: (state, action) => {
         state.vacation = action.payload;
      },

      getAllVacations: (state, action) => {
         state.allVacations = action.payload;
      },

      getAllVacationsUser: (state, action) => {
         state.vacationUser = action.payload;
      },

      updateVacation: (state, action) => {
         const updatedVacation = action.payload;

         state.vacation = updatedVacation;

         [state.allVacations, state.vacationUser].forEach((array, index) => {
            const updatedArray = array.map((item) => (item._id === updatedVacation._id ? updatedVacation : item));

            if (index === 0) {
               state.allVacations = updatedArray;
            } else {
               state.vacationUser = updatedArray;
            }
         });
      },

      deleteVacation: (state, action) => {
         state.allVacations = state.allVacations.filter((vacation) => vacation._id !== action.payload);

         state.vacationUser = state.vacationUser.filter((vacation) => vacation._id !== action.payload);

         if (state.vacation && state.vacation._id === action.payload) {
            state.vacation = null;
         }
      },
   },
});

export const { getSingleVacation, getAllVacations, getAllVacationsUser, updateVacation, deleteVacation } = vacationSlice.actions;

export default vacationSlice.reducer;
