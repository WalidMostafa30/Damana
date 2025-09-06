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
import { useTranslation } from "react-i18next";

const ResetPassword = ({ parentData }) => {
  const { t } = useTranslation();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ حساب قوة الباسورد
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;
    return strength;
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 1)
      return t("pages.forgotPassword.resetPassword.strength.weak");
    if (passwordStrength === 2)
      return t("pages.forgotPassword.resetPassword.strength.medium");
    if (passwordStrength >= 3)
      return t("pages.forgotPassword.resetPassword.strength.strong");
  };

  const getStrengthColor = () => {
    if (passwordStrength === 1) return "var(--color-error-200)";
    if (passwordStrength === 2) return "var(--color-warning-200)";
    if (passwordStrength >= 3) return "var(--color-success-200)";
    return "transparent";
  };

  // ✅ Mutation
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      alert(t("pages.forgotPassword.resetPassword.messages.success"));
      // ممكن هنا تعمل إعادة توجيه لصفحة تسجيل الدخول
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg ||
          t("pages.forgotPassword.resetPassword.messages.error")
      );
    },
  });

  // ✅ Formik + Yup
  const formik = useFormik({
    initialValues: {
      new_password: "",
      new_password_confirmation: "",
    },
    validationSchema: Yup.object({
      new_password: Yup.string()
        .required(
          t("pages.forgotPassword.resetPassword.errors.passwordRequired")
        )
        .min(8, t("pages.forgotPassword.resetPassword.errors.passwordMin"))
        .matches(
          /[A-Z]/,
          t("pages.forgotPassword.resetPassword.errors.passwordUppercase")
        )
        .matches(
          /\d/,
          t("pages.forgotPassword.resetPassword.errors.passwordNumber")
        )
        .matches(
          /[\W_]/,
          t("pages.forgotPassword.resetPassword.errors.passwordSpecial")
        ),
      new_password_confirmation: Yup.string()
        .required(
          t("pages.forgotPassword.resetPassword.errors.confirmPasswordRequired")
        )
        .oneOf(
          [Yup.ref("new_password")],
          t("pages.forgotPassword.resetPassword.errors.passwordsMismatch")
        ),
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
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* كلمة المرور */}
      <MainInput
        type="password"
        id="new_password"
        name="new_password"
        placeholder={t(
          "pages.forgotPassword.resetPassword.placeholders.password"
        )}
        label={t("pages.forgotPassword.resetPassword.labels.password")}
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
        {t("pages.forgotPassword.resetPassword.notes")}
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
            {t("pages.forgotPassword.resetPassword.strength.label")} ({" "}
            {getStrengthLabel()} )
          </p>
        )}
      </div>

      {/* تأكيد كلمة المرور */}
      <MainInput
        type="password"
        id="new_password_confirmation"
        name="new_password_confirmation"
        placeholder={t(
          "pages.forgotPassword.resetPassword.placeholders.confirmPassword"
        )}
        label={t("pages.forgotPassword.resetPassword.labels.confirmPassword")}
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
      <FormBtn
        title={t("pages.forgotPassword.resetPassword.button.confirm")}
        loading={mutation.isPending}
      />
    </form>
  );
};

export default ResetPassword;
