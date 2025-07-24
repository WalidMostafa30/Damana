import {
  Earth,
  FileDigit,
  MapPinHouse,
  Mars,
  Newspaper,
  User,
  UserRoundPen,
} from "lucide-react";
import MainInput from "../../../../../components/form/MainInput/MainInput";

const Step0 = ({ formik, getError }) => {
  return (
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
          type="number"
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
  );
};

export default Step0;
