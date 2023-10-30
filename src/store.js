import { configureStore } from "@reduxjs/toolkit";
import { patientSlice } from "./Slices/patientSlice";
import { wardSlice } from "./Slices/wardSlice";

export const store = configureStore({
  reducer: {
    patients: patientSlice.reducer,
    wards: wardSlice.reducer
  }
});
