import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import MainInput from "../../../components/form/MainInput";
import Breadcrumbs from "../../../components/common/Breadcrumbs";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">أهلاً في ضمانة!</h2>

        <Breadcrumbs
          items={[{ label: "ضمانة", path: "/" }, { label: "تسجيل الدخول" }]}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <MainInput
          type="number"
          id="phone"
          placeholder="96269077885+"
          label="رقم الهاتف"
          icon={<Phone />}
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
        />

        <MainInput
          type="password"
          id="password"
          placeholder="••••••••••"
          label="كلمة المرور"
          icon={<Lock />}
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between text-neutral-500 font-semibold">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("rememberMe")}
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

        <button className="mainBtn">تسجيل الدخول</button>

        <div className="text-center font-semibold">
          <p>
            ليس لديك حساب؟{" "}
            <Link className="text-secondary hover:brightness-50 transition-colors">
              إنشئ حساب فرديا
            </Link>{" "}
            أو قدم{" "}
            <Link className="text-secondary hover:brightness-50 transition-colors">
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
