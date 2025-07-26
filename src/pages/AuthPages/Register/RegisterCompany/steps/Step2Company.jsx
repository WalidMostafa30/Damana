import MainInput from "../../../../../components/form/MainInput/MainInput";

const Step2Company = ({ formik, getError }) => {
  return (
    <>
      <MainInput
        label="نص التفويض كما هو في السجل التجاري"
        id="authorizationText"
        name="authorizationText"
        type="textarea"
        value={formik.values.authorizationText}
        onChange={formik.handleChange}
        error={getError("authorizationText")}
      />

      <p className="text-primary text-lg font-bold">بيانات المفوض الأول</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="الاسم الرباعي"
          id="fullName2"
          name="fullName2"
          placeholder="مثال: أحمد حسن محمود علي"
          value={formik.values.fullName2}
          onChange={formik.handleChange}
          error={getError("fullName2")}
        />

        <MainInput
          label="الجنسية"
          id="nationality2"
          name="nationality2"
          placeholder="مثال: سعودي"
          value={formik.values.nationality2}
          onChange={formik.handleChange}
          error={getError("nationality2")}
        />

        <MainInput
          label="الرقم الوطني / رقم جواز السفر"
          id="nationalIdOrPassport2"
          name="nationalIdOrPassport2"
          placeholder="مثال: B987654321"
          value={formik.values.nationalIdOrPassport2}
          onChange={formik.handleChange}
          error={getError("nationalIdOrPassport2")}
        />

        <MainInput
          label="الوظيفة"
          id="jobTitle2"
          name="jobTitle2"
          placeholder="مثال: مدير مالي"
          value={formik.values.jobTitle2}
          onChange={formik.handleChange}
          error={getError("jobTitle2")}
        />

        <MainInput
          label="العنوان"
          id="address3"
          name="address3"
          placeholder="مثال: شارع الهرم، الجيزة"
          value={formik.values.address3}
          onChange={formik.handleChange}
          error={getError("address3")}
        />

        <MainInput
          label="نوع التفويض"
          type="select"
          id="authorizationType"
          name="authorizationType"
          options={[
            { value: "شامل", label: "شامل" },
            { value: "جزئي", label: "جزئي" },
          ]}
          value={formik.values.authorizationType}
          onChange={formik.handleChange}
          error={getError("authorizationType")}
        />

        <MainInput
          label="سقف التفويض"
          id="authorizationLimit"
          name="authorizationLimit"
          placeholder="مثال: 100000"
          value={formik.values.authorizationLimit}
          onChange={formik.handleChange}
          error={getError("authorizationLimit")}
        />

        <MainInput
          label="صلاحية التفويض"
          type="select"
          id="authorizationValidity"
          name="authorizationValidity"
          options={[
            { value: "6 شهور", label: "6 شهور" },
            { value: "12 شهر", label: "12 شهر" },
            { value: "غير محدد", label: "غير محدد" },
          ]}
          value={formik.values.authorizationValidity}
          onChange={formik.handleChange}
          error={getError("authorizationValidity")}
        />

        <MainInput
          label="رقم الهاتف"
          id="phone3"
          name="phone3"
          placeholder="مثال: 0551234567"
          value={formik.values.phone3}
          onChange={formik.handleChange}
          error={getError("phone3")}
        />

        <MainInput
          label="البريد الإلكتروني"
          id="email3"
          name="email3"
          placeholder="مثال: delegate@example.com"
          value={formik.values.email3}
          onChange={formik.handleChange}
          error={getError("email3")}
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer text-primary font-bold mt-4">
        <input
          type="checkbox"
          name="isPrimaryContact"
          checked={formik.values.isPrimaryContact}
          onChange={formik.handleChange}
          className="w-4 h-4 accent-primary"
        />
        <span>اجعل هذا المفوض هو نقطة التواصل الرئيسية لمنصة ضمانة</span>
      </label>
    </>
  );
};

export default Step2Company;
