import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import MainInput from "../../../components/form/MainInput/MainInput";
import AuthBreadcrumbs from "../../../components/common/AuthBreadcrumbs";
import { GoLock } from "react-icons/go";
import AuthLayout from "../../../components/layout/AuthLayout";
import { useState } from "react";
import ActionModal from "../../../components/modals/ActionModal";

const loginSchema = Yup.object({
  phoneNumber: Yup.string()
    .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل")
    .required("رقم الهاتف مطلوب"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  remember: Yup.boolean(),
});

const LoginPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
      remember: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Login data:", values);
      setOpenModal(true);
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <>
      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        msg="تم تسجيل الدخول بنجاح"
        icon="error"
        primaryBtn={{ text: "موافق", action: () => {} }}
        dangerBtn={{ text: "اغلاق", action: () => setOpenModal(false) }}
      />

      <AuthLayout>
        <AuthBreadcrumbs
          title="أهلاً في ضمانة!"
          items={[{ label: "ضمانة", path: "/" }, { label: "تسجيل الدخول" }]}
        />

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <MainInput
            type="tel"
            id="phone"
            name="phoneNumber"
            placeholder="96269077885+"
            label="رقم الهاتف"
            value={formik.values.phoneNumber}
            onChange={(phone) => formik.setFieldValue("phoneNumber", phone)}
            onBlur={formik.handleBlur}
            error={getError("phoneNumber")}
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
                className="w-4 h-4 rounded"
              />
              <span>تذكرني</span>
            </label>
            <Link
              to="/forgot-password"
              className="hover:text-primary transition"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button className="mainBtn" type="submit">
            تسجيل الدخول
          </button>

          <div className="text-center font-semibold">
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
    </>
  );
};

export default LoginPage;
