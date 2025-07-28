import { PiFiles, PiUserCircleCheckLight } from "react-icons/pi";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { CiUser } from "react-icons/ci";
import { FaEarthAsia } from "react-icons/fa6";
import { LuFileDigit } from "react-icons/lu";
import { BsCalendar2Date, BsGenderMale } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { IoWomanOutline } from "react-icons/io5";

const Step0 = ({ formik, getError }) => {
  return (
    <>
      <h3 className="text-xl font-bold mb-2 lg:mb-4">بياناتك الشخصية</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="نوع المستخدم"
          id="account_type"
          name="account_type"
          type="select"
          options={[
            { value: "", label: "اختر نوع المستخدم" },
            { value: "person", label: "فرد" },
            { value: "company", label: "شركة" },
          ]}
          value={formik.values.account_type}
          onChange={formik.handleChange}
          error={getError("account_type")}
          icon={<PiUserCircleCheckLight />}
        />
        <MainInput
          label="الاسم رباعي باللغة العربية"
          id="full_name_ar"
          name="full_name_ar"
          placeholder="ياسمين حسن"
          value={formik.values.full_name_ar}
          onChange={formik.handleChange}
          error={getError("full_name_ar")}
          icon={<CiUser />}
        />
        <MainInput
          label="الاسم رباعي باللغة الإنجليزية"
          id="full_name_en"
          name="full_name_en"
          placeholder="Yasmeen Hassan"
          value={formik.values.full_name_en}
          onChange={formik.handleChange}
          error={getError("full_name_en")}
          icon={<CiUser />}
        />
        <MainInput
          label="الجنسية"
          id="nationality"
          name="nationality"
          placeholder="أردني"
          value={formik.values.nationality}
          onChange={formik.handleChange}
          error={getError("nationality")}
          icon={<FaEarthAsia />}
        />
        <MainInput
          label="نوع الوثيقة"
          id="document_type"
          name="document_type"
          type="select"
          options={[
            { value: "", label: "اختر نوع الوثيقة" },
            { value: "جواز السفر", label: "جواز السفر" },
            { value: "الهوية", label: "الهوية" },
          ]}
          value={formik.values.document_type}
          onChange={formik.handleChange}
          error={getError("document_type")}
          icon={<PiFiles />}
        />
        <MainInput
          label="رقم الوثيقة"
          id="document_id"
          name="document_id"
          placeholder="5433455"
          type="number"
          value={formik.values.document_id}
          onChange={formik.handleChange}
          error={getError("document_id")}
          icon={<LuFileDigit />}
        />
        <MainInput
          label="بلد الاصدار"
          id="country_of_issuance"
          name="country_of_issuance"
          placeholder="الأردن"
          value={formik.values.country_of_issuance}
          onChange={formik.handleChange}
          error={getError("country_of_issuance")}
          icon={<FaEarthAsia />}
        />
        <MainInput
          label="تاريخ الاصدار"
          id="issuance_date"
          name="issuance_date"
          type="date"
          value={formik.values.issuance_date}
          onChange={formik.handleChange}
          error={getError("issuance_date")}
          icon={<BsCalendar2Date />}
        />
        <MainInput
          label="تاريخ الانتهاء"
          id="expiry_date"
          name="expiry_date"
          type="date"
          value={formik.values.expiry_date}
          onChange={formik.handleChange}
          error={getError("expiry_date")}
          icon={<BsCalendar2Date />}
        />
        <MainInput
          label="مكان الولادة"
          id="birth_place"
          name="birth_place"
          placeholder="عمان"
          value={formik.values.birth_place}
          onChange={formik.handleChange}
          error={getError("birth_place")}
          icon={<SlLocationPin />}
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
          icon={<BsGenderMale />}
        />
        <MainInput
          label="اسم الأم"
          id="mother_name"
          name="mother_name"
          placeholder="شوق"
          value={formik.values.mother_name}
          onChange={formik.handleChange}
          error={getError("mother_name")}
          icon={<IoWomanOutline />}
        />
        <MainInput
          label="بلد الإقامة"
          id="country_of_residency"
          name="country_of_residency"
          placeholder="الأردن"
          value={formik.values.country_of_residency}
          onChange={formik.handleChange}
          error={getError("country_of_residency")}
          icon={<FaEarthAsia />}
        />
        <MainInput
          label="مدينة الميلاد"
          id="city_of_birth"
          name="city_of_birth"
          placeholder="عمان"
          value={formik.values.city_of_birth}
          onChange={formik.handleChange}
          error={getError("city_of_birth")}
          icon={<SlLocationPin />}
        />
      </div>
    </>
  );
};

export default Step0;
