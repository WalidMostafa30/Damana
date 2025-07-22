import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../../../components/common/Breadcrumbs";
import StepProgress from "../../../../components/common/StepProgress/StepProgress";
import { ArrowBigRight } from "lucide-react";
import Step0Company from "./steps/Step0Company";
import FileUploadSection from "./FileUploadSection";
import Step1Company from "./steps/Step1Company";

const steps = [
  "القسم الاول: بيانات الشركة",
  "القسم الثاني: بيانات المالكين/الشركاء",
  "القسم الثالث: المفوضين بالتوقيع والاداره",
  "القسم الرابع: بيانات الحساب البنكي",
  "القسم الخامس: الوثائق المطلوبة",
  "القسم السادس: اقرار وتعهد",
  "الخطوة الأخيرة: تحديد المجموعة",
];

const stepSchemas = [
  Yup.object({
    companyNameAr: Yup.string().required("مطلوب"),
    companyNameEn: Yup.string().required("مطلوب"),
    tradeNameAr: Yup.string().required("مطلوب"),
    tradeNameEn: Yup.string().required("مطلوب"),
    registrationType: Yup.string().required("مطلوب"),
    country: Yup.string().required("مطلوب"),
    registrationAuthority: Yup.string().required("مطلوب"),
    registrationNumber: Yup.number().required("مطلوب"),
    registrationDate: Yup.date().required("مطلوب"),
    nationalCompanyId: Yup.number().required("مطلوب"),
    website: Yup.string().required("مطلوب").url("رابط غير صحيح"),
    licenseNumber: Yup.number().required("مطلوب"),
    address: Yup.string().required("مطلوب"),
    email: Yup.string().required("مطلوب").email("بريد غير صحيح"),
    phone: Yup.number().required("مطلوب"),
    taxNumber: Yup.number().required("مطلوب"),
    capital: Yup.number().typeError("رقم فقط").required("مطلوب"),
    currency: Yup.string().required("مطلوب"),
  }),
  Yup.object({
    fullName: Yup.string().required("مطلوب"),
    nationality: Yup.string().required("مطلوب"),
    nationalIdOrPassport: Yup.string().required("مطلوب"),
    address2: Yup.string().required("مطلوب"),
    phone2: Yup.string().required("مطلوب"),
    email2: Yup.string().email("بريد غير صحيح").required("مطلوب"),
  }),
];

const RegisterCompany = () => {
  const [step, setStep] = useState(1);

  const formik = useFormik({
    initialValues: {
      // Step 1 values
      companyNameAr: "",
      companyNameEn: "",
      tradeNameAr: "",
      tradeNameEn: "",
      registrationType: "",
      country: "",
      registrationAuthority: "",
      registrationNumber: "",
      registrationDate: "",
      nationalCompanyId: "",
      website: "",
      licenseNumber: "",
      address: "",
      email: "",
      phone: "",
      taxNumber: "",
      capital: "",
      currency: "",
      // Step 2 values
      fullName: "",
      nationality: "",
      nationalIdOrPassport: "",
      address2: "",
      phone2: "",
      email2: "",
      // step 3 values
    },
    validationSchema: stepSchemas[step],
    validateOnBlur: true,
    onSubmit: (values) => {
      if (step < steps.length - 1) {
        setStep((prev) => prev + 1);
        formik.setTouched({});
      } else {
        console.log("بيانات الشركة:", values);
      }
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Step0Company
            formik={formik}
            getError={getError}
            title={steps[step]}
          />
        );

      case 1:
        return (
          <Step1Company
            formik={formik}
            getError={getError}
            title={steps[step]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-8">أهلاً في ضمانة!</h2>
        <Breadcrumbs
          items={[{ label: "ضمانة", path: "/" }, { label: "طلب انضمام شركة" }]}
        />
      </div>

      <FileUploadSection />

      <StepProgress steps={steps} currentStep={step} />

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        {renderStep()}

        <button type="submit" className="mainBtn w-full">
          {step < steps.length - 1 ? "التالي" : "إنهاء"}
        </button>

        {step > 0 && (
          <button
            type="button"
            className="text-neutral-500 hover:text-secondary flex items-center gap-1 cursor-pointer"
            onClick={() => setStep(step - 1)}
          >
            <ArrowBigRight />
            الرجوع للخلف
          </button>
        )}
      </form>
    </>
  );
};

export default RegisterCompany;
