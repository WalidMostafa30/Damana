import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import Cookies from "js-cookie";

export const getProfileAct = createAsyncThunk(
  "profile/getProfileAct",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/get-profile");

      if (data?.data?.token) {
        Cookies.set("token", data.data.token);
      }

      return data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.error_msg || "حدث خطأ أثناء جلب البيانات"
      );
    }
  }
);
