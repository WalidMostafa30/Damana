import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import MainInput from "../../../components/form/MainInput/MainInput";
import AuthBreadcrumbs from "../../../components/common/AuthBreadcrumbs";
import { GoLock } from "react-icons/go";
import AuthLayout from "../../../components/common/AuthLayout";
import { useState } from "react";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../services/authService";
import PhoneInput from "../../../components/form/PhoneInput";
import { useTranslation } from "react-i18next";
import { CiMail } from "react-icons/ci";

const LoginPage = () => {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // ✅ Validation Schema with translations
  const [method, setMethod] = useState("mobile");

  const loginSchema = Yup.object(
    method === "mobile"
      ? {
        mobile: Yup.string()
        .min(9, t("pages.login.errors.mobileMin"))
        .required(t("pages.login.errors.mobileRequired")),
      password: Yup.string()
        .min(6, t("pages.login.errors.passwordMin"))
        .required(t("pages.login.errors.passwordRequired")),
      remember: Yup.boolean(),
        }
      : {
    
      password: Yup.string()
        .min(6, t("pages.login.errors.passwordMin"))
        .required(t("pages.login.errors.passwordRequired")),
      remember: Yup.boolean(),

      
          email: Yup.string()
            .email(t("pages.forgotPassword.checkMobile.errors.emailInvalid"))
            .required(
              t("pages.forgotPassword.checkMobile.errors.emailRequired")
            ),
        }
  );




















  // React Query Mutation
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || t("pages.login.errors.serverError")
      );
    },
  });




  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mobile: "",
      country_code: "",
      password: "",
      remember: false,
      email: "", 
    },



    validationSchema: loginSchema,
    onSubmit: (values) => {
      setErrorMsg("");
      const payload =
      method === "mobile"
      ? {
        mobile: values.mobile,
        country_code: values.country_code,
        password: values.password,
        remember: values.remember,
          by: "mobile",
        }
      : { 
        email: values.email, 
        by: "email" ,
        password: values.password,
        remember: values.remember,
      };

      mutation.mutate(payload);
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];


  const toggleMethod = () =>
{
  setMethod((prev) => (prev === "mobile" ? "email" : "mobile"))
  formik.setFieldValue("mobile", "");
  formik.setFieldValue("email", "");
  formik.setFieldValue("country_code", "");
};



  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title={t("pages.login.title")}
        items={[
          { label: t("pages.login.breadcrumbs.home"), path: "/" },
          { label: t("pages.login.breadcrumbs.page") },
        ]}
      />

      <form onSubmit={formik.handleSubmit} className="space-y-6">




{method === "mobile" ? (
          
        <PhoneInput
        formik={formik}
        placeholder={t("pages.login.placeholders.mobile")}
      />
        ) : (
          <MainInput
          id="email"
          name="email"
          type="text"
          placeholder={t(
            "pages.forgotPassword.checkMobile.placeholders.email"
          )}
          icon={<CiMail />}
          label={t("pages.forgotPassword.checkMobile.labels.email")}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />
      )}




        <a
          onClick={toggleMethod}
          className="mt-[-15px] mb-2  float-end  text-blue-500 cursor-pointer"
          type="button"
        >
          {method === "mobile"
            ?"تسجيل الدخول بالبريد الالكتروني"
            : "تسجيل الدخول برقم الهاتف"}
        </a>





        <MainInput
          type="password"
          id="password"
          name="password"
          placeholder={t("pages.login.placeholders.password")}
          label={t("pages.login.labels.password")}
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
              className="w-4 h-4 rounded accent-primary"
            />
            <span>{t("pages.login.labels.rememberMe")}</span>
          </label>
          <Link to="/forgot-password" className="hover:text-primary transition">
            {t("pages.login.links.forgotPassword")}
          </Link>
        </div>

        <FormError errorMsg={errorMsg} />

        <FormBtn
          title={t("pages.login.buttons.login")}
          loading={mutation.isPending}
        />

        <p className="text-center font-semibold text-sm lg:text-base">
          {t("pages.login.registerText")}{" "}
          <Link
            to="/register-person"
            className="text-secondary hover:brightness-50 transition-colors"
          >
            {t("pages.login.links.registerPerson")}
          </Link>{" "}
          {t("pages.login.common.or")}{" "}
          <Link
            to="/register-company"
            className="text-secondary hover:brightness-50 transition-colors"
          >
            {t("pages.login.links.registerCompany")}
          </Link>{" "}
          {t("pages.login.companyNote")}
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
