import { CgMailOpen } from "react-icons/cg";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { BsBank, BsBuildings, BsCalendar2Date } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuFileDigit } from "react-icons/lu";

const Step0Company = ({ formik, getError }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="اسم الشركة باللغة العربية"
          id="ar_name"
          name="ar_name"
          placeholder=" الشركة العربية"
          value={formik.values.ar_name}
          onChange={formik.handleChange}
          error={getError("ar_name")}
          icon={<BsBuildings />}
        />

        <MainInput
          label="اسم الشركة باللغة الإنجليزية"
          id="en_name"
          name="en_name"
          placeholder="Example: Arab Company"
          value={formik.values.en_name}
          onChange={formik.handleChange}
          error={getError("en_name")}
          icon={<BsBuildings />}
        />

        <MainInput
          label="الاسم التجاري باللغة العربية"
          id="commercial_ar_name"
          name="commercial_ar_name"
          placeholder="مثال: المتجر الذهبي"
          value={formik.values.commercial_ar_name}
          onChange={formik.handleChange}
          error={getError("commercial_ar_name")}
          icon={<BsBuildings />}
        />

        <MainInput
          label="الاسم التجاري باللغة الإنجليزية"
          id="commercial_en_name"
          name="commercial_en_name"
          placeholder="Example: Golden Store"
          value={formik.values.commercial_en_name}
          onChange={formik.handleChange}
          error={getError("commercial_en_name")}
          icon={<BsBuildings />}
        />

        <MainInput
          label="نوع التسجيل / الشكل القانوني"
          type="select"
          id="registration_type_legal_form"
          name="registration_type_legal_form"
          options={[
            { value: "مؤسسة", label: "مؤسسة" },
            { value: "شركة مساهمة", label: "شركة مساهمة" },
            {
              value: "شركة ذات مسؤولية محدودة",
              label: "شركة ذات مسؤولية محدودة",
            },
          ]}
          value={formik.values.registration_type_legal_form}
          onChange={formik.handleChange}
          error={getError("registration_type_legal_form")}
          icon={<FaRegFileAlt />}
        />

        <MainInput
          label="بلد التسجيل / جنسية الشركة"
          type="select"
          id="country_registration"
          name="country_registration"
          options={[
            { value: "مصر", label: "مصر" },
            { value: "السعودية", label: "السعودية" },
            { value: "الإمارات", label: "الإمارات" },
          ]}
          value={formik.values.country_registration}
          onChange={formik.handleChange}
          error={getError("country_registration")}
          icon={<IoLocationOutline />}
        />

        <MainInput
          label="جهة التسجيل"
          id="registration_authority"
          name="registration_authority"
          placeholder="وزارة الصناعة"
          value={formik.values.registration_authority}
          onChange={formik.handleChange}
          error={getError("registration_authority")}
          icon={<BsBank />}
        />

        <MainInput
          label="رقم التسجيل"
          id="commercial_registration_number"
          name="commercial_registration_number"
          placeholder="123456"
          type="number"
          value={formik.values.commercial_registration_number}
          onChange={formik.handleChange}
          error={getError("commercial_registration_number")}
          icon={<LuFileDigit />}
        />

        <MainInput
          label="تاريخ التسجيل"
          id="registration_date"
          name="registration_date"
          type="date"
          value={formik.values.registration_date}
          onChange={formik.handleChange}
          error={getError("registration_date")}
          icon={<BsCalendar2Date />}
        />

        <MainInput
          label="الرقم الوطني للمنشأة"
          id="national_number"
          name="national_number"
          placeholder="0987654321"
          type="number"
          value={formik.values.national_number}
          onChange={formik.handleChange}
          error={getError("national_number")}
          icon={<LuFileDigit />}
        />

        <MainInput
          label="الموقع الإلكتروني"
          id="website_url"
          name="website_url"
          placeholder="www.example.com"
          value={formik.values.website_url}
          onChange={formik.handleChange}
          error={getError("website_url")}
        />

        <MainInput
          label="رقم رخصة المهن"
          id="license_number"
          name="license_number"
          placeholder="555555"
          type="number"
          value={formik.values.license_number}
          onChange={formik.handleChange}
          error={getError("license_number")}
        />

        <MainInput
          label="العنوان"
          id="address"
          name="address"
          placeholder="شارع الملك عبدالله، الرياض"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={getError("address")}
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
        />

        <MainInput
          label="رقم الهاتف"
          id="phone"
          name="phone"
          placeholder="0501234567"
          type="tel"
          value={formik.values.phone}
          onChange={(phone) => formik.setFieldValue("phone", phone)}
          error={getError("phone")}
        />

        <MainInput
          label="الرقم الضريبي"
          id="tax_number"
          name="tax_number"
          placeholder="123456789"
          type="number"
          value={formik.values.tax_number}
          onChange={formik.handleChange}
          error={getError("tax_number")}
        />

        <MainInput
          label="رأس المال"
          id="capital_equity"
          name="capital_equity"
          placeholder="100000"
          type="number"
          value={formik.values.capital_equity}
          onChange={formik.handleChange}
          error={getError("capital_equity")}
        />

        <MainInput
          label="اسم الموقع الرسمي"
          id="signed_name"
          name="signed_name"
          placeholder="اسم الموقع"
          value={formik.values.signed_name}
          onChange={formik.handleChange}
          error={getError("signed_name")}
        />
      </div>

      <p className="text-neutral-500 flex items-center gap-1 mt-3">
        <CgMailOpen className="text-2xl" />
        الفان وخمس وعشرون دينار اردني
      </p>
    </>
  );
};

export default Step0Company;
