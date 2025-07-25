import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../../../components/common/Breadcrumbs";
import StepProgress from "../../../../components/common/StepProgress/StepProgress";
import Step0Company from "./steps/Step0Company";
import FileUploadSection from "./FileUploadSection";
import Step1Company from "./steps/Step1Company";
import Step2Company from "./steps/Step2Company";
import Step3Company from "./steps/Step3Company";
import Step4Company from "./steps/Step4Company";
import Step5Company from "./steps/Step5Company";
import Step6Company from "./steps/Step6Company";
import { ImArrowRight } from "react-icons/im";
import AuthLayout from "../../../../components/layout/AuthLayout";
import get from "lodash.get";

const steps = [
  "القسم الاول: بيانات الشركة",
  "القسم الثاني: بيانات المالكين/الشركاء",
  "القسم الثالث: المفوضين بالتوقيع والاداره",
  "القسم الرابع: بيانات الحساب البنكي",
  "القسم الخامس: الوثائق المطلوبة",
  "القسم السادس: اقرار وتعهد",
  "الخطوة الأخيرة: تحديد المجموعة",
];

const FILE_SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
];

const partnerYup = Yup.object({
  full_name: Yup.string().required("الحقل مطلوب"),
  nationality: Yup.string().required("الحقل مطلوب"),
  national_passport_number: Yup.string().required("الحقل مطلوب"),
  address: Yup.string().required("الحقل مطلوب"),
  phone: Yup.string().required("الحقل مطلوب"),
  email: Yup.string().email("بريد غير صحيح").required("الحقل مطلوب"),
});

const stepSchemas = [
  // Step 1
  Yup.object({
    ar_name: Yup.string().required("الحقل مطلوب"),
    en_name: Yup.string().required("الحقل مطلوب"),
    commercial_ar_name: Yup.string().required("الحقل مطلوب"),
    commercial_en_name: Yup.string().required("الحقل مطلوب"),
    registration_type_legal_form: Yup.string().required("الحقل مطلوب"),
    country_registration: Yup.string().required("الحقل مطلوب"),
    registration_authority: Yup.string().required("الحقل مطلوب"), // أضف هذا
    commercial_registration_number: Yup.string().required("الحقل مطلوب"),
    registration_date: Yup.string().required("الحقل مطلوب"),
    national_number: Yup.string().required("الحقل مطلوب"),
    website_url: Yup.string()
      .required("الحقل مطلوب")
      .url("عنوان موقع غير صالح"),
    license_number: Yup.string().required("الحقل مطلوب"),
    address: Yup.string().required("الحقل مطلوب"),
    email: Yup.string().email("بريد غير صحيح").required("الحقل مطلوب"),
    phone: Yup.string().required("الحقل مطلوب"),
    tax_number: Yup.string().required("الحقل مطلوب"),
    capital_equity: Yup.string().required("الحقل مطلوب"),
    signed_name: Yup.string().required("الحقل مطلوب"),
  }),

  // Step 2
  Yup.object({
    partners: Yup.array()
      .of(partnerYup)
      .min(1, "يجب إضافة شريك واحد على الأقل"),
  }),

  // Step 3
  Yup.object({
    commissioners_text: Yup.string().required("الحقل مطلوب"),
    commissioners: Yup.array().of(
      Yup.object({
        full_name: Yup.string().required("الحقل مطلوب"),
        nationality: Yup.string().required("الحقل مطلوب"),
        national_passport_number: Yup.string().required("الحقل مطلوب"),
        job: Yup.string().required("الحقل مطلوب"),
        address: Yup.string().required("الحقل مطلوب"),
        type: Yup.string().required("الحقل مطلوب"),
        top_commissioner: Yup.string().required("الحقل مطلوب"),
        commissioner_permissions: Yup.string().required("الحقل مطلوب"),
        phone: Yup.string().required("الحقل مطلوب"),
        email: Yup.string().email("بريد غير صحيح").required("الحقل مطلوب"),
        delegation_permissions: Yup.string().required("الحقل مطلوب"),
      })
    ),
    managementCommissioners: Yup.object().shape({
      full_name: Yup.string().required("الحقل مطلوب"),
      nationality: Yup.string().required("الحقل مطلوب"),
      national_passport_number: Yup.string().required("الحقل مطلوب"),
      address: Yup.string().required("الحقل مطلوب"),
      type: Yup.string().required("الحقل مطلوب"),
      top_commissioner: Yup.string().required("الحقل مطلوب"),
      commissioner_permissions: Yup.string().required("الحقل مطلوب"),
      phone: Yup.string().required("الحقل مطلوب"),
      email: Yup.string().email("بريد غير صحيح").required("الحقل مطلوب"),
      delegation_permissions: Yup.string().required("الحقل مطلوب"),
    }),
  }),

  // Step 4
  Yup.object({
    bank_name: Yup.string().required("اسم البنك مطلوب"),
    account_number: Yup.string().required("رقم الحساب مطلوب"),
    iban: Yup.string().required("رقم الايبان مطلوب"),
    branch: Yup.string().required("اسم الفرع مطلوب"),
    swift_code: Yup.string().required("رمز السويفت مطلوب"),
    currency: Yup.string().required("العملة مطلوبة"),
    clik_name: Yup.string().required("العملة مطلوبة"),
    info_name: Yup.string().required("اسم المصرح بالبيانات مطلوب"),
  }),

  // Step 5
  Yup.object({
    file_commercial_register: Yup.mixed()
      .required("ملف السجل التجاري مطلوب")
      .test(
        "fileFormat",
        "صيغة ملف غير مدعومة. فقط صور و PDF مسموح بها.",
        (value) => value && FILE_SUPPORTED_FORMATS.includes(value.type)
      ),
    file_memorandum_association: Yup.mixed()
      .required("ملف عقد التأسيس مطلوب")
      .test(
        "fileFormat",
        "صيغة ملف غير مدعومة. فقط صور و PDF مسموح بها.",
        (value) => value && FILE_SUPPORTED_FORMATS.includes(value.type)
      ),
    file_Professional_License_lease_contract: Yup.mixed()
      .required("ملف الترخيص أو عقد الإيجار مطلوب")
      .test(
        "fileFormat",
        "صيغة ملف غير مدعومة. فقط صور و PDF مسموح بها.",
        (value) => value && FILE_SUPPORTED_FORMATS.includes(value.type)
      ),
    file_identity_document_signatories: Yup.mixed()
      .required("ملف الهوية للموقعين مطلوب")
      .test(
        "fileFormat",
        "صيغة ملف غير مدعومة. فقط صور و PDF مسموح بها.",
        (value) => value && FILE_SUPPORTED_FORMATS.includes(value.type)
      ),
  }),

  // Step 6
  Yup.object({
    acknowledgement: Yup.string().oneOf(
      ["yes"],
      "يجب الموافقة على الإقرار قبل المتابعة"
    ),
  }),

  // Step 7
  Yup.object({
    group_id: Yup.object(),
    accept_policy_terms: Yup.string().oneOf(
      ["yes"],
      "يجب الموافقة على الإقرار قبل المتابعة"
    ),
  }),
];

const RegisterCompany = () => {
  const [step, setStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      // Step 0 (Step 1 في الـ Schema)
      ar_name: "",
      en_name: "",
      commercial_ar_name: "",
      commercial_en_name: "",
      registration_type_legal_form: "",
      country_registration: "",
      registration_authority: "",
      commercial_registration_number: "",
      registration_date: "",
      national_number: "",
      website_url: "",
      license_number: "",
      address: "",
      email: "",
      phone: "",
      tax_number: "",
      capital_equity: "",
      signed_name: "",

      // Step 1 (Step 2 في الـ Schema)
      partners: [
        {
          full_name: "",
          nationality: "",
          national_passport_number: "",
          address: "",
          phone: "",
          email: "",
        },
      ],

      // Step 2 (Step 3 في الـ Schema)
      commissioners_text: "",
      commissioners: [
        {
          full_name: "",
          nationality: "",
          national_passport_number: "",
          job: "",
          address: "",
          type: "",
          top_commissioner: "",
          commissioner_permissions: "",
          phone: "",
          email: "",
          delegation_permissions: "",
        },
      ],
      managementCommissioners: {
        full_name: "",
        nationality: "",
        national_passport_number: "",
        address: "",
        type: "",
        top_commissioner: "",
        commissioner_permissions: "",
        phone: "",
        email: "",
        delegation_permissions: "",
      },

      // Step 3 (Step 4 في الـ Schema)
      bank_name: "",
      account_number: "",
      iban: "",
      branch: "",
      swift_code: "",
      currency: "",
      clik_name: "",
      info_name: "",

      // Step 4 (Step 5 في الـ Schema)
      file_commercial_register: null,
      file_memorandum_association: null,
      file_Professional_License_lease_contract: null,
      file_identity_document_signatories: null,

      // Step 5 (Step 6 في الـ Schema)
      acknowledgement: "",

      // Step 6 (Step 7 في الـ Schema)
      group_id: {},
      accept_policy_terms: "",
    },
    validationSchema: stepSchemas[step],
    validateOnBlur: true,
    onSubmit: (values) => {
      if (step < stepSchemas.length - 1) {
        setStep((prev) => prev + 1);
        formik.setTouched({});
      } else {
        console.log("بيانات الشركة:", values);
      }
    },
  });

  // const getError = (name) =>
  //   formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  const getError = (name) => {
    const touched = get(formik.touched, name);
    const error = get(formik.errors, name);
    return touched && error ? error : "";
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step0Company formik={formik} getError={getError} />;

      case 1:
        return <Step1Company formik={formik} getError={getError} />;

      case 2:
        return <Step2Company formik={formik} getError={getError} />;

      case 3:
        return <Step3Company formik={formik} getError={getError} />;

      case 4:
        return <Step4Company formik={formik} getError={getError} />;

      case 5:
        return <Step5Company formik={formik} getError={getError} />;

      case 6:
        return <Step6Company formik={formik} getError={getError} />;

      default:
        return null;
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-8">أهلاً في ضمانة!</h2>
        <Breadcrumbs
          items={[{ label: "ضمانة", path: "/" }, { label: "طلب انضمام شركة" }]}
        />
      </div>

      {step === 0 && <FileUploadSection />}

      <StepProgress steps={steps} currentStep={step} />

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg text-white font-bold bg-primary p-4 rounded-e-2xl w-fit">
          {steps[step]}
        </h3>

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
            <ImArrowRight />
            الرجوع للخلف
          </button>
        )}
      </form>
    </AuthLayout>
  );
};

export default RegisterCompany;
