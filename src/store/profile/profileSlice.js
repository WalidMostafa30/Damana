import { createSlice } from "@reduxjs/toolkit";
import { getProfileAct } from "./profileAction";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileAct.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfileAct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل في جلب البيانات";
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
