import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import MainInput from "../../../components/form/MainInput";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  Earth,
  FileDigit,
  MapPinHouse,
  Newspaper,
  User,
  UserRoundPen,
} from "lucide-react";

const steps = ["معلومات الحساب", "معلومات إضافية", "التحقق"];

const schemas = [
  z.object({
    userType: z.string().min(1, "نوع المستخدم مطلوب"),
    fullNameAr: z.string().min(3, "الاسم بالعربية مطلوب"),
    fullNameEn: z.string().min(3, "الاسم بالإنجليزية مطلوب"),
    nationality: z.string().min(1, "الجنسية مطلوبة"),
    documentType: z.string().min(1, "نوع الوثيقة مطلوب"),
    documentNumber: z.string().min(3, "رقم الوثيقة مطلوب"),
    issueDate: z.string().min(1, "تاريخ الاصدار مطلوب"),
    expiryDate: z.string().min(1, "تاريخ الانتهاء مطلوب"),
    issueCountry: z.string().min(1, "بلد الاصدار مطلوب"),
    birthDate: z.string().min(1, "تاريخ الميلاد مطلوب"),
    birthPlace: z.string().min(1, "مكان الميلاد مطلوب"),
    birthCountry: z.string().min(1, "بلد الميلاد مطلوب"),
    birthCity: z.string().min(1, "مدينة الميلاد مطلوبة"),
    motherName: z.string().min(1, "اسم الأم مطلوب"),
    gender: z.string().min(1, "الجنس مطلوب"),
  }),
  z.object({
    buildingNumber: z.string().min(1, "رقم البناية مطلوب"),
    streetName: z.string().min(1, "اسم الشارع مطلوب"),
    city: z.string().min(1, "المدينة مطلوبة"),
    country: z.string().min(1, "البلد مطلوب"),
    phone: z.string().min(9, "رقم الهاتف غير صالح"),
    email: z.string().email("البريد الإلكتروني غير صالح"),
  }),
  z.object({
    bankName: z.string().min(1, "اسم البنك مطلوب"),
    branch: z.string().min(1, "الفرع مطلوب"),
    swiftCode: z.string().min(3, "رمز سويفت مطلوب"),
    accountNumber: z.string().min(1, "رقم الحساب مطلوب"),
    iban: z.string().min(16, "الايبان البنكي مطلوب"),
  }),
];

const RegisterPerson = () => {
  const [step, setStep] = useState(0);
  const currentSchema = schemas[step];

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(currentSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) return;

    if (step < 2) return setStep((prev) => prev + 1);

    console.log("بيانات كاملة:", data);
  };

  return (
    <>
      {/* العنوان والمؤشر */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">أهلاً في ضمانة!</h2>

        <Breadcrumbs
          items={[{ label: "ضمانة", path: "/" }, { label: "انشاء حساب جديد" }]}
        />
      </div>

      <div
        className="flex justify-between gap-4 mb-10 relative
        before:absolute before:top-1/2 before:left-0 before:w-full before:h-[2px] before:bg-neutral-300 before:z-[-1]"
      >
        {steps.map((label, i) => (
          <span
            onClick={() => setStep(i)}
            key={label}
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
        <h2 className="text-2xl font-bold mb-4">اكد هويتك الشخصية</h2>
        <p className="text-neutral-500">
          حتى تتمكن من انشاء معامله فى ضمانة, واستخدام ميزات التطبيق, اكد هويتك
          وبيانات البنك الخاص بك
        </p>
      </div>

      {/* الفورم حسب الخطوة */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MainInput
              label="نوع المستخدم"
              id="userType"
              type="select"
              options={[
                { value: "فرد", label: "فرد" },
                { value: "شركة", label: "شركة" },
              ]}
              {...register("userType")}
              error={errors.userType?.message}
              icon={<UserRoundPen />}
            />

            <MainInput
              label="الاسم رباعي باللغة العربية"
              id="fullNameAr"
              placeholder="مثال: ياسمين حسن أحمد مقداد"
              {...register("fullNameAr")}
              error={errors.fullNameAr?.message}
              icon={<User />}
            />

            <MainInput
              label="الاسم رباعي باللغة الإنجليزية"
              id="fullNameEn"
              placeholder="Yasmeen Hassan Ahmed Moqdad"
              {...register("fullNameEn")}
              error={errors.fullNameEn?.message}
              icon={<User />}
            />

            <MainInput
              label="الجنسية"
              id="nationality"
              placeholder="أردني"
              {...register("nationality")}
              error={errors.nationality?.message}
              icon={<Earth />}
            />

            <MainInput
              label="نوع الوثيقة"
              id="documentType"
              type="select"
              options={[
                { value: "جواز السفر", label: "جواز السفر" },
                { value: "الهوية", label: "الهوية" },
              ]}
              {...register("documentType")}
              error={errors.documentType?.message}
              icon={<Newspaper />}
            />

            <MainInput
              label="رقم الوثيقة"
              id="documentNumber"
              placeholder="5433455"
              {...register("documentNumber")}
              error={errors.documentNumber?.message}
              icon={<FileDigit />}
            />

            <MainInput
              label="بلد الاصدار"
              id="issueCountry"
              placeholder="الأردن"
              {...register("issueCountry")}
              error={errors.issueCountry?.message}
              icon={<Earth />}
            />

            <MainInput
              label="تاريخ الاصدار"
              id="issueDate"
              type="date"
              {...register("issueDate")}
              error={errors.issueDate?.message}
            />

            <MainInput
              label="تاريخ الانتهاء"
              id="expiryDate"
              type="date"
              {...register("expiryDate")}
              error={errors.expiryDate?.message}
            />

            <MainInput
              label="مكان الولادة"
              id="birthplace"
              placeholder="عمان"
              {...register("birthPlace")}
              error={errors.birthPlace?.message}
              icon={<MapPinHouse />}
            />

            <MainInput
              label="الجنس"
              id="gender"
              type="select"
              options={[
                { value: "ذكر", label: "ذكر" },
                { value: "أنثى", label: "أنثى" },
              ]}
              {...register("gender")}
              error={errors.gender?.message}
              icon={<Earth />}
            />

            <MainInput
              label="اسم الأم"
              id="motherName"
              placeholder="شوق"
              {...register("motherName")}
              error={errors.motherName?.message}
              icon={<Earth />}
            />

            <MainInput
              label="بلد الاقامه"
              id="birthCountry"
              placeholder="الأردن"
              {...register("birthCountry")}
              error={errors.birthCountry?.message}
              icon={<Earth />}
            />

            <MainInput
              label="مدينة الولادة"
              id="birthCity"
              placeholder="عمان"
              {...register("birthCity")}
              error={errors.birthCity?.message}
              icon={<Earth />}
            />
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full">
              <MainInput
                label="رقم البناية"
                id="buildingNumber"
                placeholder="6655685657"
                {...register("buildingNumber")}
                error={errors.buildingNumber?.message}
              />
            </div>

            <div className="w-full">
              <MainInput
                label="اسم الشارع"
                id="streetName"
                placeholder="شارع النصر"
                {...register("streetName")}
                error={errors.streetName?.message}
              />
            </div>

            <div className="w-full">
              <MainInput
                label="المدينة"
                id="city"
                placeholder="عمان"
                {...register("city")}
                error={errors.city?.message}
              />
            </div>

            <div className="w-full">
              <MainInput
                label="البلد"
                id="country"
                placeholder="الأردن"
                {...register("country")}
                error={errors.country?.message}
              />
            </div>

            <div className="w-full">
              <MainInput
                label="رقم الهاتف"
                id="phone"
                placeholder="+96269077885"
                {...register("phone")}
                error={errors.phone?.message}
              />
            </div>

            <div className="w-full">
              <MainInput
                label="البريد الإلكتروني"
                id="email"
                placeholder="yasmeeen@gmail.com"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <MainInput
              label="اسم البنك"
              id="bankName"
              placeholder="بنك الاتحاد"
              {...register("bankName")}
              error={errors.bankName?.message}
            />

            <MainInput
              label="الفرع"
              id="branch"
              placeholder="ادخار"
              {...register("branch")}
              error={errors.branch?.message}
            />

            <MainInput
              label="رمز سويفت"
              id="swiftCode"
              placeholder="AAA564"
              {...register("swiftCode")}
              error={errors.swiftCode?.message}
            />

            <MainInput
              label="رقم الحساب"
              id="accountNumber"
              placeholder="55890064"
              {...register("accountNumber")}
              error={errors.accountNumber?.message}
            />

            <MainInput
              label="الايبان البنكي (الحساب الدولي)"
              id="iban"
              placeholder="PS33PALS004612813490013100000"
              {...register("iban")}
              error={errors.iban?.message}
            />

          </>
        )}

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
            className="text-sm text-neutral-500 hover:text-secondary"
            onClick={() => setStep((prev) => prev - 1)}
          >
            الرجوع للخلف
          </button>
        )}
      </form>
    </>
  );
};

export default RegisterPerson;
