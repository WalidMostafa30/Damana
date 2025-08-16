import { useState, useEffect } from "react";
import PageTitle from "../../components/common/PageTitle";
import StepProgressCol from "../../components/common/StepProgress/StepProgressCol";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import { useSelector } from "react-redux";
import BackStepBtn from "../../components/form/BackStepBtn";

const steps = ["المعلومات الأساسية", "بيانات الأطراف", "بيانات الضمانة"];

export default function AddDamana() {
  const [step, setStep] = useState(2);

  // ✅ هنا هنخزن كل البيانات المشتركة بين الخطوات
  const [formData, setFormData] = useState({
    // بيانات Step0
    registration_number: "",
    owner: "yes",
    ownerName: "",
    ownerNationalId: "",
    ownerPhone: "",
    agreement: false,

    // بيانات Step1
    buyer_national_number: "",
    buyer_full_mobile: "",
    buyerCountryCode: "",

    // بيانات Step2
    vehicle_price: "",
    commission_on: "",
    code: "",
    transfer_commission: "ACH",
  });

  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    console.log("📌 البيانات المشتركة بين الخطوات:", formData);
  }, [formData]);

  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () => setStep((prev) => prev - 1);

  return (
    <section className="pageContainer space-y-4">
      <PageTitle
        title="طلب ضمانة جديدة"
        subtitle="ابداء بإنشاء ضمانة جديدة للمركبة التي تود ببيعها"
      />

      <section className="whiteContainer grid grid-cols-1 lg:grid-cols-4 gap-4">
        <aside>
          <StepProgressCol steps={steps} currentStep={step} />
        </aside>

        <div className="col-span-1 lg:col-span-3 space-y-4 baseWhiteContainer">
          {step === 0 && (
            <Step0
              goNext={goNext}
              profile={profile}
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
