import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../../components/form/MainInput/MainInput";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { GoLock } from "react-icons/go";
import { FaRegStickyNote } from "react-icons/fa";
import AuthLayout from "../../../components/layout/AuthLayout";

const CreateNewPassword = () => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[\W_]/.test(password)) strength += 1;
    return strength;
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return "ضعيفة";
    if (passwordStrength === 2) return "متوسطة";
    if (passwordStrength >= 3) return "قوية";
  };

  const getStrengthColor = () => {
    if (passwordStrength === 1) return "var(--color-error-200)";
    if (passwordStrength === 2) return "var(--color-warning-200)";
    if (passwordStrength >= 3) return "var(--color-success-200)";
    return "transparent";
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("كلمة المرور مطلوبة")
        .min(8, "كلمة المرور يجب أن لا تقل عن 8 حروف")
        .matches(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
        .matches(/\d/, "يجب أن تحتوي على رقم واحد على الأقل")
        .matches(/[\W_]/, "يجب أن تحتوي على رمز خاص واحد على الأقل"),
    }),
    onSubmit: (values) => {
      const strength = calculatePasswordStrength(values.password);
      if (strength <= 1) {
        formik.setFieldError(
          "password",
          "كلمة المرور ضعيفة جدًا، الرجاء اختيار كلمة أقوى."
        );
        return;
      }

      console.log("New Password Submitted:", values);
    },
  });

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">انشاء كلمة مرور جديدة</h2>
        <Breadcrumbs
          items={[
            { label: "ضمانة", path: "/" },
            { label: "نسيان كلمة المرور", path: "/forgot-password" },
            { label: "انشاء كلمة مرور جديدة" },
          ]}
        />
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <MainInput
          type="password"
          id="password"
          name="password"
          placeholder="••••••••••"
          label="كلمة المرور"
          icon={<GoLock />}
          value={formik.values.password}
          onChange={(e) => {
            formik.handleChange(e);
            setPasswordValue(e.target.value);
            setPasswordStrength(calculatePasswordStrength(e.target.value));
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
        />

        <p className="flex items-center gap-2 text-neutral-500">
          <FaRegStickyNote className="text-2xl" />
          يجب أن تحتوى كلمة المرور على أرقام وأحرف ورموز ولا تقل عن 8 حروف
        </p>

        <div className="flex items-center gap-2 mt-2">
          <div className="h-2 w-1/2 rounded-full bg-neutral-200 overflow-hidden">
            <div
              className="h-full transition-all duration-300 rounded-full"
              style={{
                width: `${(passwordStrength / 4) * 100}%`,
                backgroundColor: getStrengthColor(),
              }}
            />
          </div>
          {passwordValue && (
            <p
              className="text-sm font-semibold"
              style={{ color: getStrengthColor() }}
            >
              قوة كلمة المرور ( {getStrengthLabel()} )
            </p>
          )}
        </div>

        <button className="mainBtn" type="submit">
          تأكيد
        </button>
      </form>
    </AuthLayout>
  );
};

export default CreateNewPassword;
