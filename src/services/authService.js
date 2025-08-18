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
  const { data } = await api.post("/auth/register/company", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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

export const sendOtp = async (payload) => {
  const { data } = await api.post("/auth/verified-mobile/sendOtp", payload);
  return data;
};

export const sendOtpFlow2 = async (payload) => {
  const { data } = await api.post("/auth/register/sendOtp/Flow2", payload);
  return data;
};

export const checkOtpRegister = async (payload) => {
  const { data } = await api.post(
    "/auth/verified-mobile/checkOtpWithVerified",
    payload
  );
  return data;
};

export const checkOtpRegisterFlow2 = async (payload) => {
  const { data } = await api.post("/auth/register/checkOtp/Flow2", payload);
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
export const checkAuth = async () => {
  const { data } = await api.get("/auth/check-auth");

  if (data?.data?.token) {
    Cookies.set("token", data?.data?.token);
  }

  return data?.data;
};
