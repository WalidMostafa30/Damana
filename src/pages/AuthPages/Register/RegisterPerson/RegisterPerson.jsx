import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import AuthBreadcrumbs from "../../../../components/common/AuthBreadcrumbs";
import AuthLayout from "../../../../components/common/AuthLayout";
import MainInput from "../../../../components/form/MainInput/MainInput";
import { CiUser } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { FaRegStickyNote } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import { registerPerson } from "../../../../services/authService";
import PhoneInput from "../../../../components/form/PhoneInput";
import ActionModal from "../../../../components/modals/ActionModal";
import { useTranslation } from "react-i18next";
import { getPage } from "../../../../services/staticDataService";

const RegisterPerson = () => {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState("privacy_policy");

  const navigate = useNavigate();

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
      return t("pages.RegisterPerson.form.strength_labels.weak");
    if (passwordStrength === 2)
      return t("pages.RegisterPerson.form.strength_labels.medium");
    if (passwordStrength >= 3)
      return t("pages.RegisterPerson.form.strength_labels.strong");
  };

  const getStrengthColor = () => {
    if (passwordStrength === 1) return "var(--color-error-200)";
    if (passwordStrength === 2) return "var(--color-warning-200)";
    if (passwordStrength >= 3) return "var(--color-success-200)";
    return "transparent";
  };

  const registerMutation = useMutation({
    mutationFn: registerPerson,
    onSuccess: async (data, variables) => {
      const state = {
        mobile: variables.mobile,
        country_code: variables.country_code,
      };

      if (data?.error_code === 1101) {
        state.flow = 2;
        state.ref_key = data?.ref_key;
      }
      navigate("/register-otp", { state });
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg ||
          t("pages.RegisterPerson.errors.general")
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      country_code: "",
      password: "",
      password_confirmation: "",
      accept_policy_terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t("pages.RegisterPerson.validation.name_required"))
        .min(3, t("pages.RegisterPerson.validation.name_min")),
      email: Yup.string().email(
        t("pages.RegisterPerson.validation.email_valid")
      ),
      mobile: Yup.string()
        .required(t("pages.RegisterPerson.validation.phone_required"))
        .min(9, t("pages.RegisterPerson.validation.phone_min")),
      password: Yup.string()
        .required(t("pages.RegisterPerson.validation.password_required"))
        .min(8, t("pages.RegisterPerson.validation.password_min"))
        .matches(
          /[A-Z]/,
          t("pages.RegisterPerson.validation.password_uppercase")
        )
        .matches(/\d/, t("pages.RegisterPerson.validation.password_digit"))
        .matches(
          /[\W_]/,
          t("pages.RegisterPerson.validation.password_special")
        ),
      password_confirmation: Yup.string()
        .required(
          t("pages.RegisterPerson.validation.confirm_password_required")
        )
        .oneOf(
          [Yup.ref("password"), null],
          t("pages.RegisterPerson.validation.confirm_password_match")
        ),
      accept_policy_terms: Yup.bool().oneOf(
        [true],
        t("pages.RegisterPerson.validation.terms_required")
      ),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      const payload = {
        name: values.name,
        email: values.email,
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

  const { data: pageContent } = useQuery({
    queryFn: () => getPage(selectedPage),
    queryKey: ["page", selectedPage],
    keepPreviousData: true,
  });

  const modalMsg = (
    <div
      className="htmlContent"
      dangerouslySetInnerHTML={{ __html: pageContent?.content }}
    />
  );

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title={t("pages.RegisterPerson.title")}
        items={[
          { label: t("pages.RegisterPerson.breadcrumbs.home"), path: "/" },
          { label: t("pages.RegisterPerson.breadcrumbs.register") },
        ]}
      />

      <div className="mb-8">
        <h3 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
          {t("pages.RegisterPerson.heading")}
        </h3>
        <p className="text-sm lg:text-base text-neutral-500">
          {t("pages.RegisterPerson.subheading")}
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput
            label={t("pages.RegisterPerson.form.name")}
            id="name"
            name="name"
            placeholder={t("pages.RegisterPerson.form.name_placeholder")}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={getError("name")}
            icon={<CiUser />}
          />

          <PhoneInput formik={formik} />

          <MainInput
            label={t("pages.RegisterPerson.form.email")}
            id="email"
            name="email"
            placeholder={t("pages.RegisterPerson.form.email_placeholder")}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("email")}
            icon={<MdOutlineMarkEmailUnread />}
          />

          <MainInput
            type="password"
            id="password"
            name="password"
            placeholder={t("pages.RegisterPerson.form.password_placeholder")}
            label={t("pages.RegisterPerson.form.password")}
            icon={<GoLock />}
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              setPasswordValue(e.target.value);
              setPasswordStrength(calculatePasswordStrength(e.target.value));
            }}
            onBlur={formik.handleBlur}
            error={getError("password")}
          />

          <MainInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            placeholder={t("pages.RegisterPerson.form.password_placeholder")}
            label={t("pages.RegisterPerson.form.confirm_password")}
            icon={<GoLock />}
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("password_confirmation")}
          />
        </div>

        <p className="flex items-center gap-2 text-neutral-500">
          <FaRegStickyNote className="text-2xl" />
          {t("pages.RegisterPerson.form.password_note")}
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
              {t("pages.RegisterPerson.form.password_strength")} ({" "}
              {getStrengthLabel()} )
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            name="accept_policy_terms"
            checked={formik.values.accept_policy_terms}
            onChange={(e) =>
              formik.setFieldValue("accept_policy_terms", e.target.checked)
            }
            className="h-5 w-5 accent-primary focus:ring-primary"
          />
          <span>
            {t("pages.RegisterPerson.form.terms_label")}{" "}
            <button
              type="button"
              onClick={() => {
                setSelectedPage("privacy_policy");
                setOpenModal(true);
              }}
              className="text-primary font-semibold cursor-pointer underline"
            >
              {t("pages.RegisterPerson.form.privacy_policy_link")}
            </button>
            {" & "}
            <button
              type="button"
              onClick={() => {
                setSelectedPage("full_terms_and_conditions");
                setOpenModal(true);
              }}
              className="text-primary font-semibold cursor-pointer underline"
            >
              {t("pages.RegisterPerson.form.terms_link")}
            </button>{" "}
          </span>
        </label>
        {getError("accept_policy_terms") && (
          <p className="text-error-100">{getError("accept_policy_terms")}</p>
        )}

        <FormError errorMsg={errorMsg} />

        <FormBtn
          title={t("pages.RegisterPerson.form.submit")}
          loading={registerMutation.isPending}
        />

        <p className="text-center font-semibold text-sm lg:text-base">
          {t("pages.RegisterPerson.form.login_text")}{" "}
          <Link
            to="/login"
            className="text-secondary hover:brightness-50 transition-colors"
          >
            {t("pages.RegisterPerson.form.login_link")}
          </Link>
        </p>
      </form>

      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeBtn
        msg={modalMsg}
        size="large"
        icon="protect"
        primaryBtn={{
          text: t("pages.RegisterPerson.modal.agree"),
          action: () => {
            formik.setFieldValue("accept_policy_terms", true);
            setOpenModal(false);
          },
        }}
        lightBtn={{
          text: t("pages.RegisterPerson.modal.back"),
          action: () => setOpenModal(false),
        }}
      />
    </AuthLayout>
  );
};

export default RegisterPerson;
