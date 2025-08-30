import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";

const initialState = {
  lang: localStorage.getItem("lang") || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
      i18n.changeLanguage(action.payload); // يغير لغة i18next
      localStorage.setItem("lang", action.payload); // يخزن اللغة
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
