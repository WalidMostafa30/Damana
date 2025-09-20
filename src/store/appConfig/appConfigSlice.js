import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApplicationConfiguration } from "../../services/staticDataService";

// Async thunk
export const fetchApplicationConfiguration = createAsyncThunk(
  "appConfig/fetchApplicationConfiguration",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getApplicationConfiguration();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.error_msg || "Failed to load config"
      );
    }
  }
);

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicationConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationConfiguration.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApplicationConfiguration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default appConfigSlice.reducer;
