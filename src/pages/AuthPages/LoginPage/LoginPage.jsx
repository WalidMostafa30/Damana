import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import MainInput from "../../../components/form/MainInput/MainInput";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { GoLock } from "react-icons/go";

const loginSchema = Yup.object({
  phoneNumber: Yup.string()
    .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل")
    .required("رقم الهاتف مطلوب"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  rememberMe: Yup.boolean(),
});

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Login data:", values);
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">أهلاً في ضمانة!</h2>

        <Breadcrumbs
          items={[{ label: "ضمانة", path: "/" }, { label: "تسجيل الدخول" }]}
        />
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <MainInput
          type="tel"
          id="phone"
          name="phoneNumber"
          placeholder="96269077885+"
          label="رقم الهاتف"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
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
              name="rememberMe"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              className="w-4 h-4 rounded"
            />
            <span>تذكرني</span>
          </label>
          <Link
            to="/auth/forgot-password"
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
              to="/auth/register-person"
              className="text-secondary hover:brightness-50 transition-colors"
            >
              إنشئ حساب فرديا
            </Link>{" "}
            أو قدم{" "}
            <Link
              to="/auth/register-company"
              className="text-secondary hover:brightness-50 transition-colors"
            >
              طلب انضمام
            </Link>{" "}
            ان كنت تمثل شركة
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
