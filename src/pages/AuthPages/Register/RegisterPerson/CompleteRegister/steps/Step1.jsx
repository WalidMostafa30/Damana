import MainInput from "../../../../../../components/form/MainInput/MainInput";
import { GoNumber } from "react-icons/go";
import { GiDoubleStreetLights } from "react-icons/gi";
import { FaCity } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";

const Step1 = ({ formik, getError }) => {
  return (
    <>
      <h3 className="text-xl font-bold mb-2 lg:mb-4">العنوان السكني</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          id="address_building_number"
          label="رقم البناية"
          name="address_building_number"
          placeholder="123"
          type="number"
          value={formik.values.address_building_number}
          onChange={formik.handleChange}
          error={getError("address_building_number")}
          icon={<GoNumber />}
        />

        <MainInput
          id="address_street_name"
          label="اسم الشارع"
          name="address_street_name"
          placeholder="اسم الشارع"
          value={formik.values.address_street_name}
          onChange={formik.handleChange}
          error={getError("address_street_name")}
          icon={<GiDoubleStreetLights />}
        />

        <MainInput
          id="address_country_id"
          label="البلد"
          name="address_country_id"
          placeholder="مثال: الأردن"
          value={formik.values.address_country_id}
          onChange={formik.handleChange}
          error={getError("address_country_id")}
        />

        <MainInput
          id="address_city_town"
          label="المدينة"
          name="address_city_town"
          placeholder="اسم المدينة"
          value={formik.values.address_city_town}
          onChange={formik.handleChange}
          error={getError("address_city_town")}
          icon={<FaCity />}
        />

        <MainInput
          id="iban"
          label="رقم الايبان"
          name="iban"
          placeholder="SA1234567890123456"
          value={formik.values.iban}
          onChange={formik.handleChange}
          error={getError("iban")}
        />

        <MainInput
          id="currency"
          label="رقم الحساب"
          name="currency"
          placeholder="123456"
          value={formik.values.currency}
          onChange={formik.handleChange}
          error={getError("currency")}
        />

        <MainInput
          id="clik_name"
          label="اسم البنك"
          name="clik_name"
          placeholder="اسم البنك"
          value={formik.values.clik_name}
          onChange={formik.handleChange}
          error={getError("clik_name")}
          icon={<RiBankLine />}
        />

        <MainInput
          id="bank_id"
          label="اسم الفرع"
          name="bank_id"
          placeholder="اسم الفرع"
          value={formik.values.bank_id}
          onChange={formik.handleChange}
          error={getError("bank_id")}
        />
      </div>
    </>
  );
};

export default Step1;
