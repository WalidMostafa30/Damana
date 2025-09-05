import { useQuery } from "@tanstack/react-query";
import MainInput from "./MainInput/MainInput";
import { getCountries } from "../../services/staticDataService";
import { useTranslation } from "react-i18next";

export default function CountrySelect({
  name,
  formik,
  disabled,
  combineValue = false,
}) {
  const { t } = useTranslation();

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
      placeholder={t("components.form.countrySelect.placeholder")}
      label={t("components.form.countrySelect.label")}
      error={getError(name)}
      value={formik.values[name]}
      onChange={combineValue ? handleCountryChange : formik.handleChange}
      disabled={disabled || loadingCountries}
      options={[
        {
          value: "",
          label: loadingCountries
            ? t("loading")
            : t("components.form.countrySelect.select"),
        },
        ...countries.map((c) => ({ value: c.id, label: c.name })),
      ]}
    />
  );
}
