import api from "./api";

export const checkByRegN = async (number) => {
  const { data } = await api.get(
    `/dvld/checkByRegN?registration_number=${number}`
  );
  return data?.data?.data;
};

export const checkCoupon = async (code) => {
  const { data } = await api.post(`/check-coupon`, { code });
  return data?.data;
};

export const getCommission = async (payload) => {
  const { data } = await api.post("/vehicle-transfers/get-commission", payload);
  return data?.data;
};

export const createVehicleTransfer = async (payload) => {
  const { data } = await api.post("/vehicle-transfers/create", payload);
  return data?.data;
};
