import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../store/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": import.meta.env.VITE_X_API_KEY,
    Accept: "application/json",
    "X-Nonce": import.meta.env.VITE_X_NONCE,
    "X-Signature": import.meta.env.VITE_X_SIGNATURE,
  },
});

// ⬇️ request interceptor
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ جيب اللغة من Redux state
  const lang = store.getState().language.lang || "ar";
  config.headers.lang = lang;

  return config;
});

// ⬇️ response interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    if (status === 401 || status === 403) {
      Cookies.remove("token");
      window.location.href = "/login";
    }

    if (status === 451) {
      window.location.href = "/register-otp";
    }

    return Promise.reject(err);
  }
);

export default api;
