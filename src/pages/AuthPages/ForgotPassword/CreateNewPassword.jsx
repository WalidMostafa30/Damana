import { Link } from "react-router-dom";
import { Lock, StickyNote } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import MainInput from "../../../components/form/MainInput";
import Breadcrumbs from "../../../components/common/Breadcrumbs";

const CreateNewPassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (data) => {
    const strength = calculatePasswordStrength(data.password);
    if (strength <= 1) {
      setError("password", {
        type: "manual",
        message: "كلمة المرور ضعيفة جدًا، الرجاء اختيار كلمة أقوى.",
      });
      return;
    }

    console.log("New Password Submitted:", data);
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">انشاء كلمة مرور جديدة</h2>

        <Breadcrumbs
          items={[
            { label: "ضمانة", path: "/" },
            { label: "نسيان كلمة المرور", path: "/auth/forgot-password" },
            { label: "انشاء كلمة مرور جديدة" },
          ]}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <MainInput
          type="password"
          id="password"
          placeholder="••••••••••"
          label="كلمة المرور"
          icon={<Lock />}
          {...register("password", { required: "كلمة المرور مطلوبة" })}
          onChange={(e) => {
            const val = e.target.value;
            setPasswordValue(val);
            setPasswordStrength(calculatePasswordStrength(val));
          }}
          error={errors.password?.message}
        />

        <p className="flex items-center gap-2 text-neutral-500">
          <StickyNote />
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

        <button className="mainBtn">تأكيد</button>
      </form>
    </>
  );
};

export default CreateNewPassword;
