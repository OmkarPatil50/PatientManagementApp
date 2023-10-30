import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  try {
    const response = await fetch(
      "https://patient-management-app.omkarpatil20.repl.co/wards"
    );
    const result = await response.json();
    return result.wards;
  } catch (error) {
    console.error(error);
  }
});

export const addWard = createAsyncThunk(
  "wards/addWard",
  async (newWardData) => {
    try {
      const response = await fetch(
        "https://patient-management-app.omkarpatil20.repl.co/wards",
        {
          method: "POST",
          body: JSON.stringify(newWardData),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const result = await response.json();
      toast.success("Ward added Successfully");

      return result.ward;
    } catch (error) {
      toast.error("Failed to add new ward");

      console.error(error);
    }
  }
);

export const updateWard = createAsyncThunk(
  "wards/updateWard",
  async ({ _id: id, newWard }) => {
    try {
      const response = await fetch(
        `https://patient-management-app.omkarpatil20.repl.co/wards/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(newWard),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const result = await response.json();
      toast.success("Ward Details Updated Successfully");

      return result.wards;
    } catch (error) {
      toast.error("Ward Details Updation failed");

      console.error(error);
    }
  }
);

export const deleteWard = createAsyncThunk("wards/deleteWard", async (id) => {
  try {
    const response = await fetch(
      `https://patient-management-app.omkarpatil20.repl.co/wards/${id}`,
      {
        method: "DELETE"
      }
    );
    const result = await response.json();
    toast.success("Ward deleted Successfully");

    return result.wards;
  } catch (error) {
    toast.error("Ward deletion failed");

    console.error(error);
  }
});

const initialState = {
  wards: [],
  status: "idle",
  error: null
};

export const wardSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWards.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchWards.fulfilled, (state, action) => {
      state.status = "idle";
      state.wards = action.payload;
      state.error = null;
    });
    builder.addCase(fetchWards.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(addWard.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addWard.fulfilled, (state, action) => {
      state.status = "idle";
      state.wards.push(action.payload);
      state.error = null;
    });
    builder.addCase(addWard.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(deleteWard.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteWard.fulfilled, (state, action) => {
      state.status = "idle";
      state.wards = action.payload;
      state.error = null;
    });
    builder.addCase(deleteWard.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(updateWard.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateWard.fulfilled, (state, action) => {
      state.status = "idle";
      state.wards = action.payload;
      state.error = null;
    });
    builder.addCase(updateWard.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
  }
});
