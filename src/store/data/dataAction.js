import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk(
  "data/getData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/");

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
