import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../../../../../components/form/MainInput/MainInput";
import { CiBank, CiCalendar } from "react-icons/ci";
import { MdOutlinePublic } from "react-icons/md";
import {
  getCountries,
  sendPersonalData,
} from "../../../../../../services/authService";
import FormBtn from "../../../../../../components/form/FormBtn";
import { useState } from "react";
import FormError from "../../../../../../components/form/FormError";

export default function Step0({ formData, setFormData, setStep }) {
  const [errorMsg, setErrorMsg] = useState(null);

  // جلب الدول
  const { data: countriesData, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
  const countries = countriesData?.data || [];

  // mutation للإرسال
  const mutation = useMutation({
    mutationFn: sendPersonalData,
    onSuccess: (data, values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      setStep((prev) => prev + 1);
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data?.error_msg || "حدث خطاء ما");
    },
  });

  // الفورم + فاليديشن
  const formik = useFormik({
    initialValues: {
      dob: formData.dob || "",
      national_number: formData.national_number || "",
      nationality_type: formData.nationality_type || "",
      country_id: formData.country_id || "",
      document_id: formData.document_id || "",
    },
    validationSchema: Yup.object({
      dob: Yup.string().required("تاريخ الميلاد مطلوب"),
      national_number: Yup.string().required("الرقم الوطني مطلوب"),
      nationality_type: Yup.string().required("نوع الجنسية مطلوب"),
      country_id: Yup.string().when("nationality_type", {
        is: (val) => val === "non",
        then: (schema) => schema.required("الدولة مطلوبة"),
        otherwise: (schema) => schema.notRequired(),
      }),
      document_id: Yup.string().when("nationality_type", {
        is: (val) => val === "jordanian" || val === "sons",
        then: (schema) => schema.required("رقم الهوية مطلوب"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        country_id:
          values.nationality_type === "jordanian" ||
          values.nationality_type === "sons"
            ? 1
            : values.country_id,
      };
      mutation.mutate(payload);
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          type="select"
          label="نوع الجنسية"
          name="nationality_type"
          value={formik.values.nationality_type}
          onChange={formik.handleChange}
          error={getError("nationality_type")}
          icon={<MdOutlinePublic />}
          options={[
            { value: "", label: "اختر نوع الجنسية" },
            { value: "jordanian", label: "أردني" },
            { value: "sons", label: "أبناء" },
            { value: "non", label: "غير أردني" },
          ]}
        />

        {formik.values.nationality_type === "non" && (
          <MainInput
            id="country_id"
            type="select"
            placeholder="اسم الدولة"
            label="اسم الدولة"
            error={getError("country_id")}
            value={formik.values.country_id}
            onChange={formik.handleChange}
            disabled={loadingCountries}
            icon={<CiBank />}
            options={[
              { value: "", label: "اختر الدولة" },
              ...countries.map((c) => ({ value: c.id, label: c.name })),
            ]}
          />
        )}

        {(formik.values.nationality_type === "jordanian" ||
          formik.values.nationality_type === "sons") && (
          <MainInput
            id="document_id"
            label="رقم الهوية"
            name="document_id"
            placeholder="123456"
            value={formik.values.document_id}
            onChange={formik.handleChange}
            error={getError("document_id")}
          />
        )}
      </div>

      <FormError errorMsg={errorMsg} />

      <FormBtn title="التالي" loading={mutation.isPending} />
    </form>
  );
}
