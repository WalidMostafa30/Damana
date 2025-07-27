import { useState } from "react";
import StepProgress from "../../components/common/StepProgress/StepProgress";
import DamanaCard from "../../components/common/DamanaCard";
import MainInput from "../../components/form/MainInput/MainInput";
import { IoWarningOutline } from "react-icons/io5";

const RemoveDamana = () => {
  const [step, setStep] = useState(0); // 0 -> اختيار الضمانة، 1 -> السبب، 2 -> تمت العملية
  const [selectedDamana, setSelectedDamana] = useState(null);
  const [selectError, setSelectError] = useState("");

  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  const steps = [
    {
      title: "طلب الغاء ضمانة",
      description:
        "يمكنك طلب الغاء الضمانة التي انشاتها ، اختار الضمانة ومن ثم اشرح سبب الالغاء وسيتم الرد عليك من قبل الدعم بأسرع وقت ممكن",
    },
    {
      title: "تأكيد الغاء ضمانة",
      description:
        "سيتم ارجاع المبلغ الاساسي مخصوم منه عمولة الغاء الضمانة في حال موافقة مدير النظام على عملية الالغاء",
    },
    {
      title: "تم إرسال طلب الإلغاء",
      description:
        "تم إرسال طلبك وسيتم التواصل معك من قبل الدعم في أقرب وقت ممكن",
    },
  ];

  const allDamanat = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    hours: 3,
    number: `13212312213-${i + 1}`,
    plate: "12-1212",
    seller: "رائد الدوو",
    buyer: "محمد علي",
    date: "1/2/2023",
  }));

  const handleNextFromSelect = () => {
    if (!selectedDamana) {
      setSelectError("من فضلك اختر الضمانة أولاً");
      return;
    }
    setSelectError("");
    setStep(1);
  };

  const handleConfirmCancel = () => {
    if (!reason.trim()) {
      setReasonError("من فضلك اكتب سبب الإلغاء");
      return;
    }
    setReasonError("");
    window.alert("تم إرسال طلب الإلغاء بنجاح ✅");
    setStep(2);
  };

  const resetAndBack = () => {
    // لو حبيت ترجع لبداية الفلو
    setStep(0);
    setSelectedDamana(null);
    setReason("");
    setReasonError("");
    setSelectError("");
  };

  return (
    <div className="bg-white p-4 lg:p-8 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg lg:text-2xl text-primary font-bold">
        {steps[step].title}
      </h3>

      <p className="text-neutral-500 text-lg">{steps[step].description}</p>

      <StepProgress steps={steps} currentStep={step} />

      {/* الخطوة 1: اختيار الضمانة */}
      {step === 0 && (
        <div className="space-y-4">
          {allDamanat.map((d) => (
            <DamanaCard
              key={d.id}
              {...d}
              selectable
              selected={selectedDamana === d.id}
              onSelect={() => setSelectedDamana(d.id)}
            />
          ))}
          {selectError && (
            <p className="text-error-100 text-lg">{selectError}</p>
          )}
        </div>
      )}

      {/* الخطوة 2: كتابة السبب */}
      {step === 1 && (
        <div>
          <MainInput
            label="سبب الغاء الضمانة"
            type="textarea"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            error={reasonError}
          />
          <p className="text-error-100 text-lg mt-2 flex items-center gap-1">
            <IoWarningOutline className="text-2xl" />
            تحذير: سيتم خصم العمولة الخاصة بالغاء الضمانة التي قيمتها 5 دنانير
          </p>
        </div>
      )}

      {/* الخطوة 3: رسالة نجاح بسيطة */}
      {step === 2 && (
        <div className="text-center space-y-4">
          <h4 className="text-xl font-semibold text-primary">
            تم إرسال طلب الإلغاء
          </h4>
          <p className="text-neutral-600">سيتم التواصل معك في أقرب وقت ممكن.</p>
          <button onClick={resetAndBack} className="mainBtn">
            الرجوع إلى الضمانات
          </button>
        </div>
      )}

      {/* الأزرار */}
      {step === 0 && (
        <button onClick={handleNextFromSelect} className="mainBtn">
          متابعة
        </button>
      )}

      {step === 1 && (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button onClick={() => setStep(0)} className="mainBtn min-w-[250px]">
            الاستمرار فى الضمانة
          </button>
          <button
            onClick={handleConfirmCancel}
            className="mainBtn danger min-w-[250px]"
          >
            تأكيد الغاء الضمانة
          </button>
        </div>
      )}
    </div>
  );
};

export default RemoveDamana;
