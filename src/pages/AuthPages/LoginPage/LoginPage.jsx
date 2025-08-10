import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import MainInput from "../../../components/form/MainInput/MainInput";
import AuthBreadcrumbs from "../../../components/common/AuthBreadcrumbs";
import { GoLock } from "react-icons/go";
import AuthLayout from "../../../components/common/AuthLayout";
import { useState } from "react";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../services/authService";

const loginSchema = Yup.object({
  mobile: Yup.string()
    .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل")
    .required("رقم الهاتف مطلوب"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  remember: Yup.boolean(),
});

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || "حدث خطأ أثناء تسجيل الدخول"
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      mobile: "",
      country_code: "",
      password: "",
      remember: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setErrorMsg("");
      const payload = {
        mobile: values.mobile,
        country_code: values.country_code,
        password: values.password,
      };
      mutation.mutate(payload);
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title="أهلاً في ضمانة!"
        items={[{ label: "ضمانة", path: "/" }, { label: "تسجيل الدخول" }]}
      />

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <MainInput
          type="tel"
          id="mobile"
          name="mobile"
          placeholder="96269077885+"
          label="رقم الهاتف"
          value={`${formik.values.country_code?.replace("+", "")}${
            formik.values.mobile
          }`} // عرض الكود مع الرقم
          onChange={(phone, country) => {
            const countryCode = country?.dialCode ? `+${country.dialCode}` : "";

            // الرقم بدون كود الدولة
            const mobileWithoutCode = country?.dialCode
              ? phone.slice(country.dialCode.length)
              : phone;

            formik.setFieldValue("country_code", countryCode);
            formik.setFieldValue("mobile", mobileWithoutCode);
          }}
          onBlur={formik.handleBlur}
          error={getError("mobile")}
        />

        <MainInput
          type="password"
          id="password"
          name="password"
          placeholder="••••••••••"
          label="كلمة المرور"
          icon={<GoLock />}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError("password")}
        />

        <div className="flex items-center justify-between text-neutral-500 font-semibold">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              checked={formik.values.remember}
              onChange={formik.handleChange}
              className="w-4 h-4 rounded accent-primary"
            />
            <span>تذكرني</span>
          </label>
          <Link to="/forgot-password" className="hover:text-primary transition">
            نسيت كلمة المرور؟
          </Link>
        </div>

        <FormError errorMsg={errorMsg} />

        <FormBtn title="تسجيل الدخول" loading={mutation.isPending} />

        <div className="text-center font-semibold text-sm lg:text-base">
          <p>
            ليس لديك حساب؟{" "}
            <Link
              to="/register-person"
              className="text-secondary hover:brightness-50 transition-colors"
            >
              إنشئ حساب فرديا
            </Link>{" "}
            أو قدم{" "}
            <Link
              to="/register-company"
              className="text-secondary hover:brightness-50 transition-colors"
            >
              طلب انضمام
            </Link>{" "}
            ان كنت تمثل شركة
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
