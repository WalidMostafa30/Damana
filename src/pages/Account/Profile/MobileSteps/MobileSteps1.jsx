import { useMutation } from "@tanstack/react-query";
import { changeMobileSendOTP } from "../../../../services/authService";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "../../../../components/form/PhoneInput";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import MainInput from "../../../../components/form/MainInput/MainInput";
import { GoMail } from "react-icons/go";
import { useTranslation } from "react-i18next";

const MobileSteps1 = ({ profile, setNewPhoneNumber, goNext, isEditing }) => {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("");
  const [showEditBtn, setShowEditBtn] = useState(false);

  const mutationOTP = useMutation({
    mutationFn: changeMobileSendOTP,
    onSuccess: () => {
      setNewPhoneNumber((prev) => ({
        ...prev,
        mobile: formik.values.mobile,
        country_code: formik.values.country_code,
      }));
      setErrorMsg("");

      goNext();
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg ||
          t("pages.account.profile.mobileStep1.error_default")
      );
    },
  });

  const profileSchema = Yup.object({
    mobile: Yup.string()
      .min(9, t("pages.account.profile.mobileStep1.mobile_min_length"))
      .required(t("pages.account.profile.mobileStep1.mobile_required")),
    email: Yup.string()
      .email(t("pages.account.profile.mobileStep1.email_invalid"))
      .required(t("pages.account.profile.mobileStep1.email_required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mobile: profile?.mobile,
      country_code: profile?.country_code || "+962",
      email: profile?.email || "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      if (
        values.mobile === profile?.mobile &&
        values.country_code === profile?.country_code
      ) {
        setErrorMsg(t("pages.account.profile.mobileStep1.error_no_change"));
        return;
      }

      mutationOTP.mutate({
        mobile: values.mobile,
        country_code: values.country_code,
      });
    },
  });

  const getError = (fieldName) =>
    formik.touched[fieldName] && formik.errors[fieldName];

  useEffect(() => {
    if (!profile) return;

    const hasChanged =
      formik.values.mobile !== profile.mobile ||
      formik.values.country_code !== profile.country_code;

    setShowEditBtn(hasChanged);
  }, [formik.values, profile]);

  return (
    <div>
      <h3 className="text-lg lg:text-2xl font-bold text-primary mb-2">
        {t("pages.account.profile.mobileStep1.mobile_email_title")}
      </h3>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput
            type="email"
            id="email"
            placeholder={t(
              "pages.account.profile.mobileStep1.email_placeholder"
            )}
            label={t("pages.account.profile.mobileStep1.email_label")}
            icon={<GoMail />}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("email")}
            disabled={!isEditing}
          />

          <PhoneInput formik={formik} disabled={!isEditing} />
        </div>

        <FormError errorMsg={errorMsg} />
        {showEditBtn && isEditing && (
          <FormBtn
            title={t("pages.account.profile.mobileStep1.send_otp")}
            loading={mutationOTP.isPending}
          />
        )}
      </form>
    </div>
  );
};

export default MobileSteps1;
