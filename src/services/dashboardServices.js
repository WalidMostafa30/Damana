import api from "./api";

export const getRunningDashboard = async () => {
  const { data } = await api.get("/company/running-dashboard");
  return data?.data || {};
};

export const getCompanies = async () => {
  const { data } = await api.get("/company/companies");
  return data?.data || {};
};

export const getRunningDashboardTable = async (payload) => {
  const { data } = await api.get("/company/running-dashboard-table", payload);
  return data?.data || {};
};
