import { GoNumber } from "react-icons/go";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { GiDoubleStreetLights } from "react-icons/gi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaCity } from "react-icons/fa";

const Step1 = ({ formik, getError }) => {
  return (
    <>
      <h3 className="text-xl font-bold mb-2 lg:mb-4">العنوان السكنى</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="رقم البناية"
          id="address_building_number"
          name="address_building_number"
          placeholder="123"
          type="number"
          value={formik.values.address_building_number}
          onChange={formik.handleChange}
          error={getError("address_building_number")}
          icon={<GoNumber />}
        />

        <MainInput
          label="اسم الشارع"
          id="address_street_name"
          name="address_street_name"
          placeholder="شارع النصر"
          value={formik.values.address_street_name}
          onChange={formik.handleChange}
          error={getError("address_street_name")}
          icon={<GiDoubleStreetLights />}
        />

        <MainInput
          label="البلد"
          id="address_country"
          name="address_country"
          placeholder="الأردن"
          value={formik.values.address_country}
          onChange={formik.handleChange}
          error={getError("address_country")}
          icon={<FaCity />}
        />

        <MainInput
          label="المدينة"
          id="address_city_town"
          name="address_city_town"
          placeholder="عمان"
          value={formik.values.address_city_town}
          onChange={formik.handleChange}
          error={getError("address_city_town")}
          icon={<FaCity />}
        />

        <MainInput
          label="البريد الإلكتروني"
          id="email"
          name="email"
          placeholder="example@email.com"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={getError("email")}
          icon={<IoMailUnreadOutline />}
        />

        <MainInput
          label="مفتاح الدولة"
          id="country_code"
          name="country_code"
          placeholder="+962"
          type="tel"
          value={formik.values.country_code}
          onChange={formik.handleChange}
          error={getError("country_code")}
        />

        <MainInput
          label="رقم الهاتف"
          id="mobile"
          name="mobile"
          placeholder="790000000"
          type="tel"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={getError("mobile")}
        />

        <MainInput
          label="رقم الهاتف الكامل"
          id="full_mobile"
          name="full_mobile"
          type="tel"
          placeholder="+962790000000"
          value={formik.values.full_mobile}
          onChange={formik.handleChange}
          error={getError("full_mobile")}
        />
      </div>
    </>
  );
};

export default Step1;
