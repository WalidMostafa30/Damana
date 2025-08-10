import { useQuery } from "@tanstack/react-query";
import MainInput from "../../../../../../components/form/MainInput/MainInput";
import { CiBank, CiCalendar } from "react-icons/ci";
import { MdOutlinePublic } from "react-icons/md";
import { getCountries } from "../../../../../../services/authService";

const Step0 = ({ formik, getError }) => {
  // 🟢 جلب الدول
  const { data: countriesData, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
  const countries = countriesData?.data || [];

  // 🟢 تحديث الدولة المختارة
  const handleCountryChange = (e) => {
    const selectedId = e.target.value;
    const selectedCountry = countries.find(
      (c) => String(c.id) === String(selectedId)
    );

    formik.setFieldValue("address_country_id", selectedCountry?.id || "");
  };
  return (
    <>
      <h3 className="text-xl font-bold mb-2 lg:mb-4">بياناتك الشخصية</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          id="dob"
          label="تاريخ الميلاد"
          name="dob"
          type="date"
          value={formik.values.dob}
          onChange={formik.handleChange}
          error={getError("dob")}
          icon={<CiCalendar />}
        />

        <MainInput
          id="national_number"
          label="الرقم الوطني"
          name="national_number"
          placeholder="123456789"
          value={formik.values.national_number}
          onChange={formik.handleChange}
          error={getError("national_number")}
        />

        <MainInput
          id="nationality_type"
          label="نوع الجنسية"
          name="nationality_type"
          placeholder="مثال: أردني"
          value={formik.values.nationality_type}
          onChange={formik.handleChange}
          error={getError("nationality_type")}
          icon={<MdOutlinePublic />}
        />

        <MainInput
          id="address_country_name"
          type="select"
          placeholder="اسم الدولة"
          label="اسم الدولة"
          error={getError("address_country_id")}
          value={formik.values.address_country_id}
          onChange={handleCountryChange}
          onBlur={formik.handleBlur}
          disabled={loadingCountries}
          icon={<CiBank />}
          options={[
            { value: "", label: "اختر الدولة" },
            ...countries.map((country) => ({
              value: country.id,
              label: country.name,
            })),
          ]}
        />

        <MainInput
          id="document_id"
          label="رقم الهوية"
          name="document_id"
          placeholder="123456"
          value={formik.values.document_id}
          onChange={formik.handleChange}
          error={getError("document_id")}
        />
      </div>
    </>
  );
};

export default Step0;
