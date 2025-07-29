import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepProgressCol from "../../components/common/StepProgress/StepProgressCol";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import PageTitle from "../../components/common/PageTitle";

const steps = [
  "المعلومات الأساسية",
  "بيانات الأطراف",
  "بيانات الضمانة",
  "تأكيد الإرسال",
];

const validationSchemas = [
  Yup.object({
    owner: Yup.string().required("اختيار المالك مطلوب"),
    regNumber: Yup.string().required("رقم التسجيل مطلوب"),
  }),
  Yup.object({
    nationalId: Yup.string().required("الرقم الوطني مطلوب"),
    phone: Yup.string().required("رقم الهاتف مطلوب"),
  }),
  Yup.object({
    guaranteeAmount: Yup.number()
      .required("قيمة الضمانة مطلوبة")
      .positive("يجب إدخال قيمة موجبة"),
    code: Yup.string().required("الكود مطلوب"),
  }),
];

const AddDamana = () => {
  const [step, setStep] = useState(1);

  const formik = useFormik({
    initialValues: {
      owner: "",
      regNumber: "",
      nationalId: "",
      phone: "",
      guaranteeAmount: "",
      code: "",
    },
    validationSchema: validationSchemas[step],
    onSubmit: (values) => {
      if (step < steps.length - 1) {
        setStep((prev) => prev + 1);
        formik.setTouched({});
      } else {
        console.log("Final Form Values:", values);
      }
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

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
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* --- Step 0 --- */}
            {step === 0 && <Step0 formik={formik} getError={getError} />}

            {/* --- Step 1 --- */}
            {step === 1 && <Step1 formik={formik} getError={getError} />}

            {/* --- Step 2 --- */}
            {step === 2 && <Step2 formik={formik} getError={getError} />}

            {/* --- Buttons --- */}
            <div className="flex justify-between">
              <button type="submit" className="mainBtn">
                {step === steps.length - 1 ? "إرسال" : "التالي"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default AddDamana;
