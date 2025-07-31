import api from "./api";
export const fetchPaymentMethods = async () => {
  const response = await api.get("api/v2/static-data/payment-methods");
  console.log("fetchPaymentMethods response", response.data);
  return response.data.data;
};

export const termsAndConditions = async () => {
  const response = await api.get("web/terms-and-conditions");
  console.log("termsAndConditions response", response.data);
  return response.data;
};

export const mobileTermsAndConditions = async () => {
  const response = await api.get("mobile/terms-and-conditions");
  console.log("termsAndConditions response", response.data);
  return response.data;
};
