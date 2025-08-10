import { useState } from "react";
import { Link } from "react-router-dom";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import StepProgress from "../../../../../components/common/StepProgress/StepProgress";
import { ImArrowRight } from "react-icons/im";
import AuthLayout from "../../../../../components/common/AuthLayout";
import AuthBreadcrumbs from "../../../../../components/common/AuthBreadcrumbs";

const steps = ["بياناتك الشخصية", "البيانات البنكية", "العنوان السكني"];

export default function CompleteRegister() {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    dob: "",
    national_number: "",
    nationality_type: "",
    country_id: "",
    document_id: "",
    iban: "",
    currency: "",
    clik_name: "",
    bank_id: "",
    address_building_number: "",
    address_street_name: "",
    address_country_id: "",
    address_city_town: "",
  });

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title="أهلاً في ضمانة!"
        items={[{ label: "ضمانة", path: "/" }, { label: "انشاء حساب جديد" }]}
      />

      <StepProgress steps={steps} currentStep={step} />

      <h3 className="text-xl font-bold mb-2 lg:mb-4">{steps[step]}</h3>

      {step === 0 && (
        <Step0
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="flex items-center gap-1 text-gray-500 mt-4"
        >
          <ImArrowRight /> الرجوع للخلف
        </button>
      )}

      <p className="text-center mt-4">
        هل تمتلك حساب؟{" "}
        <Link
          to="/login"
          className="text-secondary hover:brightness-50 transition-colors"
        >
          تسجيل الدخول
        </Link>
      </p>
    </AuthLayout>
  );
}
