import api from "./api";
import Cookies from "js-cookie";

export const loginUser = async (formData) => {
  const { data } = await api.post("/auth/login", formData);

  if (data?.data?.token) {
    Cookies.set("token", data.data.token);
  }

  return data.data;
};

export const checkMobile = async (payload) => {
  const { data } = await api.post("/auth/forgot-password/check", payload);
  return data;
};

export const checkOtp = async (payload) => {
  const { data } = await api.post("/auth/forgot-password/check-otp", payload);
  return data;
};

export const resetPassword = async (payload) => {
  const { data } = await api.post(
    "/auth/forgot-password/reset-password",
    payload
  );
  return data;
};

// ########################################################
export const login = async (credentials) => {
  const response = await api.post("web/auth/login", credentials);
  return response.data;
};

export const changePassword = async (credentials) => {
  const response = await api.post("api/v2/auth/change-password", credentials);
  return response.data;
};

export const checkForgotPassword = async (data) => {
  const response = await api.post("api/v2/auth/forgot-password/check", data);
  return response.data;
};

export const checkFPOtp = async (data) => {
  const response = await api.post(
    "api/v2/auth/forgot-password/check-otp",
    data
  );
  return response.data;
};

export const resetFPPassword = async (data) => {
  const response = await api.post(
    "api/v2/auth/forgot-password/reset-password",
    data
  );
  return response.data;
};

export const checkUser = async () => {
  const response = await api.get("api/v2/auth/me");
  return response.data;
};

export const sendOtp = async () => {
  const response = await api.post("api/v2/auth/verified-mobile/sendOtp");
  console.log("checkOtpWithVerified response", response.data);
  return response.data;
};

export const checkOtpWithVerified = async (otp) => {
  const response = await api.post(
    "api/v2/auth/verified-mobile/checkOtpWithVerified",
    {
      otp_code: otp,
    }
  );
  console.log("sendOtp response", response.data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("web/auth/logout");
  return response.data;
};

export const getCsrfCookie = async () => {
  await api.get("sanctum/csrf-cookie");
};

export const updateBankingInfo = async (data) => {
  const response = await api.post("api/v2/auth/updateBankingInfo", data);
  return response.data;
};

export const updateAddressInfo = async (data) => {
  const response = await api.post("api/v2/auth/updateAddressInfo", data);
  return response.data;
};
