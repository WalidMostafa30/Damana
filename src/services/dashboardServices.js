import api from "./api";

export const getRunningDashboard = async (payload) => {
  const { data } = await api.get("/company/running-dashboard", payload);
  return data?.data || {};
};

export const getFinancialDashboard = async (payload) => {
  const { data } = await api.get("/company/financial-dashboard", payload);
  return data?.data || {};
};


export const getRevenueTrendCardDashboard = async (payload) => {
  const { data } = await api.get("/company/financial-RevenueTrendCard", {
    params: payload,
  });
  return data?.data || {};
};



export const getRunningDashboardTable = async ({
  page = 1,
  type = "sell",
  filer_running_statuses,
  created_at_from,
  created_at_to,
  company_id,
}) => {
  const { data } = await api.get("/company/running-dashboard-table", {
    params: {
      page,
      type,
      filer_running_statuses:
        filer_running_statuses !== "all" ? filer_running_statuses : undefined,
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
  filer_financial_statuses,
  created_at_from,
  created_at_to,
  company_id,
}) => {
  const { data } = await api.get("/company/financial-dashboard-table", {
    params: {
      page,
      type,
      filer_financial_statuses:
        filer_financial_statuses !== "all"
          ? filer_financial_statuses
          : undefined,
      created_at_from,
      created_at_to,
      company_id: company_id !== "all" ? company_id : undefined,
    },
  });
  return data || {};
};

export const getCompanies = async () => {
  const { data } = await api.get("/company/companies");
  return data?.data || {};
};
