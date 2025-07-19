import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import MainInput from "../../../components/form/MainInput";
import { Link, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل"),
});

const emailSchema = z.object({
  email: z.email("البريد الإلكتروني غير صالح"),
});

const ForgotPassword = () => {
  const [method, setMethod] = useState("phone");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(method === "phone" ? phoneSchema : emailSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("بيانات الاستعادة:", data);
    navigate("/auth/reset-password");
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {method === "phone" ? (
          <MainInput
            type="number"
            id="phone"
            placeholder="96269077885+"
            label="رقم الهاتف"
            icon={<Phone />}
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />
        ) : (
          <MainInput
            {...register("email")}
            id="email"
            type="text"
            placeholder="أدخل بريدك الإلكتروني"
            label="البريد الإلكتروني"
            error={errors.email?.message}
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
