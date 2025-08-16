import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import StepProgress from "../../components/common/StepProgress/StepProgress";
import DamanaCard from "../../components/common/DamanaCard";
import MainInput from "../../components/form/MainInput/MainInput";
import { IoWarningOutline } from "react-icons/io5";
import { cancelDamana, fetchDamanat } from "../../services/damanaServices";
import LoadingSection from "../../components/layout/Loading/LoadingSection";
import ActionModal from "../../components/modals/ActionModal";

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
];

const RemoveDamana = () => {
  const [step, setStep] = useState(0);
  const [selectedDamanat, setSelectedDamanat] = useState([]);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    data: allDamanat = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["damanat", "cancellable"],
    queryFn: () => fetchDamanat(null, "cancellable"),
  });

  const cancelDamanaMutation = useMutation({
    mutationFn: cancelDamana,
    onSuccess: () => {
      setOpenModal(true);
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ اثناء الإلغاء");
    },
  });

  const toggleSelect = (id) => {
    setSelectedDamanat((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmCancel = () => {
    if (!reason.trim()) {
      setReasonError("من فضلك اكتب سبب الإلغاء");
      return;
    }
    setReasonError("");

    cancelDamanaMutation.mutate({
      ids: selectedDamanat,
      reason,
    });
  };

  const resetAndBack = () => {
    setStep(0);
    setSelectedDamanat([]);
    setReason("");
    setReasonError("");
  };

  return (
    <>
      <h3 className="text-lg lg:text-2xl text-primary font-bold">
        {steps[step].title}
      </h3>
      <p className="text-neutral-500 lg:text-lg">{steps[step].description}</p>

      <StepProgress steps={steps} currentStep={step} />

      {isLoading && <LoadingSection />}
      {isError && (
        <FormError
          errorMsg={error?.response?.data?.error_msg || "حدث خطأ اثناء التحميل"}
        />
      )}

      {!isLoading && step === 0 && (
        <div className="space-y-4">
          {allDamanat?.length > 0 ? (
            allDamanat?.map((d) => (
              <DamanaCard
                key={d.id}
                number={d.serial_number}
                plate={d.plate_number_code}
                seller={d.seller?.name}
                id={d.id}
                status_translate={d.status_translate}
                price={`${d.vehicle_price} دينار أردني`}
                date={new Date(d.created_at).toLocaleDateString("ar-EG")}
                statusText={d.status_translate}
                expireDate={d.license_expiry_date}
                selectable
                selected={selectedDamanat.includes(d.id)}
                onSelect={() => toggleSelect(d.id)}
              />
            ))
          ) : (
            <p className="text-center text-lg">لا توجد ضمانات متاحة للإلغاء</p>
          )}

          {selectedDamanat.length > 0 && (
            <button onClick={() => setStep(1)} className="mainBtn">
              متابعة
            </button>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <MainInput
            label="سبب الغاء الضمانة"
            type="textarea"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            error={reasonError}
          />
          <p className="text-error-100 text-lg flex items-center gap-1">
            <IoWarningOutline className="text-2xl" />
            تحذير: سيتم خصم العمولة الخاصة بالغاء الضمانة التي قيمتها 5 دنانير
          </p>
          {errorMsg && <FormError errorMsg={errorMsg} />}

          <div className="flex flex-col md:flex-row items-center gap-4">
            <button onClick={resetAndBack} className="mainBtn min-w-[250px]">
              الاستمرار فى الضمانة
            </button>
            <button
              onClick={handleConfirmCancel}
              className={`mainBtn danger min-w-[250px] ${
                cancelDamanaMutation.isPending && "cursor-wait contrast-50"
              }`}
              disabled={cancelDamanaMutation.isPending}
            >
              {cancelDamanaMutation.isPending
                ? "جاري التحميل..."
                : "تاكيد الغاء الضمانة"}
            </button>
          </div>
        </div>
      )}

      <ActionModal
        openModal={openModal}
        msg={
          "تم ارسال فورم الالغاء الى مدير النظام, سيتم التواصل معك في اقرب وقت ممكن."
        }
        icon="success"
        primaryBtn={{
          text: "الذهاب الى صفحه الضمانات",
          action: () => {
            setOpenModal(false);
            resetAndBack();
          },
        }}
      />
    </>
  );
};

export default RemoveDamana;
