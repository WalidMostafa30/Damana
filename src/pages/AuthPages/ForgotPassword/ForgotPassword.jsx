import { useEffect, useState } from "react";
import AuthBreadcrumbs from "../../../components/common/AuthBreadcrumbs";
import AuthLayout from "../../../components/common/AuthLayout";
import CheckMobile from "./steps/CheckMobile";
import Otp from "./steps/Otp";
import ResetPassword from "./steps/ResetPassword";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
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
    </AuthLayout>
  );
};

export default ForgotPassword;
