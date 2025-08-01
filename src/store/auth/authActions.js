import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const loginAct = createAsyncThunk(
  "auth/loginAct",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", formData, {
        headers: {
          "X-API-Key":
            "771c47fb41-18684646a5-67fa2a8d10-95f8dbe30b-31cb9b261e-4ef52c9e4b",
          Accept: "application/json",
          "X-Nonce": "3f0e04dc37a4046b1739024107062",
          "X-Signature":
            "581f6f2fbd904486205a474a6510c028f0e0d6c7b3f2c645f1ef4edb91abb2eb",
        },
      });

      console.log("Login Response Data:", data.data);

      if (data.data?.token) {
        Cookies.set("token", data.data.token);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error_msg);
    }
  }
);
