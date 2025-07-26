import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../../components/common/Breadcrumbs";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import StepProgress from "../../../../components/common/StepProgress/StepProgress";
import { ImArrowRight } from "react-icons/im";

const steps = ["معلومات الحساب", "معلومات إضافية", "التحقق"];

const stepSchemas = [
  Yup.object({
    userType: Yup.string().required("نوع المستخدم مطلوب"),
    fullNameAr: Yup.string()
      .required("الاسم بالعربية مطلوب")
      .min(3, "الاسم بالعربية يجب أن لا يقل عن 3 حروف"),
    fullNameEn: Yup.string()
      .required("الاسم بالإنجليزية مطلوب")
      .min(3, "الاسم بالإنجليزية يجب أن لا يقل عن 3 حروف"),
    nationality: Yup.string().required("الجنسية مطلوبة"),
    documentType: Yup.string().required("نوع الوثيقة مطلوب"),
    documentNumber: Yup.number()
      .required("رقم الوثيقة مطلوب")
      .min(3, "رقم الوثيقة يجب أن لا يقل عن 3 أرقام"),
    issueDate: Yup.string().required("تاريخ الاصدار مطلوب"),
    expiryDate: Yup.string().required("تاريخ الانتهاء مطلوب"),
    issueCountry: Yup.string().required("بلد الاصدار مطلوب"),
    birthPlace: Yup.string().required("مكان الميلاد مطلوب"),
    birthCountry: Yup.string().required("بلد الميلاد مطلوب"),
    birthCity: Yup.string().required("مدينة الميلاد مطلوبة"),
    motherName: Yup.string().required("اسم الأم مطلوب"),
    gender: Yup.string().required("الجنس مطلوب"),
  }),
  Yup.object({
    buildingNumber: Yup.number().required("رقم البناية مطلوب"),
    streetName: Yup.string().required("اسم الشارع مطلوب"),
    city: Yup.string().required("المدينة مطلوبة"),
    country: Yup.string().required("البلد مطلوب"),
    phone: Yup.number()
      .required("رقم الهاتف مطلوب")
      .min(9, "رقم الهاتف غير صالح"),
    email: Yup.string()
      .required("البريد الإلكتروني مطلوب")
      .email("البريد الإلكتروني غير صالح"),
  }),
  Yup.object({
    bankName: Yup.string().required("اسم البنك مطلوب"),
    branch: Yup.string().required("الفرع مطلوب"),
    swiftCode: Yup.string()
      .required("رمز سويفت مطلوب")
      .min(3, "رمز سويفت مطلوب"),
    accountNumber: Yup.number().required("رقم الحساب مطلوب"),
    iban: Yup.number()
      .required("الايبان البنكي مطلوب")
      .min(16, "الايبان البنكي مطلوب"),
  }),
];

const RegisterPerson = () => {
  const [step, setStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      userType: "",
      fullNameAr: "",
      fullNameEn: "",
      nationality: "",
      documentType: "",
      documentNumber: "",
      issueDate: "",
      expiryDate: "",
      issueCountry: "",
      birthPlace: "",
      birthCountry: "",
      birthCity: "",
      motherName: "",
      gender: "",
      buildingNumber: "",
      streetName: "",
      city: "",
      country: "",
      phone: "",
      email: "",
      bankName: "",
      branch: "",
      swiftCode: "",
      accountNumber: "",
      iban: "",
    },
    validationSchema: stepSchemas[step],
    validateOnBlur: true,
    onSubmit: (values) => {
      if (step < 2) {
        setStep((prevStep) => prevStep + 1);
        formik.setTouched({});
      } else {
        console.log("البيانات كاملة:", values);
      }
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-8">أهلاً في ضمانة!</h2>
        <Breadcrumbs
          items={[{ label: "ضمانة", path: "/" }, { label: "انشاء حساب جديد" }]}
        />
      </div>

      <StepProgress steps={steps} currentStep={step} />

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">اكد هويتك الشخصية</h3>
        <p className="text-neutral-500">
          حتى تتمكن من انشاء معامله فى ضمانة, واستخدام ميزات التطبيق, اكد هويتك
          وبيانات البنك الخاص بك
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {step === 0 && <Step0 formik={formik} getError={getError} />}
        {step === 1 && <Step1 formik={formik} getError={getError} />}
        {step === 2 && <Step2 formik={formik} getError={getError} />}

        <button type="submit" className="mainBtn w-full">
          {step < 2 ? "التالي" : "إنهاء"}
        </button>

        <p className="text-center">
          هل تمتلك حساب؟{" "}
          <Link
            to="/auth/login"
            className="text-secondary hover:brightness-50 transition-colors"
          >
            تسجيل الدخول
          </Link>
        </p>

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
    </>
  );
};

export default RegisterPerson;
