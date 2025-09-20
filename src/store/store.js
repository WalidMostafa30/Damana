import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileSlice";
import logoutModalReducer from "./modalsSlice/logoutModalSlice";
import languageReducer from "./languageSlice/languageSlice";
import appConfigReducer, {
  fetchApplicationConfiguration,
} from "./appConfig/appConfigSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    logoutModal: logoutModalReducer,
    language: languageReducer,
    appConfig: appConfigReducer,
  },
});

// Fetch application configuration 
store.dispatch(fetchApplicationConfiguration());
