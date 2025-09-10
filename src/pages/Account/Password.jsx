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
import { useTranslation } from "react-i18next";
import ActionModal from "../../components/modals/ActionModal";

const ChangePassword = () => {
  const { t } = useTranslation();

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);

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
    if (passwordStrength <= 1) return t("pages.account.password.strength.weak");
    if (passwordStrength === 2)
      return t("pages.account.password.strength.medium");
    if (passwordStrength >= 3)
      return t("pages.account.password.strength.strong");
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
      setOpenModal(true);
      formik.resetForm();
      setPasswordValue("");
      setPasswordStrength(0);
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || t("pages.account.password.error")
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
      old_password: Yup.string().required(
        t("pages.account.password.validations.old_password_required")
      ),
      new_password: Yup.string()
        .required(t("pages.account.password.validations.new_password_required"))
        .min(8, t("pages.account.password.validations.min_length"))
        .matches(/[A-Z]/, t("pages.account.password.validations.uppercase"))
        .matches(/\d/, t("pages.account.password.validations.number"))
        .matches(/[\W_]/, t("pages.account.password.validations.symbol")),
      new_password_confirmation: Yup.string()
        .required(t("pages.account.password.validations.confirm_required"))
        .oneOf(
          [Yup.ref("new_password")],
          t("pages.account.password.validations.confirm_mismatch")
        ),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      mutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="lg:w-1/2">
        <MainInput
          type="password"
          id="old_password"
          name="old_password"
          placeholder={t("pages.account.password.placeholder")}
          label={t("pages.account.password.old_password")}
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
            placeholder={t("pages.account.password.placeholder")}
            label={t("pages.account.password.new_password")}
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
          placeholder={t("pages.account.password.placeholder")}
          label={t("pages.account.password.confirm_password")}
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
        {t("pages.account.password.note")}
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
            {t("pages.account.password.strength.label")} ( {getStrengthLabel()}{" "}
            )
          </p>
        )}
      </div>

      <FormError errorMsg={errorMsg} />

      <FormBtn
        title={t("pages.account.password.save")}
        loading={mutation.isPending}
      />

      <ActionModal
        openModal={openModal}
        msg={t("update_damana_modal.msg")}
        icon="success"
        primaryBtn={{
          text: t("update_damana_modal.btn"),
          action: () => {
            setOpenModal(false);
          },
        }}
      />
    </form>
  );
};

export default ChangePassword;
