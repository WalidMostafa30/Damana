import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../services/authService";
import { GoLock } from "react-icons/go";
import { FaRegStickyNote } from "react-icons/fa";
import MainInput from "../../components/form/MainInput/MainInput";
import FormError from "../../components/form/FormError";
import FormBtn from "../../components/form/FormBtn";

const ChangePassword = () => {
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

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      alert("تم تغيير كلمة المرور بنجاح ✅");
      formik.resetForm();
      setPasswordValue("");
      setPasswordStrength(0);
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || "حدث خطأ أثناء تغيير كلمة المرور"
      );
    },
  });

  // Formik + Yup
  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("كلمة المرور القديمة مطلوبة"),
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
      mutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="lg:w-1/2">
        <MainInput
          type="password"
          id="old_password"
          name="old_password"
          placeholder="••••••••••"
          label="كلمة المرور القديمة"
          icon={<GoLock />}
          value={formik.values.old_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.old_password && formik.errors.old_password}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <MainInput
            type="password"
            id="new_password"
            name="new_password"
            placeholder="••••••••••"
            label="كلمة المرور الجديدة"
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
        </div>

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
      </div>

      <p className="flex gap-2 text-neutral-500 my-4 text-sm lg:text-base">
        <FaRegStickyNote className="text-xl" />
        يجب أن تحتوى كلمة المرور على أرقام وأحرف ورموز ولا تقل عن 8 حروف
      </p>

      <div className="flex items-center gap-2">
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

      <FormError errorMsg={errorMsg} />

      <FormBtn title="حفظ" loading={mutation.isPending} />
    </form>
  );
};

export default ChangePassword;
