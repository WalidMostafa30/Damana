import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../../components/form/MainInput/MainInput";
import { useNavigate } from "react-router-dom";
import AuthBreadcrumbs from "../../../components/common/AuthBreadcrumbs";
import { CiMail } from "react-icons/ci";
import AuthLayout from "../../../components/layout/AuthLayout";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";

const ForgotPassword = () => {
  const [method, setMethod] = useState("phone");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const validationSchema = Yup.object(
    method === "phone"
      ? {
          phoneNumber: Yup.string()
            .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل")
            .required("رقم الهاتف مطلوب"),
        }
      : {
          email: Yup.string()
            .email("البريد الإلكتروني غير صالح")
            .required("البريد الإلكتروني مطلوب"),
        }
  );

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("بيانات الاستعادة:", values);
      navigate("/reset-password");
    },
    enableReinitialize: true,
  });

  const toggleMethod = () =>
    setMethod((prev) => (prev === "phone" ? "email" : "phone"));

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title="هل نسيت كلمة المرور ؟"
        items={[{ label: "ضمانة", path: "/" }, { label: "نسيان كلمة المرور" }]}
      />

      <p className="text-neutral-500 mb-4">
        يمكنك اعاده تعين كلمة المرور الخاصه بك فى حال نسيانها من خلال احدى
        الطريقتين التاليتين؛ باستخدام رقم الهاتف أو عبر البريد الإلكتروني
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {method === "phone" ? (
          <MainInput
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="96269077885+"
            label="رقم الهاتف"
            value={formik.values.phoneNumber}
            onChange={(phone) => formik.setFieldValue("phoneNumber", phone)}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
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

        <FormBtn title="ارسال كود التحقق" />
      </form>

      <button
        onClick={toggleMethod}
        className="mainBtn light mt-4"
        type="button"
      >
        {method === "phone"
          ? "استخدام البريد الإلكتروني؟"
          : "استخدام رقم الهاتف؟"}
      </button>
    </AuthLayout>
  );
};

export default ForgotPassword;
