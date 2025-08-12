import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CiMail } from "react-icons/ci";
import MainInput from "../../../../components/form/MainInput/MainInput";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import { useMutation } from "@tanstack/react-query";
import { checkMobile } from "../../../../services/authService";
import PhoneInput from "../../../../components/form/PhoneInput";

const CheckMobile = ({ goNext, setParentData }) => {
  const [method, setMethod] = useState("mobile");
  const [errorMsg, setErrorMsg] = useState("");

  const validationSchema = Yup.object(
    method === "mobile"
      ? {
          mobile: Yup.string()
            .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل")
            .required("رقم الهاتف مطلوب"),
        }
      : {
          email: Yup.string()
            .email("البريد الإلكتروني غير صالح")
            .required("البريد الإلكتروني مطلوب"),
        }
  );

  const mutation = useMutation({
    mutationFn: checkMobile,
    onSuccess: (data) => {
      setParentData((prev) => ({
        ...prev,
        uid: data.data.uid,
        password_reset_token: data.data.password_reset_token,
        otp_code: data.data.otp_code,
      }));
      setErrorMsg("");
      goNext();
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء الإرسال");
    },
  });

  const formik = useFormik({
    initialValues: { mobile: "", email: "", country_code: "" },
    validationSchema,
    onSubmit: (values) => {
      setErrorMsg("");
      const payload =
        method === "mobile"
          ? {
              mobile: values.mobile,
              country_code: values.country_code,
              by: "mobile",
            }
          : { email: values.email, by: "email" };

      mutation.mutate(payload);
    },
    enableReinitialize: true,
  });

  const toggleMethod = () =>
    setMethod((prev) => (prev === "mobile" ? "email" : "mobile"));

  return (
    <>
      <p className="text-neutral-500 mb-4">
        يمكنك اعاده تعين كلمة المرور الخاصه بك من خلال الهاتف أو البريد
        الإلكتروني
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* <MainInput
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="96269077885+"
            label="رقم الهاتف"
            value={`${formik.values.country_code?.replace("+", "") || ""}${
              formik.values.mobile || ""
            }`} // عرض الكود مع الرقم
            onChange={(phone, country) => {
              const countryCode = country?.dialCode
                ? `+${country.dialCode}`
                : "";

              // الرقم بدون كود الدولة
              const numberWithoutCode = country?.dialCode
                ? phone.slice(country.dialCode.length)
                : phone;

              formik.setFieldValue("country_code", countryCode);
              formik.setFieldValue("mobile", numberWithoutCode);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && formik.errors.mobile}
          /> */}
        {method === "mobile" ? (
          <PhoneInput formik={formik} />
        ) : (
          <MainInput
            id="email"
            name="email"
            type="text"
            placeholder="أدخل بريدك الإلكتروني"
            icon={<CiMail />}
            label="البريد الإلكتروني"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
        )}

        <FormError errorMsg={errorMsg} />

        <FormBtn title="ارسال كود التحقق" loading={mutation.isPending} />
      </form>

      <button
        onClick={toggleMethod}
        className="mainBtn light mt-4"
        type="button"
      >
        {method === "mobile"
          ? "استخدام البريد الإلكتروني؟"
          : "استخدام رقم الهاتف؟"}
      </button>
    </>
  );
};

export default CheckMobile;
