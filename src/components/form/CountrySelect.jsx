import { useQuery } from "@tanstack/react-query";
import MainInput from "./MainInput/MainInput";
import { getCountries } from "../../services/staticDataService";

export default function CountrySelect({
  name,
  formik,
  disabled,
  combineValue = false,
}) {
  const { data: countriesData, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const countries = countriesData?.data || [];

  const handleCountryChange = (e) => {
    const selectedId = e.target.value;
    const selectedCountry = countries.find(
      (c) => String(c.id) === String(selectedId)
    );

    formik.setFieldValue("address_country_id", selectedCountry?.id || "");
    formik.setFieldValue("address_country_name", selectedCountry?.name || "");
  };

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <MainInput
      id={name}
      type="select"
      placeholder="اسم البلد"
      label="اسم البلد"
      error={getError(name)}
      value={formik.values[name]}
      onChange={combineValue ? handleCountryChange : formik.handleChange}
      disabled={disabled || loadingCountries}
      options={[
        { value: "", label: "اختر البلد" },
        ...countries.map((c) => ({ value: c.id, label: c.name })),
      ]}
    />
  );
}
