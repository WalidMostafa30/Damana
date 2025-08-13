import { useState } from "react";
import { useFormik } from "formik";
import { FaRegEdit } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import MainInput from "../../components/form/MainInput/MainInput";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { completeRegister } from "../../services/authService";
import FormError from "../../components/form/FormError";
import FormBtn from "../../components/form/FormBtn";
import CountrySelect from "../../components/form/CountrySelect";

const Address = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 🟢 بيانات البروفايل
  const { profile } = useSelector((state) => state.profile);
  const userAddress = profile || {};

  // 🟢 جلب الدول
  // const { data: countriesData, isLoading: loadingCountries } = useQuery({
  //   queryKey: ["countries"],
  //   queryFn: getCountries,
  // });
  // const countries = countriesData?.data || [];

  // 🟢 Mutation
  const mutation = useMutation({
    mutationFn: completeRegister,
    onSuccess: (data) => {
      console.log("completeRegister data", data);

      alert("تم تعديل العنوان بنجاح ✅");
      setIsEditing(false);
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء التعديل");
    },
  });

  // 🟢 الفاليديشن
  const addressSchema = Yup.object({
    address_building_number: Yup.string().required("رقم البناية مطلوب"),
    address_street_name: Yup.string().required("اسم الشارع مطلوب"),
    address_country_id: Yup.string().required("الدولة مطلوبة"),
    address_city_town: Yup.string().required("المدينة مطلوبة"),
  });

  // 🟢 Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address_building_number: userAddress.address_building_number || "",
      address_street_name: userAddress.address_street_name || "",
      address_country_id: userAddress.address_country_id || "",
      address_country_name: userAddress.address_country_name || "",
      address_city_town: userAddress.address_city_town || "",
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      setErrorMsg("");

      mutation.mutate({
        form_type: "address",
        address: {
          address_building_number: values.address_building_number,
          address_street_name: values.address_street_name,
          address_country_id: values.address_country_id,
          address_country_name: values.address_country_name,
          address_city_town: values.address_city_town,
        },
      });
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg lg:text-2xl text-primary font-bold">العنوان</h3>

        <button
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
          className={`border border-neutral-300 px-4 py-2 rounded-xl flex items-center gap-2 lg:text-lg cursor-pointer ${
            isEditing ? "bg-secondary/30 border-secondary/30" : ""
          }`}
        >
          <FaRegEdit />
          تعديل
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* رقم البناية */}
          <MainInput
            id="address_building_number"
            type="text"
            placeholder="رقم البناية"
            label="رقم البناية"
            icon={<CiBank />}
            disabled={!isEditing}
            error={getError("address_building_number")}
            onChange={formik.handleChange}
            value={formik.values.address_building_number}
            onBlur={formik.handleBlur}
          />

          {/* اسم الشارع */}
          <MainInput
            id="address_street_name"
            placeholder="اسم الشارع"
            label="اسم الشارع"
            icon={<CiBank />}
            disabled={!isEditing}
            error={getError("address_street_name")}
            onChange={formik.handleChange}
            value={formik.values.address_street_name}
            onBlur={formik.handleBlur}
          />

          {/* الدولة */}
          {/* <MainInput
            id="address_country_name"
            type="select"
            placeholder="اسم الدولة"
            label="اسم الدولة"
            error={getError("address_country_id")}
            value={formik.values.address_country_id}
            onChange={handleCountryChange}
            onBlur={formik.handleBlur}
            disabled={!isEditing || loadingCountries}
            icon={<CiBank />}
            options={[
              { value: "", label: "اختر الدولة" },
              ...countries.map((country) => ({
                value: country.id,
                label: country.name,
              })),
            ]}
          /> */}
          <CountrySelect
            formik={formik}
            name="address_country_id"
            combineValue={true}
          />

          {/* المدينة */}
          <MainInput
            id="address_city_town"
            placeholder="المدينة"
            label="المدينة"
            icon={<CiBank />}
            disabled={!isEditing}
            error={getError("address_city_town")}
            onChange={formik.handleChange}
            value={formik.values.address_city_town}
            onBlur={formik.handleBlur}
          />
        </div>

        <FormError errorMsg={errorMsg} />

        {isEditing && (
          <FormBtn
            title="حفظ"
            loading={mutation.isPending}
            className="lg:col-span-2"
          />
        )}
      </form>
    </>
  );
};

export default Address;
