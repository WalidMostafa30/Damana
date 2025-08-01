import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginAct } from "./authActions";

const initialState = {
  user: {},
  loading: false,
  error: null,
  token: Cookies.get("token") || null, // تحميل التوكن من الكوكيز لو موجود
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.token = null;
      Cookies.remove("token"); // مسح التوكن من الكوكيز
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAct.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || {};
        state.token = action.payload.token || null;
      })
      .addCase(loginAct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
