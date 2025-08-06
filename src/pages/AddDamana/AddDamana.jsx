import { useState, useEffect } from "react";
import PageTitle from "../../components/common/PageTitle";
import StepProgressCol from "../../components/common/StepProgress/StepProgressCol";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import { useSelector } from "react-redux";
import { ImArrowRight } from "react-icons/im";

const steps = ["المعلومات الأساسية", "بيانات الأطراف", "بيانات الضمانة"];

export default function AddDamana() {
  const [step, setStep] = useState(0);
  const [vehicleData, setVehicleData] = useState({});
  const [finalData, setFinalData] = useState({});
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    console.log("📌 البيانات المشتركة بين الخطوات:", vehicleData);
    console.log("البيانات النهائية", finalData);
  }, [vehicleData, finalData]);

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
              goNext={() => setStep((prev) => prev + 1)}
              profile={profile}
              setVehicleData={setVehicleData}
              setFinalData={setFinalData}
            />
          )}
          {step === 1 && (
            <Step1
              goNext={() => setStep((prev) => prev + 1)}
              vehicleData={vehicleData}
              setFinalData={setFinalData}
            />
          )}
          {step === 2 && <Step2 finalData={finalData} />}

          {step > 0 && (
            <button
              type="button"
              className="text-neutral-500 hover:text-secondary flex items-center gap-1 cursor-pointer"
              onClick={() => setStep(step - 1)}
            >
              <ImArrowRight />
              الرجوع للخلف
            </button>
          )}
        </div>
      </section>
    </section>
  );
}
