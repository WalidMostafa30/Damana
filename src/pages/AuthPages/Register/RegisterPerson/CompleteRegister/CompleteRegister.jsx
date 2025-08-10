import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import StepProgress from "../../../../../components/common/StepProgress/StepProgress";
import { ImArrowRight } from "react-icons/im";
import AuthLayout from "../../../../../components/common/AuthLayout";
import FormError from "../../../../../components/form/FormError";
import FormBtn from "../../../../../components/form/FormBtn";
import ActionModal from "../../../../../components/modals/ActionModal";
import AuthBreadcrumbs from "../../../../../components/common/AuthBreadcrumbs";

const steps = ["معلومات الحساب", "معلومات إضافية"];

const stepSchemas = [
  Yup.object({
    dob: Yup.string().required("تاريخ الميلاد مطلوب"),
    national_number: Yup.string().required("الرقم الوطني مطلوب"),
    nationality_type: Yup.string().required("نوع الجنسية مطلوب"),
    country_id: Yup.string().required("الدوله مطلوبة"),
    document_id: Yup.string().required("رقم الهويه مطلوب"),
  }),
  Yup.object({
    address_building_number: Yup.string().required("رقم البناية مطلوب"),
    address_street_name: Yup.string().required("اسم الشارع مطلوب"),
    address_country_id: Yup.string().required("البلد مطلوب"),
    address_city_town: Yup.string().required("المدينة مطلوبة"),
    iban: Yup.string()
      .required("رقم الايبان مطلوب")
      .min(16, "رقم الايبان غير صالح"),
    currency: Yup.string().required("رقم الحساب مطلوب"),
    clik_name: Yup.string().required("اسم البنك مطلوب"),
    bank_id: Yup.string().required("اسم الفرع مطلوب"),
  }),
];

const CompleteRegister = () => {
  const [step, setStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      // step 0
      dob: "",
      national_number: "",
      nationality_type: "",
      country_id: "",
      document_id: "",

      // step 1
      address_building_number: "",
      address_street_name: "",
      address_country_id: "",
      address_city_town: "",
      iban: "",
      currency: "",
      clik_name: "",
      bank_id: "",
    },
    validationSchema: stepSchemas[step],
    validateOnBlur: true,
    onSubmit: (values) => {
      if (step < 2) {
        setStep((prevStep) => prevStep + 1);
        formik.setTouched({});
      } else {
        console.log("البيانات كاملة:", values);
        setOpenModal(true);
      }
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  const navigate = useNavigate();

  return (
    <>
      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        msg="تم تأكيد الهوية وبياناتك البنكيه تسطتيع انشاء ضمانتك"
        primaryBtn={{ text: "الصفحة الرئيسية", action: () => navigate("/") }}
      />

      <AuthLayout>
        <AuthBreadcrumbs
          title="أهلاً في ضمانة!"
          items={[{ label: "ضمانة", path: "/" }, { label: "انشاء حساب جديد" }]}
        />

        <StepProgress steps={steps} currentStep={step} />

        <div className="mb-8">
          <h3 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
            اكد هويتك الشخصية
          </h3>
          <p className="text-sm lg:text-base text-neutral-500">
            حتى تتمكن من انشاء معامله فى ضمانة, واستخدام ميزات التطبيق, اكد
            هويتك وبيانات البنك الخاص بك
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {step === 0 && <Step0 formik={formik} getError={getError} />}
          {step === 1 && <Step1 formik={formik} getError={getError} />}

          <FormError errorMsg={errorMsg} />

          <FormBtn title={step < 2 ? "التالي" : "إنهاء"} />

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
    </>
  );
};

export default CompleteRegister;
