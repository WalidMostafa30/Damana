import { useQuery } from "@tanstack/react-query";
import MainInput from "./MainInput/MainInput";
import { getCountries } from "../../services/authService";

export default function CountrySelect({ name, formik, disabled }) {
  const { data: countriesData, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const countries = countriesData?.data || [];

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <MainInput
      id="address_country_id"
      type="select"
      placeholder="اسم البلد"
      label="اسم البلد"
      error={getError(name)}
      value={formik.values[name]}
      onChange={formik.handleChange}
      disabled={disabled || loadingCountries}
      options={[
        { value: "", label: "اختر البلد" },
        ...countries.map((c) => ({ value: c.id, label: c.name })),
      ]}
    />
  );
}
