import { createSlice } from "@reduxjs/toolkit";

const logoutModalSlice = createSlice({
  name: "logoutModal",
  initialState: { isOpen: false },
  reducers: {
    openLogoutModal: (state) => {
      state.isOpen = true;
    },
    closeLogoutModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openLogoutModal, closeLogoutModal } = logoutModalSlice.actions;
export default logoutModalSlice.reducer;
