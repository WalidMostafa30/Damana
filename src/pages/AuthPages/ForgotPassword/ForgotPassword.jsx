import { useEffect, useState } from "react";
import AuthBreadcrumbs from "../../../components/common/AuthBreadcrumbs";
import AuthLayout from "../../../components/common/AuthLayout";
import CheckMobile from "./steps/CheckMobile";
import Otp from "./steps/Otp";
import ResetPassword from "./steps/ResetPassword";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    console.clear();
    console.log("data", data);
  }, [data]);

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title="هل نسيت كلمة المرور ؟"
        items={[
          { label: "ضمانة", path: "/" },
          { label: "إستعادة كلمة المرور" },
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
        هل تمتلك حساب بالفعل؟{" "}
        <Link
          to="/login"
          className="text-secondary hover:brightness-50 transition-colors"
        >
          تسجيل دخول
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
