import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import StepProgressCol from "../../components/common/StepProgress/StepProgressCol";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import BackStepBtn from "../../components/form/BackStepBtn";
import { useTranslation } from "react-i18next";

export default function AddDamana() {
  const { t } = useTranslation();
  const steps = t("pages.addDamana.steps", { returnObjects: true });

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    registration_number: "",
    is_owner: true,
    owner_national_number: "",
    owner_full_mobile: "",
    buyer_national_number: "",
    buyer_full_mobile: "",
    buyerCountryCode: "",
    vehicle_price: "",
    commission_on: "",
    code: "",
    transfer_commission: "ACH",
  });

  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () => setStep((prev) => prev - 1);

  return (
    <section className="pageContainer space-y-4">
      <PageTitle
        title={t("pages.addDamana.title")}
        subtitle={t("pages.addDamana.subtitle")}
      />

      <section className="whiteContainer grid grid-cols-1 lg:grid-cols-4 gap-4">
        <aside>
          <StepProgressCol steps={steps} currentStep={step} />
        </aside>

        <div className="col-span-1 lg:col-span-3 space-y-4 baseWhiteContainer">
          {step === 0 && (
            <Step0
              goNext={goNext}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 1 && (
            <Step1
              goNext={goNext}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 2 && (
            <Step2 formData={formData} setFormData={setFormData} />
          )}

          <BackStepBtn step={step} goBack={goBack} />
        </div>
      </section>
    </section>
  );
}
