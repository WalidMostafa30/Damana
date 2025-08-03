import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepProgressCol from "../../components/common/StepProgress/StepProgressCol";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import PageTitle from "../../components/common/PageTitle";
import FormError from "../../components/form/FormError";
import FormBtn from "../../components/form/FormBtn";
import { ImArrowRight } from "react-icons/im";

const steps = ["المعلومات الأساسية", "بيانات الأطراف", "بيانات الضمانة"];

const validationSchemas = [
  // Step One
  Yup.object().shape({
    owner: Yup.string().required("اختيار المالك مطلوب"),
    // لو المالك مش انت يبقى الحقول دي مطلوبة
    ownerNationalId: Yup.string().when("owner", {
      is: "no",
      then: (schema) => schema.required("الرقم الوطني للمالك مطلوب"),
      otherwise: (schema) => schema.notRequired(),
    }),
    ownerPhone: Yup.string().when("owner", {
      is: "no",
      then: (schema) => schema.required("رقم هاتف المالك مطلوب"),
      otherwise: (schema) => schema.notRequired(),
    }),
    vehicleRegistrationNumber: Yup.string().required("رقم تسجيل المركبة مطلوب"),
    agreement: Yup.boolean().oneOf([true], "يجب الموافقة على الشروط"),
  }),

  // Step Two
  Yup.object({}),

  // Step Three
  Yup.object({
    buyer_national_number: Yup.string()
      .length(10, "يرجى ادخال الرقم الوطني صحيح مكون من 10 خانات")
      .required("يرجى ادخال الرقم الوطني صحيح مكون من 10 خانات"),
    buyer_name: Yup.string().required("يرجى ادخال الاسم الرباعي"),
    buyer_full_mobile: Yup.string().required("يرجى ادخال رقم الهاتف"),
    buyer_email: Yup.string().required("يرجى ادخال البريد الالكتروني"),
    buyer_country_code: Yup.string().required("رقم الهاتف مطلوب"),
    buyer_mobile: Yup.string().required("رقم الهاتف مطلوب"),
    vehicle_price: Yup.string().required("يرجى ادخال قيمه المركبه"),
    commission_on: Yup.object().required("يجب اختيار العموله"),
    code: Yup.string().max(10, "يرجى ادخال كود صحيح"),
  }),
];

const AddDamana = () => {
  const [step, setStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      // Step One
      owner: "yes",
      ownerNationalId: "",
      ownerPhone: "",
      vehicleRegistrationNumber: "",
      agreement: false,

      // Step Three
      buyer_national_number: "",
      buyer_name: "",
      buyer_full_mobile: "",
      buyer_email: "",
      buyer_country_code: "",
      buyer_mobile: "",
      vehicle_price: "",
      commission_on: "",
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
            {step === 0 && <Step0 formik={formik} getError={getError} />}
            {step === 1 && <Step1 formik={formik} getError={getError} />}
            {step === 2 && <Step2 formik={formik} getError={getError} />}
            <FormError errorMsg={errorMsg} />
            <FormBtn title={step === steps.length - 1 ? "إرسال" : "التالي"} />

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
          </form>
        </div>
      </section>
    </section>
  );
};

export default AddDamana;
