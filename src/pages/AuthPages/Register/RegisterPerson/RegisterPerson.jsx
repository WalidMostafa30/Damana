import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import AuthBreadcrumbs from "../../../../components/common/AuthBreadcrumbs";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import StepProgress from "../../../../components/common/StepProgress/StepProgress";
import { ImArrowRight } from "react-icons/im";
import AuthLayout from "../../../../components/layout/AuthLayout";

const steps = ["معلومات الحساب", "معلومات إضافية", "التحقق"];

const stepSchemas = [
  Yup.object({
    account_type: Yup.string().required("نوع المستخدم مطلوب"),
    full_name_ar: Yup.string()
      .required("الاسم بالعربية مطلوب")
      .min(3, "الاسم بالعربية يجب أن لا يقل عن 3 حروف"),
    full_name_en: Yup.string()
      .required("الاسم بالإنجليزية مطلوب")
      .min(3, "الاسم بالإنجليزية يجب أن لا يقل عن 3 حروف"),
    nationality: Yup.string().required("الجنسية مطلوبة"),
    document_type: Yup.string().required("نوع الوثيقة مطلوب"),
    document_id: Yup.string()
      .required("رقم الوثيقة مطلوب")
      .min(3, "رقم الوثيقة يجب أن لا يقل عن 3 أرقام"),
    issuance_date: Yup.string().required("تاريخ الاصدار مطلوب"),
    expiry_date: Yup.string().required("تاريخ الانتهاء مطلوب"),
    country_of_issuance: Yup.string().required("بلد الاصدار مطلوب"),
    birth_place: Yup.string().required("مكان الميلاد مطلوب"),
    country_of_residency: Yup.string().required("بلد الإقامة مطلوب"),
    city_of_birth: Yup.string().required("مدينة الميلاد مطلوبة"),
    mother_name: Yup.string().required("اسم الأم مطلوب"),
    gender: Yup.string().required("الجنس مطلوب"),
  }),
  Yup.object({
    address_building_number: Yup.string().required("رقم البناية مطلوب"),
    address_street_name: Yup.string().required("اسم الشارع مطلوب"),
    address_city_town: Yup.string().required("المدينة مطلوبة"),
    address_country: Yup.string().required("البلد مطلوب"),
    full_mobile: Yup.string().required("رقم الهاتف مطلوب"),
    country_code: Yup.string().required("مفتاح الدولة مطلوب"),
    mobile: Yup.string().required("رقم الهاتف مطلوب"),
    email: Yup.string()
      .required("البريد الإلكتروني مطلوب")
      .email("البريد الإلكتروني غير صالح"),
  }),
  Yup.object({
    bank_name: Yup.string().required("اسم البنك مطلوب"),
    branch: Yup.string().required("اسم الفرع مطلوب"),
    swift_code: Yup.string()
      .required("رمز السويفت مطلوب")
      .min(3, "رمز السويفت مطلوب"),
    account_number: Yup.string().required("رقم الحساب مطلوب"),
    iban: Yup.string()
      .required("رقم الايبان مطلوب")
      .min(16, "رقم الايبان غير صالح"),
  }),
];

const RegisterPerson = () => {
  const [step, setStep] = useState(2);

  const formik = useFormik({
    initialValues: {
      account_type: "",
      full_name_ar: "",
      full_name_en: "",
      nationality: "",
      document_type: "",
      document_id: "",
      issuance_date: "",
      expiry_date: "",
      country_of_issuance: "",
      birth_place: "",
      country_of_residency: "",
      city_of_birth: "",
      mother_name: "",
      gender: "",

      address_building_number: "",
      address_street_name: "",
      address_city_town: "",
      address_country: "",
      full_mobile: "",
      country_code: "",
      mobile: "",
      email: "",

      bank_name: "",
      branch: "",
      swift_code: "",
      account_number: "",
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
    <AuthLayout>
      <AuthBreadcrumbs
        title="أهلاً في ضمانة!"
        items={[{ label: "ضمانة", path: "/" }, { label: "انشاء حساب جديد" }]}
      />

      <StepProgress steps={steps} currentStep={step} />

      <div className="mb-8">
        <h3 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">اكد هويتك الشخصية</h3>
        <p className="text-sm lg:text-base text-neutral-500">
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
            to="/login"
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
    </AuthLayout>
  );
};

export default RegisterPerson;
