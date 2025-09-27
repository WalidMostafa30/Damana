import api from "./api";

export const getRunningDashboard = async (payload) => {
  const { data } = await api.get("/company/running-dashboard", payload);
  return data?.data || {};
};

export const getFinancialDashboard = async (payload) => {
  const { data } = await api.get("/company/financial-dashboard", payload);
  return data?.data || {};
};

export const getRunningDashboardTable = async ({
  page = 1,
  type = "sell",
  status,
  created_at_from,
  created_at_to,
  company_id,
}) => {
  const { data } = await api.get("/company/running-dashboard-table", {
    params: {
      page,
      type,
      status: status !== "all" ? status : undefined,
      created_at_from,
      created_at_to,
      company_id: company_id !== "all" ? company_id : undefined,
    },
  });
  return data || {};
};

export const getFinancialDashboardTable = async ({
  page = 1,
  type = "sell",
}) => {
  const { data } = await api.get("/company/financial-dashboard-table", {
    params: { page, type },
  });
  return data || {};
};

export const getCompanies = async () => {
  const { data } = await api.get("/company/companies");
  return data?.data || {};
};
