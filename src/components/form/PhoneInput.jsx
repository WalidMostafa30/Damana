import MainInput from "./MainInput/MainInput";

const PhoneInput = ({
  formik,
  name = "mobile",
  codeName = "country_code",
  combineValue = false,
  disabled = false,
}) => {
  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <MainInput
      type="tel"
      id={name}
      name={name}
      placeholder="96269077885+"
      disabled={disabled}
      label="رقم الهاتف"
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
