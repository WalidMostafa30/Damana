import { useState } from "react";
import { useTranslation } from "react-i18next";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import StepProgress from "../../../../../components/common/StepProgress/StepProgress";
import AuthLayout from "../../../../../components/common/AuthLayout";
import AuthBreadcrumbs from "../../../../../components/common/AuthBreadcrumbs";
import BackStepBtn from "../../../../../components/form/BackStepBtn";

export default function CompleteRegister() {
  const { t } = useTranslation();

  const steps = t("pages.CompleteRegister.steps", { returnObjects: true });

  const [step, setStep] = useState(0);
  const goBack = () => setStep((prev) => prev - 1);

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
    swift_code: "",
    address_building_number: "",
    address_street_name: "",
    address_country_id: "",
    address_city_town: "",
  });

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title={t("pages.CompleteRegister.title")}
        items={[
          { label: t("pages.RegisterPerson.breadcrumbs.home"), path: "/" },
          { label: t("pages.CompleteRegister.breadcrumb") },
        ]}
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

      <div className="mt-4">
        <BackStepBtn step={step} goBack={goBack} />
      </div>
    </AuthLayout>
  );
}
