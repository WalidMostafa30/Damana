import api from "./api"; // استخدم instance الخاص بـ Axios الذي قمت بإعداده

export const submitCompanyRegistration = async (formData) => {
  const response = await api.post("api/v2/reg/company", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
