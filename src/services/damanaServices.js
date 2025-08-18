import api from "./api";

export const checkByRegN = async (payload) => {
  const { data } = await api.get(
    `/dvld/checkByRegN?registration_number=${payload.registration_number}`,
    {
      params: {
        is_owner: payload.is_owner ? 1 : 0,
        owner_national_number: payload.owner_national_number,
      },
    }
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

export const fetchCancellableDamanat = async (page = 1) => {
  const { data } = await api.get(
    `/vehicle-transfers/list?status=cancellable&page=${page}`
  );
  return data;
};

export const fetchDamanaDetails = async (id) => {
  const { data } = await api.get(`/vehicle-transfers/show?id=${id}`);
  return data?.data;
};

export const fetchDamanat = async (type, status) => {
  const { data } = await api.get("/vehicle-transfers/list", {
    params: {
      type,
      status,
    },
  });
  return data?.data;
};

export const cancelDamana = async (payload) => {
  const { data } = await api.post(`/vehicle-transfers/cancel_by_list`, payload);
  return data?.data;
};

export const changeStatus = async (payload) => {
  const { data } = await api.post("vehicle-transfers/update_status", payload);
  return data;
};

export const releaseRequest = async (payload) => {
  const { data } = await api.post("vehicle-transfers/release_request", payload);
  return data;
};
