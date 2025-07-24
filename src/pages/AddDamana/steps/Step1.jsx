import { Earth, House, Mail, MapPinned, Phone, Rows3 } from "lucide-react";
import MainInput from "../../../../../components/form/MainInput/MainInput";

const Step1 = ({ formik, getError }) => {
  return (
    <>
      <h3 className="text-xl font-bold mb-4">العنوان السكنى</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="رقم البناية"
          id="buildingNumber"
          name="buildingNumber"
          placeholder="123"
          type="number"
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
          type="number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={getError("phone")}
          icon={<Phone />}
        />
      </div>
    </>
  );
};

export default Step1;
