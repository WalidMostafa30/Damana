import api from "./api";
import Cookies from "js-cookie";

export const loginUser = async (formData) => {
  const { data } = await api.post("/auth/login", formData);

  if (data?.data?.token) {
    Cookies.set("token", data?.data?.token);
  }

  return data?.data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  Cookies.remove("token");
  return data;
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

export const registerCompany = async (payload) => {
  const { data } = await api.post("/auth/register/company", payload);
  return data;
};

export const getCompanyGroups = async () => {
  const { data } = await api.get("/auth/register/company/groups");
  return data || [];
};

export const createCompanyGroup = async (payload) => {
  const { data } = await api.post(
    "/auth/register/company/groups/create",
    payload
  );
  return data;
};

// export const getProfile = async () => {
//   const { data } = await api.get("/auth/get-profile");

//   if (data?.data?.token) {
//     Cookies.set("token", data?.data?.token);
//   }

//   return data?.data;
// };

export const changePassword = async (formData) => {
  const { data } = await api.post("/auth/change-password", formData);
  return data;
};

export const completeRegister = async (formData) => {
  const { data } = await api.post("/auth/complete-register", formData);
  return data;
};
// +++++++++++++++++++ register person +++++++++++++++++++++
export const registerPerson = async (payload) => {
  const { data } = await api.post("/auth/register", payload);

  if (data?.data?.token) {
    Cookies.set("token", data?.data?.token);
  }

  return data;
};

export const sendOtp = async () => {
  const { data } = await api.post("/auth/verified-mobile/sendOtp");
  return data;
};

export const checkOtpRegister = async (otp_code) => {
  const { data } = await api.post(
    "/auth/verified-mobile/checkOtpWithVerified",
    otp_code
  );
  return data;
};

export const sendPersonalData = async (payload) => {
  const { data } = await api.post("/auth/psd", payload);

  if (data?.data?.token) {
    Cookies.set("token", data?.data?.token);
  }

  return data;
};

export const sendAddressOrBankData = async (payload) => {
  const { data } = await api.post("/auth/complete-register", payload);

  if (data?.data?.token) {
    Cookies.set("token", data?.data?.token);
  }

  return data;
};
