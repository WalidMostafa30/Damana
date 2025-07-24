import {
  Backpack,
  Building,
  Building2,
  Code,
  Landmark,
  MailOpen,
} from "lucide-react";
import MainInput from "../../../../../components/form/MainInput/MainInput";

const Step0Company = ({ formik, getError }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="اسم الشركة باللغة العربية"
          id="companyNameAr"
          name="companyNameAr"
          placeholder="مثال: الشركة العربية"
          value={formik.values.companyNameAr}
          onChange={formik.handleChange}
          error={getError("companyNameAr")}
          icon={<Building />}
        />

        <MainInput
          label="اسم الشركة باللغة الإنجليزية"
          id="companyNameEn"
          name="companyNameEn"
          placeholder="Example: Arab Company"
          value={formik.values.companyNameEn}
          onChange={formik.handleChange}
          error={getError("companyNameEn")}
          icon={<Building />}
        />

        <MainInput
          label="الاسم التجاري باللغة العربية"
          id="tradeNameAr"
          name="tradeNameAr"
          placeholder="مثال: المتجر الذهبي"
          value={formik.values.tradeNameAr}
          onChange={formik.handleChange}
          error={getError("tradeNameAr")}
          icon={<Building2 />}
        />

        <MainInput
          label="الاسم التجاري باللغة الإنجليزية"
          id="tradeNameEn"
          name="tradeNameEn"
          placeholder="Example: Golden Store"
          value={formik.values.tradeNameEn}
          onChange={formik.handleChange}
          error={getError("tradeNameEn")}
          icon={<Building2 />}
        />

        <MainInput
          label="نوع التسجيل / الشكل القانوني"
          type="select"
          id="registrationType"
          name="registrationType"
          options={[
            { value: "مؤسسة", label: "مؤسسة" },
            { value: "شركة مساهمة", label: "شركة مساهمة" },
            {
              value: "شركة ذات مسؤولية محدودة",
              label: "شركة ذات مسؤولية محدودة",
            },
          ]}
          value={formik.values.registrationType}
          onChange={formik.handleChange}
          error={getError("registrationType")}
          icon={<Landmark />}
        />

        <MainInput
          label="بلد التسجيل / جنسية الشركة"
          type="select"
          id="country"
          name="country"
          options={[
            { value: "مصر", label: "مصر" },
            { value: "السعودية", label: "السعودية" },
            { value: "الإمارات", label: "الإمارات" },
          ]}
          value={formik.values.country}
          onChange={formik.handleChange}
          error={getError("country")}
          icon={<Landmark />}
        />

        <MainInput
          label="جهة التسجيل"
          id="registrationAuthority"
          name="registrationAuthority"
          placeholder="وزارة الصناعة"
          value={formik.values.registrationAuthority}
          onChange={formik.handleChange}
          error={getError("registrationAuthority")}
          icon={<Building />}
        />

        <MainInput
          label="رقم التسجيل"
          id="registrationNumber"
          name="registrationNumber"
          placeholder="123456"
          type="number"
          value={formik.values.registrationNumber}
          onChange={formik.handleChange}
          error={getError("registrationNumber")}
          icon={<Code />}
        />

        <MainInput
          label="تاريخ التسجيل"
          id="registrationDate"
          name="registrationDate"
          type="date"
          value={formik.values.registrationDate}
          onChange={formik.handleChange}
          error={getError("registrationDate")}
          icon={<Code />}
        />

        <MainInput
          label="الرقم الوطني للمنشأة"
          id="nationalCompanyId"
          name="nationalCompanyId"
          placeholder="0987654321"
          type="number"
          value={formik.values.nationalCompanyId}
          onChange={formik.handleChange}
          error={getError("nationalCompanyId")}
          icon={<Code />}
        />

        <MainInput
          label="الموقع الإلكتروني"
          id="website"
          name="website"
          placeholder="www.example.com"
          value={formik.values.website}
          onChange={formik.handleChange}
          error={getError("website")}
          icon={<Landmark />}
        />

        <MainInput
          label="رقم رخصة المهن"
          id="licenseNumber"
          name="licenseNumber"
          placeholder="555555"
          type="number"
          value={formik.values.licenseNumber}
          onChange={formik.handleChange}
          error={getError("licenseNumber")}
          icon={<Code />}
        />

        <MainInput
          label="العنوان"
          id="address"
          name="address"
          placeholder="شارع الملك عبدالله، الرياض"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={getError("address")}
          icon={<Building />}
        />

        <MainInput
          label="البريد الإلكتروني الرسمي للشركة"
          id="email"
          name="email"
          placeholder="info@company.com"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={getError("email")}
          icon={<Code />}
        />

        <MainInput
          label="رقم الهاتف"
          id="phone"
          name="phone"
          placeholder="0501234567"
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={getError("phone")}
          icon={<Building2 />}
        />

        <MainInput
          label="الرقم الضريبي"
          id="taxNumber"
          name="taxNumber"
          placeholder="123456789"
          type="number"
          value={formik.values.taxNumber}
          onChange={formik.handleChange}
          error={getError("taxNumber")}
          icon={<Code />}
        />

        <MainInput
          label="رأس المال"
          id="capital"
          name="capital"
          placeholder="100000"
          type="number"
          value={formik.values.capital}
          onChange={formik.handleChange}
          error={getError("capital")}
          icon={<Building />}
        />

        <MainInput
          label="العملة"
          type="select"
          id="currency"
          name="currency"
          options={[
            { value: "جنيه", label: "جنيه" },
            { value: "ريال", label: "ريال" },
            { value: "دولار", label: "دولار" },
          ]}
          value={formik.values.currency}
          onChange={formik.handleChange}
          error={getError("currency")}
          icon={<Backpack />}
        />
      </div>

      <p className="text-neutral-500 flex items-center gap-1">
        <MailOpen />
        الفان وخمس وعشرون دينار اردنى
      </p>
    </>
  );
};

export default Step0Company;
