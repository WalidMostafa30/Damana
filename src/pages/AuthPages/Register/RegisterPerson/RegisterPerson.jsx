import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthBreadcrumbs from "../../../../components/common/AuthBreadcrumbs";
import AuthLayout from "../../../../components/common/AuthLayout";
import MainInput from "../../../../components/form/MainInput/MainInput";
import { CiUser } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import { registerPerson } from "../../../../services/authService";

const RegisterPerson = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("الاسم مطلوب")
      .min(3, "الاسم يجب أن لا يقل عن 3 حروف"),
    mobile: Yup.string()
      .required("رقم الهاتف مطلوب")
      .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل"),
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(8, "كلمة المرور يجب ان تكون على الاقل 8 حروف"),
    password_confirmation: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
      .oneOf([Yup.ref("password"), null], "كلمة المرور غير متطابقة"),
  });

  // Mutation للتسجيل
  const registerMutation = useMutation({
    mutationFn: registerPerson,
    onSuccess: async (data, variables) => {
      navigate("/register-otp", {
        state: {
          mobile: variables.mobile,
          country_code: variables.country_code,
        },
      });
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء التسجيل");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      country_code: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setErrorMsg("");
      const payload = {
        name: values.name,
        mobile: values.mobile,
        country_code: values.country_code,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };
      registerMutation.mutate(payload);
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title="أهلاً في ضمانة!"
        items={[{ label: "ضمانة", path: "/" }, { label: "انشاء حساب جديد" }]}
      />

      <div className="mb-8">
        <h3 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
          اكد هويتك الشخصية
        </h3>
        <p className="text-sm lg:text-base text-neutral-500">
          حتى تتمكن من انشاء معامله فى ضمانة, واستخدام ميزات التطبيق, اكد هويتك
          وبيانات البنك الخاص بك
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput
            label="الاسم"
            id="name"
            name="name"
            placeholder="اسم المستخدم"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={getError("name")}
            icon={<CiUser />}
          />

          <MainInput
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="96269077885+"
            label="رقم الهاتف"
            value={`${formik.values.country_code?.replace("+", "")}${
              formik.values.mobile
            }`}
            onChange={(phone, country) => {
              const countryCode = country?.dialCode
                ? `+${country.dialCode}`
                : "";
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

          <MainInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            placeholder="••••••••••"
            label="تاكيد كلمة المرور"
            icon={<GoLock />}
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("password_confirmation")}
          />
        </div>

        <FormError errorMsg={errorMsg} />

        <FormBtn title="انشاء حساب" loading={registerMutation.isPending} />
      </form>
    </AuthLayout>
  );
};

export default RegisterPerson;
