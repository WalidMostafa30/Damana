import { Building2, CirclePlus, Landmark, MailOpen, Phone } from "lucide-react";
import MainInput from "../../../../../components/form/MainInput";

const Step1Company = ({ formik, getError, title }) => {
  return (
    <>
      <h3 className="text-lg text-white font-bold bg-primary p-4 rounded-e-2xl w-fit">
        {title}
      </h3>

      <p className="text-primary text-lg font-bold">بيانات الشريك الاول</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="الاسم الرباعي"
          id="fullName"
          name="fullName"
          placeholder="مثال: محمد أحمد علي يوسف"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          error={getError("fullName")}
          icon={<Building2 />}
        />

        <MainInput
          label="الجنسية"
          id="nationality"
          name="nationality"
          placeholder="مثال: مصري"
          value={formik.values.nationality}
          onChange={formik.handleChange}
          error={getError("nationality")}
          icon={<Landmark />}
        />

        <MainInput
          label="الرقم الوطني / رقم جواز السفر"
          id="nationalIdOrPassport"
          name="nationalIdOrPassport"
          placeholder="مثال: A123456789"
          value={formik.values.nationalIdOrPassport}
          onChange={formik.handleChange}
          error={getError("nationalIdOrPassport")}
          icon={<Building2 />}
        />

        <MainInput
          label="العنوان"
          id="address2"
          name="address2"
          placeholder="مثال: شارع النيل، القاهرة"
          value={formik.values.address2}
          onChange={formik.handleChange}
          error={getError("address2")}
          icon={<Landmark />}
        />

        <MainInput
          label="رقم الهاتف"
          id="phone2"
          name="phone2"
          placeholder="مثال: 01012345678"
          value={formik.values.phone2}
          onChange={formik.handleChange}
          error={getError("phone2")}
          icon={<Phone />}
        />

        <MainInput
          label="البريد الإلكتروني"
          id="email2"
          name="email2"
          placeholder="مثال: owner@example.com"
          value={formik.values.email2}
          onChange={formik.handleChange}
          error={getError("email2")}
          icon={<MailOpen />}
        />
      </div>

      <p className="text-secondary text-lg font-bold flex items-center gap-2 hover:brightness-75 cursor-pointer">
        <CirclePlus />
        اضافه شريك جديد
      </p>
    </>
  );
};

export default Step1Company;
