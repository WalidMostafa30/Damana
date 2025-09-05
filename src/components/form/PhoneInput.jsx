import MainInput from "./MainInput/MainInput";
import { useTranslation } from "react-i18next";

const PhoneInput = ({
  formik,
  name = "mobile",
  codeName = "country_code",
  combineValue = false,
  disabled = false,
}) => {
  const { t } = useTranslation();

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <MainInput
      type="tel"
      id={name}
      name={name}
      placeholder={t("components.form.phoneInput.placeholder")}
      disabled={disabled}
      label={t("components.form.phoneInput.label")}
      value={
        combineValue
          ? formik.values[name]
          : `${formik.values[codeName]?.replace("+", "")}${formik.values[name]}`
      }
      onChange={(phone, country) => {
        const countryCode = country?.dialCode ? `+${country.dialCode}` : "";

        if (combineValue) {
          // نخزن الكود والرقم مع بعض
          formik.setFieldValue(
            name,
            `${countryCode}${phone.slice(country.dialCode.length)}`
          );
        } else {
          // نخزنهم منفصلين
          const mobileWithoutCode = country?.dialCode
            ? phone.slice(country.dialCode.length)
            : phone;

          formik.setFieldValue(codeName, countryCode);
          formik.setFieldValue(name, mobileWithoutCode);
        }
      }}
      onBlur={formik.handleBlur}
      error={getError(name)}
    />
  );
};

export default PhoneInput;
