import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { LuCircleUserRound } from "react-icons/lu";
import DetailsCard from "../../../components/common/DetailsCard";
import MainInput from "../../../components/form/MainInput/MainInput";
import FormBtn from "../../../components/form/FormBtn";
import PhoneInput from "../../../components/form/PhoneInput";

const Step1 = ({ goNext, formData, setFormData }) => {
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ بيانات تفاصيل المركبة
  const data = [
    { label: "رقم التسجيل", value: formData.registration_number },
    {
      label: "رقم اللوحة والرمز",
      value: `${formData.plate_number || "-"} - ${formData.plate_code || "-"}`,
    },
    { label: "نوع المركبة", value: formData.vehicle_type },
    { label: "الصنف", value: formData.vehicle_class },
    { label: "لون المركبة", value: formData.color },
    { label: "رقم الشاصي", value: formData.chassis_number },
    { label: "سنة الصنع", value: formData.manufacture_year },
    { label: "تاريخ انتهاء الرخصة", value: formData.license_expiry_date },
    { label: "مركز الترخيص", value: formData.licensing_center },
    { label: "رقم المحرك", value: formData.engine_number },
    { label: "سعة المحرك", value: formData.engine_capacity },
    { label: "الحمولة", value: formData.load_capacity },
    { label: "الوزن القائم", value: formData.net_weight },
    { label: "الوزن الصافي", value: formData.cargo_capacity },
    { label: "قيمة المركبة التقديرية", value: formData.estimated_value },
    { label: "صفة التسجيل", value: formData.registration_type },
    { label: "تصنيف المركبة", value: formData.vehicle_classification },
  ];

  const mutation = useMutation({
    mutationFn: async (payload) => {
      // return await createVehicleTransfer(payload);
    },
    onSuccess: () => {
      setFormData((prev) => ({
        ...prev,
        buyer_national_number: formik.values.buyer_national_number,
        buyer_full_mobile: formik.values.buyer_full_mobile,
        // buyerCountryCode: formik.values.buyerCountryCode,
      }));

      setErrorMsg("");
      goNext();
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء الإرسال");
    },
  });

  const formik = useFormik({
    initialValues: {
      buyer_national_number: formData.buyer_national_number || "",
      buyer_full_mobile: formData.buyer_full_mobile || "",
      // buyerCountryCode: formData.buyerCountryCode || "",
    },
    validationSchema: Yup.object({
      buyer_national_number: Yup.string().required(
        "الرقم الوطني للمشتري مطلوب"
      ),
      buyer_full_mobile: Yup.string().required("رقم هاتف المشتري مطلوب"),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      mutation.mutate({
        ...formData,
        ...values,
      });
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  const pageTitle = (title) => (
    <h3 className="lg:text-xl font-bold text-white bg-primary p-2 pe-4 mb-2 rounded-e-3xl w-fit">
      {title}
    </h3>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h3 className="text-xl lg:text-2xl font-bold text-primary">
        بيانات أطراف الضمانة
      </h3>

      <div>
        {pageTitle("المشتري")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput
            id="buyer_national_number"
            label="الرقم الوطني"
            placeholder="ادخل الرقم الوطني"
            name="buyer_national_number"
            value={formik.values.buyer_national_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("buyer_national_number")}
            icon={<LuCircleUserRound />}
          />

          <PhoneInput formik={formik} name="buyer_full_mobile" combineValue />
        </div>
      </div>

      {!formData.is_owner && (
        <div>
          {pageTitle("المالك")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MainInput
              id="owner_national_number"
              label="الرقم الوطني"
              placeholder="ادخل الرقم الوطني"
              name="owner_national_number"
              value={formData.owner_national_number}
              icon={<LuCircleUserRound />}
              disabled
            />

            <MainInput
              type="tel"
              id="owner_full_mobile"
              name="owner_full_mobile"
              placeholder="96269077885+"
              label="رقم الهاتف"
              value={formData.owner_full_mobile}
              disabled
            />
          </div>
        </div>
      )}

      <div>
        {pageTitle("بيانات المركبة")}
        <DetailsCard data={data} col={2} blur={!formData.is_owner} />
      </div>

      {errorMsg && <div className="text-error-200">{errorMsg}</div>}

      <FormBtn title="التالي" loading={mutation.isPending} />
    </form>
  );
};

export default Step1;
