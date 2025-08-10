import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../../../../../components/form/MainInput/MainInput";
import { GoNumber } from "react-icons/go";
import { GiDoubleStreetLights } from "react-icons/gi";
import { FaCity } from "react-icons/fa";
import FormBtn from "../../../../../../components/form/FormBtn";
import {
  getCountries,
  sendAddressOrBankData,
} from "../../../../../../services/authService";
import { useState } from "react";
import FormError from "../../../../../../components/form/FormError";
import { useNavigate } from "react-router-dom";

export default function Step2({ formData, setFormData }) {
  const [errorMsg, setErrorMsg] = useState(null);

  // جلب الدول
  const { data: countriesData, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
  const countries = countriesData?.data || [];

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendAddressOrBankData,
    onSuccess: (data, values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      navigate("/");
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data?.error_msg || "حدث خطأ ما");
    },
  });

  const formik = useFormik({
    initialValues: {
      address_building_number: formData.address_building_number || "",
      address_street_name: formData.address_street_name || "",
      address_country_id: formData.address_country_id || "",
      address_city_town: formData.address_city_town || "",
    },
    validationSchema: Yup.object({
      address_building_number: Yup.string().required("رقم البناية مطلوب"),
      address_street_name: Yup.string().required("اسم الشارع مطلوب"),
      address_country_id: Yup.string().required("البلد مطلوب"),
      address_city_town: Yup.string().required("المدينة مطلوبة"),
    }),
    onSubmit: (values) => {
      mutation.mutate({
        form_type: "address",
        address: {
          address_building_number: values.address_building_number,
          address_street_name: values.address_street_name,
          address_country_id: values.address_country_id,
          address_city_town: values.address_city_town,
        },
      });
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          id="address_building_number"
          label="رقم البناية"
          name="address_building_number"
          placeholder="123"
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
          type="select"
          placeholder="اسم البلد"
          label="اسم البلد"
          error={getError("address_country_id")}
          value={formik.values.address_country_id}
          onChange={formik.handleChange}
          disabled={loadingCountries}
          options={[
            { value: "", label: "اختر البلد" },
            ...countries.map((c) => ({ value: c.id, label: c.name })),
          ]}
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
      </div>

      <FormError errorMsg={errorMsg} />

      <FormBtn title="إنهاء" loading={mutation.isPending} />
    </form>
  );
}
