import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { LuCircleUserRound } from "react-icons/lu";
import DetailsCard from "../../../components/common/DetailsCard";
import MainInput from "../../../components/form/MainInput/MainInput";
// import { createDamanaStep1 } from "../../../services/damanaService"; // ⬅ ضع API بتاعتك هنا

const Step1 = ({ goNext, setParentData, parentData }) => {
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Mutation
  const mutation = useMutation({
    mutationFn: async (payload) => {
      // return await createDamanaStep1(payload);
      return { data: { request_step1_id: 456 } }; // ⬅ مثال مؤقت
    },
    onSuccess: (data) => {
      setParentData((prev) => ({
        ...prev,
        ...formik.values,
        request_step1_id: data.data.request_step1_id,
      }));
      setErrorMsg("");
      goNext();
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء الإرسال");
    },
  });

  // ✅ بيانات تفاصيل المركبة
  const data = [
    { label: "رقم التسجيل", value: "45665790" },
    { label: "رقم اللوحة والرمز", value: "10558777" },
    { label: "نوع المركبة", value: "مارسيدس - بنز" },
    { label: "الصنف", value: "E - 200" },
    { label: "لون المركبة", value: "اسود" },
    { label: "رقم الشاصي", value: "57765875432" },
    { label: "رقم التسجيل", value: "1 3012758754" },
    { label: "تاريخ انتهاء الرخصة", value: "20/02/2027" },
    { label: "نوع التأمين", value: "شامل" },
    { label: "شركة التأمين", value: "شركة دنيا للتأمين" },
    { label: "مركز الترخيص", value: "عمان" },
    { label: "رقم المحرك", value: "555496735" },
    { label: "نوع الوقود", value: "بنزين" },
    { label: "الحمولة", value: "4 ركاب" },
    { label: "رقم البوليصة", value: "2024/ 585785" },
    { label: "صفة التسجيل", value: "خصوصي" },
  ];

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      ownerNationalId: "",
      ownerPhone: "",
      buyerNationalId: "",
      buyerPhone: "",
    },
    validationSchema: Yup.object({
      ownerNationalId: Yup.string().required("الرقم الوطني للمالك مطلوب"),
      ownerPhone: Yup.string().required("رقم هاتف المالك مطلوب"),
      buyerNationalId: Yup.string().required("الرقم الوطني للمشتري مطلوب"),
      buyerPhone: Yup.string().required("رقم هاتف المشتري مطلوب"),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      const payload = {
        ...parentData, // ⬅ علشان نكمل البيانات السابقة
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
      <div>
        {pageTitle("المالك")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput
            label="الرقم الوطني"
            id={"ownerNationalId"}
            placeholder="ادخل الرقم الوطني"
            name="ownerNationalId"
            value={formik.values.ownerNationalId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("ownerNationalId")}
            icon={<LuCircleUserRound />}
          />
          <MainInput
            label="رقم الهاتف"
            placeholder="ادخل رقم الهاتف"
            name="ownerPhone"
            type="tel"
            value={formik.values.ownerPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("ownerPhone")}
          />
        </div>
      </div>

      {/* المشتري */}
      <div>
        {pageTitle("المشتري")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput
            id={"buyerNationalId"}
            label="الرقم الوطني"
            placeholder="ادخل الرقم الوطني"
            name="buyerNationalId"
            value={formik.values.buyerNationalId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("buyerNationalId")}
            icon={<LuCircleUserRound />}
          />
          <MainInput
            label="رقم الهاتف"
            placeholder="ادخل رقم الهاتف"
            name="buyerPhone"
            type="tel"
            value={formik.values.buyerPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("buyerPhone")}
          />
        </div>
      </div>

      {/* بيانات المركبة */}
      <div>
        {pageTitle("بيانات المركبة")}
        <DetailsCard data={data} col={2} blur />
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
