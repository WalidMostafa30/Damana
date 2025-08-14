import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../store/store";
import { openLogoutModal } from "../store/modalsSlice/logoutModalSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": import.meta.env.VITE_X_API_KEY,
    Accept: "application/json",
    "X-Nonce": import.meta.env.VITE_X_NONCE,
    "X-Signature": import.meta.env.VITE_X_SIGNATURE,
    lang: "en",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401 || err.response?.status === 403) {
//       Cookies.remove("token");
//       store.dispatch(openLogoutModal());
//     }
//     return Promise.reject(err);
//   }
// );

export default api;
