import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CiMail } from "react-icons/ci";
import MainInput from "../../../../components/form/MainInput/MainInput";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import { useMutation } from "@tanstack/react-query";
import { checkMobile } from "../../../../services/authService";
import PhoneInput from "../../../../components/form/PhoneInput";
import { useTranslation } from "react-i18next";

const CheckMobile = ({ goNext, setParentData }) => {
  const { t } = useTranslation();
  const [method, setMethod] = useState("mobile");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Validation Schema مع الترجمة
  const validationSchema = Yup.object(
    method === "mobile"
      ? {
          mobile: Yup.string()
            .min(9, t("pages.forgotPassword.checkMobile.errors.mobileMin"))
            .required(t("pages.forgotPassword.checkMobile.errors.mobileRequired")),
        }
      : {
          email: Yup.string()
            .email(t("pages.forgotPassword.checkMobile.errors.emailInvalid"))
            .required(t("pages.forgotPassword.checkMobile.errors.emailRequired")),
        }
  );

  const mutation = useMutation({
    mutationFn: checkMobile,
    onSuccess: (data) => {
      setParentData((prev) => ({
        ...prev,
        uid: data.data.uid,
        password_reset_token: data.data.password_reset_token,
        otp_code: data.data.otp_code,
      }));
      setErrorMsg("");
      goNext();
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || t("pages.forgotPassword.checkMobile.errors.serverError")
      );
    },
  });

  const formik = useFormik({
    initialValues: { mobile: "", email: "", country_code: "" },
    validationSchema,
    onSubmit: (values) => {
      setErrorMsg("");
      const payload =
        method === "mobile"
          ? {
              mobile: values.mobile,
              country_code: values.country_code,
              by: "mobile",
            }
          : { email: values.email, by: "email" };

      mutation.mutate(payload);
    },
    enableReinitialize: true,
  });

  const toggleMethod = () =>
    setMethod((prev) => (prev === "mobile" ? "email" : "mobile"));

  return (
    <>
      {/* ✅ Description */}
      <p className="text-neutral-500 mb-4">{t("pages.forgotPassword.checkMobile.description")}</p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {method === "mobile" ? (
          <PhoneInput
            formik={formik}
            placeholder={t("pages.forgotPassword.checkMobile.placeholders.mobile")}
            label={t("pages.forgotPassword.checkMobile.labels.mobile")}
          />
        ) : (
          <MainInput
            id="email"
            name="email"
            type="text"
            placeholder={t("pages.forgotPassword.checkMobile.placeholders.email")}
            icon={<CiMail />}
            label={t("pages.forgotPassword.checkMobile.labels.email")}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
        )}

        <FormError errorMsg={errorMsg} />

        <FormBtn
          title={t("pages.forgotPassword.checkMobile.buttons.sendCode")}
          loading={mutation.isPending}
        />
      </form>

      <button
        onClick={toggleMethod}
        className="mainBtn light mt-4"
        type="button"
      >
        {method === "mobile"
          ? t("pages.forgotPassword.checkMobile.buttons.useEmail")
          : t("pages.forgotPassword.checkMobile.buttons.useMobile")}
      </button>
    </>
  );
};

export default CheckMobile;
