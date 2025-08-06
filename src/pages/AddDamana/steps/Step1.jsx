import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { LuCircleUserRound } from "react-icons/lu";
import DetailsCard from "../../../components/common/DetailsCard";
import MainInput from "../../../components/form/MainInput/MainInput";

const Step1 = ({ goNext, vehicleData, setFinalData }) => {
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ بيانات تفاصيل المركبة
  const data = [
    { label: "رقم التسجيل", value: vehicleData.registration_number },
    {
      label: "رقم اللوحة والرمز",
      value: `${vehicleData.plate_number} - ${vehicleData.plate_code}`,
    },
    { label: "نوع المركبة", value: vehicleData.vehicle_type },
    { label: "الصنف", value: vehicleData.vehicle_class },
    { label: "لون المركبة", value: vehicleData.color },
    { label: "رقم الشاصي", value: vehicleData.chassis_number },
    { label: "سنة الصنع", value: vehicleData.manufacture_year },
    { label: "تاريخ انتهاء الرخصة", value: vehicleData.license_expiry_date },
    { label: "مركز الترخيص", value: vehicleData.licensing_center },
    { label: "رقم المحرك", value: vehicleData.engine_number },
    { label: "سعة المحرك", value: vehicleData.engine_capacity },
    { label: "الحمولة", value: vehicleData.load_capacity },
    { label: "الوزن القائم", value: vehicleData.net_weight },
    { label: "الوزن الصافي", value: vehicleData.cargo_capacity },
    { label: "قيمة المركبة التقديرية", value: vehicleData.estimated_value },
    { label: "صفة التسجيل", value: vehicleData.registration_type },
    { label: "تصنيف المركبة", value: vehicleData.vehicle_classification },
  ];

  // ✅ Mutation
  const mutation = useMutation({
    mutationFn: async (payload) => {
      // return await createVehicleTransfer(payload);
    },
    onSuccess: (data) => {
      // نحفظ المطلوب من Step1 في finalData
      setFinalData((prev) => ({
        ...prev,
        buyer_national_number: formik.values.buyer_national_number,
        buyer_full_mobile: formik.values.buyer_full_mobile,
      }));

      setErrorMsg("");
      goNext();
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء الإرسال");
    },
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      buyer_national_number: "",
      buyer_full_mobile: "",
    },
    validationSchema: Yup.object({
      buyer_national_number: Yup.string().required(
        "الرقم الوطني للمشتري مطلوب"
      ),
      buyer_full_mobile: Yup.string().required("رقم هاتف المشتري مطلوب"),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      const payload = {
        ...vehicleData,
        ...values,
      };
      mutation.mutate(payload);
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

      {/* المالك */}
      {/* <div>
        {pageTitle("المالك")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput
            label="الرقم الوطني"
            id="ownerNationalId"
            placeholder="ادخل الرقم الوطني"
            name="ownerNationalId"
            value={formik.values.ownerNationalId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("ownerNationalId")}
            icon={<LuCircleUserRound />}
          />

          <MainInput
            type="tel"
            id="ownerPhone"
            name="ownerPhone"
            placeholder="96269077885+"
            label="رقم الهاتف"
            value={`${formik.values.ownerCountryCode?.replace("+", "") || ""}${
              formik.values.ownerPhone || ""
            }`}
            onChange={(phone, country) => {
              const countryCode = country?.dialCode
                ? `+${country.dialCode}`
                : "";
              const numberWithoutCode = country?.dialCode
                ? phone.slice(country.dialCode.length)
                : phone;

              formik.setFieldValue("ownerCountryCode", countryCode);
              formik.setFieldValue("ownerPhone", numberWithoutCode);
            }}
            onBlur={formik.handleBlur}
            error={getError("ownerPhone")}
          />
        </div>
      </div> */}

      {/* المشتري */}
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

          <MainInput
            type="tel"
            id="buyer_full_mobile"
            name="buyer_full_mobile"
            placeholder="96269077885+"
            label="رقم الهاتف"
            value={`${formik.values.buyerCountryCode?.replace("+", "") || ""}${
              formik.values.buyer_full_mobile || ""
            }`}
            onChange={(phone, country) => {
              const countryCode = country?.dialCode
                ? `+${country.dialCode}`
                : "";
              const numberWithoutCode = country?.dialCode
                ? phone.slice(country.dialCode.length)
                : phone;

              formik.setFieldValue("buyerCountryCode", countryCode);
              formik.setFieldValue("buyer_full_mobile", numberWithoutCode);
            }}
            onBlur={formik.handleBlur}
            error={getError("buyer_full_mobile")}
          />
        </div>
      </div>

      {/* بيانات المركبة */}
      <div>
        {pageTitle("بيانات المركبة")}
        <DetailsCard data={data} col={2} />
      </div>

      {/* عرض رسالة الخطأ العامة */}
      {errorMsg && <div className="text-error-200">{errorMsg}</div>}

      <button type="submit" className="mainBtn" disabled={mutation.isPending}>
        {mutation.isPending ? "جارٍ الإرسال..." : "التالي"}
      </button>
    </form>
  );
};

export default Step1;
