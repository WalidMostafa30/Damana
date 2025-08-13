import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileSlice";
import logoutModalReducer from "./modalsSlice/logoutModalSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    logoutModal: logoutModalReducer,
  },
});
