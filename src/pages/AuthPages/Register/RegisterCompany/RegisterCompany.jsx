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
  Yup.object({
    authorizationText: Yup.string().required("مطلوب"),
    fullName2: Yup.string().required("مطلوب"),
    nationality2: Yup.string().required("مطلوب"),
    nationalIdOrPassport2: Yup.string().required("مطلوب"),
    jobTitle2: Yup.string().required("مطلوب"),
    address3: Yup.string().required("مطلوب"),
    authorizationType: Yup.string().required("مطلوب"),
    authorizationLimit: Yup.number().typeError("رقم فقط").required("مطلوب"),
    authorizationValidity: Yup.string().required("مطلوب"),
    phone3: Yup.string().required("مطلوب"),
    email3: Yup.string().email("بريد غير صحيح").required("مطلوب"),
    isPrimaryContact: Yup.boolean(),
  }),
  Yup.object({
    bankName: Yup.string().required("مطلوب"),
    accountNumber: Yup.string().required("مطلوب"),
    iban: Yup.string().required("مطلوب"),
    swiftCode: Yup.string().required("مطلوب"),
    currencyBank: Yup.string().required("مطلوب"),
    branch: Yup.string().required("مطلوب"),
    cliqUser: Yup.string().required("مطلوب"),
  }),
  Yup.object({
    commercialReg: Yup.mixed().required("هذا الحقل مطلوب"),
    establishmentContract: Yup.mixed().required("هذا الحقل مطلوب"),
    addressLicense: Yup.mixed().required("هذا الحقل مطلوب"),
    delegateID: Yup.mixed().required("هذا الحقل مطلوب"),
  }),
  Yup.object({
    approval: Yup.boolean()
      .oneOf([true], "يجب الموافقة على الإقرار والتعهد")
      .required("هذا الحقل مطلوب"),
  }),
  Yup.object({
    group: Yup.string().required("هذا الحقل مطلوب"),
    approval: Yup.boolean()
      .oneOf([true], "يجب الموافقة على الإقرار والتعهد")
      .required("هذا الحقل مطلوب"),
  }),
];

const RegisterCompany = () => {
  const [step, setStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      // Step 0 values
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
      // Step 1 values
      fullName: "",
      nationality: "",
      nationalIdOrPassport: "",
      address2: "",
      phone2: "",
      email2: "",
      // Step 2 values (delegates)
      authorizationText: "",
      fullName2: "",
      nationality2: "",
      nationalIdOrPassport2: "",
      jobTitle2: "",
      address3: "",
      authorizationType: "",
      authorizationLimit: "",
      authorizationValidity: "",
      phone3: "",
      email3: "",
      isPrimaryContact: false,
      // Step 3 values
      bankName: "",
      accountNumber: "",
      iban: "",
      swiftCode: "",
      currencyBank: "",
      branch: "",
      cliqUser: "",
      // Step 4 values
      commercialReg: null,
      establishmentContract: null,
      addressLicense: null,
      delegateID: null,
      // Step 5 values
      approval: false,
      // Step 6 values
      group: "",
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
        return (
          <Step6Company
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
    </>
  );
};

export default RegisterCompany;
