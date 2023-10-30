import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    try {
      const response = await fetch(
        "https://patient-management-app.omkarpatil20.repl.co/patients"
      );
      const result = await response.json();
      return result.patients;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (newPatientData) => {
    try {
      const response = await fetch(
        "https://patient-management-app.omkarpatil20.repl.co/patients",
        {
          method: "POST",
          body: JSON.stringify(newPatientData),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const result = await response.json();
      toast.success("Patient added Successfully");

      return result.patient;
    } catch (error) {
      toast.error("Failed to add new patient");
      console.error(error);
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async ({ _id, newPatient }) => {
    try {
      const response = await fetch(
        `https://patient-management-app.omkarpatil20.repl.co/patients/${_id}`,
        {
          method: "PUT",
          body: JSON.stringify(newPatient),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const result = await response.json();
      toast.success("Patient Details updated Successfully");
      return result.patients;
    } catch (error) {
      toast.error("Failed to update patient details");

      console.error(error);
    }
  }
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id) => {
    try {
      const response = await fetch(
        `https://patient-management-app.omkarpatil20.repl.co/patients/${id}`,
        {
          method: "DELETE"
        }
      );
      const result = await response.json();
      toast.success("Patient deleted Successfully");

      return result.patients;
    } catch (error) {
      toast.error("Failed to delete patient");

      console.error(error);
    }
  }
);

const initialState = {
  patients: [],
  status: "idle",
  error: null
};

export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.status = "idle";
      state.patients = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPatients.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(addPatient.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.status = "idle";
      state.patients.push(action.payload);
      state.error = null;
    });
    builder.addCase(addPatient.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(deletePatient.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.status = "idle";
      state.patients = action.payload;
      state.error = null;
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(updatePatient.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updatePatient.fulfilled, (state, action) => {
      state.status = "idle";
      state.patients = action.payload;
      state.error = null;
    });
    builder.addCase(updatePatient.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
  }
});
