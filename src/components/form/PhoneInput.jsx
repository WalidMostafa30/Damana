import MainInput from "./MainInput/MainInput";

const PhoneInput = ({
  formik,
  name = "mobile",
  codeName = "country_code",
  combineValue = false,
}) => {
  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <MainInput
      type="tel"
      id={name}
      name={name}
      placeholder="96269077885+"
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
