import api from "./api";

export const getCountries = async () => {
  const { data } = await api.get("/static-data/countries");
  return data;
};

export const getBanks = async () => {
  const { data } = await api.get("/static-data/banks");
  return data;
};

export const getPaymentMethods = async () => {
  const { data } = await api.get("/static-data/payment-methods");
  return data?.data || [];
};

export const getApplicationConfiguration = async () => {
  const { data } = await api.get("/application-configuration");
  return data?.data;
};

export const getFAQ = async () => {
  const { data } = await api.get("/static-data/faq");
  return data?.data || [];
};

export const getPage = async (slug) => {
  const { data } = await api.get(`/pages/get-page/${slug}`);
  return data?.data || [];
};
