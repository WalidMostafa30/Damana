import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../../services/authService";
import { GoLock } from "react-icons/go";
import { FaRegStickyNote } from "react-icons/fa";
import MainInput from "../../../../components/form/MainInput/MainInput";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";

const ResetPassword = ({ parentData }) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // حساب قوة الباسورد
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;
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

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      alert("تم تغيير كلمة المرور بنجاح ✅");
      // هنا ممكن تعمل إعادة توجيه لصفحة تسجيل الدخول
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || "حدث خطأ أثناء إعادة التعيين"
      );
    },
  });

  // Formik + Yup
  const formik = useFormik({
    initialValues: {
      new_password: "",
      new_password_confirmation: "",
    },
    validationSchema: Yup.object({
      new_password: Yup.string()
        .required("كلمة المرور مطلوبة")
        .min(8, "كلمة المرور يجب أن لا تقل عن 8 حروف")
        .matches(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
        .matches(/\d/, "يجب أن تحتوي على رقم واحد على الأقل")
        .matches(/[\W_]/, "يجب أن تحتوي على رمز خاص واحد على الأقل"),
      new_password_confirmation: Yup.string()
        .required("تأكيد كلمة المرور مطلوب")
        .oneOf([Yup.ref("new_password")], "كلمتا المرور غير متطابقتين"),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      mutation.mutate({
        uid: parentData.uid,
        password_reset_token: parentData.password_reset_token,
        new_password: values.new_password,
        new_password_confirmation: values.new_password_confirmation,
        otp_code: parentData.otp_code,
      });
      console.log({
        uid: parentData.uid,
        password_reset_token: parentData.password_reset_token,
        new_password: values.new_password,
        new_password_confirmation: values.new_password_confirmation,
        otp_code: parentData.otp_code,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* كلمة المرور */}
      <MainInput
        type="password"
        id="new_password"
        name="new_password"
        placeholder="••••••••••"
        label="كلمة المرور"
        icon={<GoLock />}
        value={formik.values.new_password}
        onChange={(e) => {
          formik.handleChange(e);
          setPasswordValue(e.target.value);
          setPasswordStrength(calculatePasswordStrength(e.target.value));
        }}
        onBlur={formik.handleBlur}
        error={formik.touched.new_password && formik.errors.new_password}
      />

      {/* ملاحظات كلمة المرور */}
      <p className="flex items-center gap-2 text-neutral-500">
        <FaRegStickyNote className="text-2xl" />
        يجب أن تحتوى كلمة المرور على أرقام وأحرف ورموز ولا تقل عن 8 حروف
      </p>

      {/* مؤشر القوة */}
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

      {/* تأكيد كلمة المرور */}
      <MainInput
        type="password"
        id="new_password_confirmation"
        name="new_password_confirmation"
        placeholder="••••••••••"
        label="تأكيد كلمة المرور"
        icon={<GoLock />}
        value={formik.values.new_password_confirmation}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.new_password_confirmation &&
          formik.errors.new_password_confirmation
        }
      />

      {/* الأخطاء */}
      <FormError errorMsg={errorMsg} />

      {/* زر التأكيد */}
      <FormBtn title="تأكيد" loading={mutation.isPending} />
    </form>
  );
};

export default ResetPassword;
