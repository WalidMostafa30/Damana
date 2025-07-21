import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../../components/form/MainInput";
import { Link, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";

const ForgotPassword = () => {
  const [method, setMethod] = useState("phone");

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
      navigate("/auth/reset-password");
    },
    enableReinitialize: true,
  });

  const toggleMethod = () =>
    setMethod((prev) => (prev === "phone" ? "email" : "phone"));

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">هل نسيت كلمة المرور ؟</h2>

        <Breadcrumbs
          items={[
            { label: "ضمانة", path: "/" },
            { label: "نسيان كلمة المرور" },
          ]}
        />
      </div>

      <p className="text-neutral-500 mb-4">
        يمكنك اعاده تعين كلمة المرور الخاصه بك فى حال نسيانها من خلال احدى
        الطريقتين التاليتين؛ باستخدام رقم الهاتف أو عبر البريد الإلكتروني
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {method === "phone" ? (
          <MainInput
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="96269077885+"
            label="رقم الهاتف"
            icon={<Phone />}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        ) : (
          <MainInput
            id="email"
            name="email"
            type="text"
            placeholder="أدخل بريدك الإلكتروني"
            label="البريد الإلكتروني"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
        )}

        <button type="submit" className="mainBtn mt-4">
          ارسال كود التحقق
        </button>
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
    </>
  );
};

export default ForgotPassword;
