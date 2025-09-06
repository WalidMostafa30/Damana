import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AuthBreadcrumbs from "../../../components/common/AuthBreadcrumbs";
import AuthLayout from "../../../components/common/AuthLayout";
import CheckMobile from "./steps/CheckMobile";
import Otp from "./steps/Otp";
import ResetPassword from "./steps/ResetPassword";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { t } = useTranslation(); // ✅ استخدم hook الترجمة
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  useEffect(() => {
    console.clear();
    console.log("data", data);
  }, [data]);

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title={t("pages.forgotPassword.title")}
        items={[
          { label: t("pages.forgotPassword.breadcrumbs.home"), path: "/" },
          { label: t("pages.forgotPassword.breadcrumbs.page") },
        ]}
      />

      {step === 1 && (
        <CheckMobile goNext={() => setStep(2)} setParentData={setData} />
      )}
      {step === 2 && (
        <Otp
          goNext={() => setStep(3)}
          parentData={data}
          setParentData={setData}
        />
      )}
      {step === 3 && <ResetPassword parentData={data} />}

      <p className="text-center font-semibold text-sm lg:text-base mt-4">
        {t("pages.forgotPassword.loginText")}{" "}
        <Link
          to="/login"
          className="text-secondary hover:brightness-50 transition-colors"
        >
          {t("pages.forgotPassword.loginLink")}
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
