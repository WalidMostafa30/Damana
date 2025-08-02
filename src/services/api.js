import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://qa.edamana.live/api/v1",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key":
      "771c47fb41-18684646a5-67fa2a8d10-95f8dbe30b-31cb9b261e-4ef52c9e4b",
    Accept: "application/json",
    "X-Nonce": "3f0e04dc37a4046b1739024107062",
    "X-Signature":
      "581f6f2fbd904486205a474a6510c028f0e0d6c7b3f2c645f1ef4edb91abb2eb",
    lang: "en",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  console.log("📌 Current Token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
