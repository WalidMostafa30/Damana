import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import MainInput from "../../../../components/form/MainInput";
import Breadcrumbs from "../../../../components/common/Breadcrumbs";
import {
  Backpack,
  Building,
  Building2,
  Code,
  Earth,
  FileDigit,
  House,
  Landmark,
  Mail,
  MapPinHouse,
  MapPinned,
  Mars,
  Newspaper,
  Phone,
  Rows3,
  User,
  UserRoundPen,
} from "lucide-react";

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
    documentNumber: Yup.string()
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
    buildingNumber: Yup.string().required("رقم البناية مطلوب"),
    streetName: Yup.string().required("اسم الشارع مطلوب"),
    city: Yup.string().required("المدينة مطلوبة"),
    country: Yup.string().required("البلد مطلوب"),
    phone: Yup.string().min(9, "رقم الهاتف غير صالح"),
    email: Yup.string().email("البريد الإلكتروني غير صالح"),
  }),
  Yup.object({
    bankName: Yup.string().required("اسم البنك مطلوب"),
    branch: Yup.string().required("الفرع مطلوب"),
    swiftCode: Yup.string().min(3, "رمز سويفت مطلوب"),
    accountNumber: Yup.string().required("رقم الحساب مطلوب"),
    iban: Yup.string().min(16, "الايبان البنكي مطلوب"),
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

      <div className="flex justify-between gap-4 mb-10 relative before:absolute before:top-1/2 before:left-0 before:w-full before:h-[2px] before:bg-neutral-300 before:z-[-1]">
        {steps.map((label, i) => (
          <span
            key={label}
            onClick={() => setStep(i)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border cursor-pointer ${
              i === step
                ? "bg-primary-light border-primary-light drop-shadow-[2px_4px_4px_rgba(0,0,0,0.50)] text-white"
                : i < step
                ? "bg-primary border-primary text-white"
                : "bg-white border-neutral-300 text-neutral-500"
            }`}
          >
            {i + 1}
          </span>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">اكد هويتك الشخصية</h3>
        <p className="text-neutral-500">
          حتى تتمكن من انشاء معامله فى ضمانة, واستخدام ميزات التطبيق, اكد هويتك
          وبيانات البنك الخاص بك
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {step === 0 && (
          <>
            <h3 className="text-xl font-bold mb-4">بياناتك الشخصية</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MainInput
                label="نوع المستخدم"
                id="userType"
                name="userType"
                type="select"
                options={[
                  { value: "", label: "اختر نوع المستخدم" },
                  { value: "person", label: "فرد" },
                  { value: "company", label: "شركة" },
                ]}
                value={formik.values.userType}
                onChange={formik.handleChange}
                error={getError("userType")}
                icon={<UserRoundPen />}
              />
              <MainInput
                label="الاسم رباعي باللغة العربية"
                id="fullNameAr"
                name="fullNameAr"
                placeholder="ياسمين حسن"
                value={formik.values.fullNameAr}
                onChange={formik.handleChange}
                error={getError("fullNameAr")}
                icon={<User />}
              />
              <MainInput
                label="الاسم رباعي باللغة الإنجليزية"
                id="fullNameEn"
                name="fullNameEn"
                placeholder="Yasmeen Hassan"
                value={formik.values.fullNameEn}
                onChange={formik.handleChange}
                error={getError("fullNameEn")}
                icon={<User />}
              />
              <MainInput
                label="الجنسية"
                id="nationality"
                name="nationality"
                placeholder="أردني"
                value={formik.values.nationality}
                onChange={formik.handleChange}
                error={getError("nationality")}
                icon={<Earth />}
              />
              <MainInput
                label="نوع الوثيقة"
                id="documentType"
                name="documentType"
                type="select"
                options={[
                  { value: "", label: "اختر نوع الوثيقة" },
                  { value: "جواز السفر", label: "جواز السفر" },
                  { value: "الهوية", label: "الهوية" },
                ]}
                value={formik.values.documentType}
                onChange={formik.handleChange}
                error={getError("documentType")}
                icon={<Newspaper />}
              />
              <MainInput
                label="رقم الوثيقة"
                id="documentNumber"
                name="documentNumber"
                placeholder="5433455"
                value={formik.values.documentNumber}
                onChange={formik.handleChange}
                error={getError("documentNumber")}
                icon={<FileDigit />}
              />
              <MainInput
                label="بلد الاصدار"
                id="issueCountry"
                name="issueCountry"
                placeholder="الأردن"
                value={formik.values.issueCountry}
                onChange={formik.handleChange}
                error={getError("issueCountry")}
                icon={<Earth />}
              />
              <MainInput
                label="تاريخ الاصدار"
                id="issueDate"
                name="issueDate"
                type="date"
                value={formik.values.issueDate}
                onChange={formik.handleChange}
                error={getError("issueDate")}
              />
              <MainInput
                label="تاريخ الانتهاء"
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={formik.values.expiryDate}
                onChange={formik.handleChange}
                error={getError("expiryDate")}
              />
              <MainInput
                label="مكان الولادة"
                id="birthPlace"
                name="birthPlace"
                placeholder="عمان"
                value={formik.values.birthPlace}
                onChange={formik.handleChange}
                error={getError("birthPlace")}
                icon={<MapPinHouse />}
              />
              <MainInput
                label="الجنس"
                id="gender"
                name="gender"
                type="select"
                options={[
                  { value: "", label: "اختر الجنس" },
                  { value: "ذكر", label: "ذكر" },
                  { value: "أنثى", label: "أنثى" },
                ]}
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={getError("gender")}
                icon={<Mars />}
              />
              <MainInput
                label="اسم الأم"
                id="motherName"
                name="motherName"
                placeholder="شوق"
                value={formik.values.motherName}
                onChange={formik.handleChange}
                error={getError("motherName")}
                icon={<User />}
              />
              <MainInput
                label="بلد الاقامه"
                id="birthCountry"
                name="birthCountry"
                placeholder="الأردن"
                value={formik.values.birthCountry}
                onChange={formik.handleChange}
                error={getError("birthCountry")}
                icon={<Earth />}
              />
              <MainInput
                label="مدينة الولادة"
                id="birthCity"
                name="birthCity"
                placeholder="عمان"
                value={formik.values.birthCity}
                onChange={formik.handleChange}
                error={getError("birthCity")}
                icon={<MapPinHouse />}
              />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="text-xl font-bold mb-4">العنوان السكنى</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MainInput
                label="رقم البناية"
                id="buildingNumber"
                name="buildingNumber"
                placeholder="123"
                value={formik.values.buildingNumber}
                onChange={formik.handleChange}
                error={getError("buildingNumber")}
                icon={<House />}
              />
              <MainInput
                label="اسم الشارع"
                id="streetName"
                name="streetName"
                placeholder="شارع النصر"
                value={formik.values.streetName}
                onChange={formik.handleChange}
                error={getError("streetName")}
                icon={<Rows3 />}
              />
              <MainInput
                label="البلد"
                id="country"
                name="country"
                placeholder="الأردن"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={getError("country")}
                icon={<Earth />}
              />
              <MainInput
                label="المدينة"
                id="city"
                name="city"
                placeholder="عمان"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={getError("city")}
                icon={<MapPinned />}
              />
              <MainInput
                label="البريد الإلكتروني"
                id="email"
                name="email"
                placeholder="example@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={getError("email")}
                icon={<Mail />}
              />
              <MainInput
                label="رقم الهاتف"
                id="phone"
                name="phone"
                placeholder="+962"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={getError("phone")}
                icon={<Phone />}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-xl font-bold mb-4">البيانات البنكية</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MainInput
                label="اسم البنك"
                id="bankName"
                name="bankName"
                placeholder="بنك الاتحاد"
                value={formik.values.bankName}
                onChange={formik.handleChange}
                error={getError("bankName")}
                icon={<Landmark />}
              />
              <MainInput
                label="الفرع"
                id="branch"
                name="branch"
                placeholder="ادخار"
                value={formik.values.branch}
                onChange={formik.handleChange}
                error={getError("branch")}
                icon={<Building />}
              />
              <MainInput
                label="رمز سويفت"
                id="swiftCode"
                name="swiftCode"
                placeholder="AAA564"
                value={formik.values.swiftCode}
                onChange={formik.handleChange}
                error={getError("swiftCode")}
                icon={<Code />}
              />
            </div>

            <h3 className="text-2xl font-bold mb-4">بيانات الحساب</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MainInput
                label="رقم الحساب"
                id="accountNumber"
                name="accountNumber"
                placeholder="55890064"
                value={formik.values.accountNumber}
                onChange={formik.handleChange}
                error={getError("accountNumber")}
                icon={<Building2 />}
              />
              <MainInput
                label="الايبان البنكي (الحساب الدولي)"
                id="iban"
                name="iban"
                placeholder="PS33PALS004612813490013100000"
                value={formik.values.iban}
                onChange={formik.handleChange}
                error={getError("iban")}
                icon={<Backpack />}
              />
            </div>
          </>
        )}

        <button type="submit" className="mainBtn w-full">
          {step < 2 ? "التالي" : "إنهاء"}
        </button>

        <p className="text-center">
          هل تمتلك حساب؟
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
            className="text-sm text-neutral-500 hover:text-secondary"
            onClick={() => setStep(step - 1)}
          >
            الرجوع للخلف
          </button>
        )}
      </form>
    </>
  );
};

export default RegisterPerson;
