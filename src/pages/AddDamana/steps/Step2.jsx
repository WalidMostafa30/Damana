import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { LuHandCoins } from "react-icons/lu";
import { CiDiscount1 } from "react-icons/ci";
import { FaMoneyBillWave } from "react-icons/fa";
import DetailsCard from "../../../components/common/DetailsCard";
import MainInput from "../../../components/form/MainInput/MainInput";
// import { createDamanaStep2 } from "../../../services/damanaService"; // ⬅ ضع API هنا

const Step2 = ({ goNext, setParentData, parentData }) => {
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Mutation
  const mutation = useMutation({
    mutationFn: async (payload) => {
      // return await createDamanaStep2(payload);
      return { data: { request_step2_id: 789 } }; // ⬅ مثال مؤقت
    },
    onSuccess: (data) => {
      setParentData((prev) => ({
        ...prev,
        ...formik.values,
        request_step2_id: data.data.request_step2_id,
      }));
      setErrorMsg("");
      goNext();
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء الإرسال");
    },
  });

  // ✅ بيانات المركبة
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
  ];

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      vehicle_price: "",
      seller_commission: "",
      commission_on: "",
      payment_amount: "",
      code: "",
      payout_method: "fast",
    },
    validationSchema: Yup.object({
      vehicle_price: Yup.string().required("قيمة المركبة مطلوبة"),
      commission_on: Yup.string().required("اختيار عمولة ضمانة مطلوب"),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      const payload = { ...parentData, ...values };
      mutation.mutate(payload);
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h3 className="text-xl lg:text-2xl font-bold text-primary">
        بيانات الضمانة
      </h3>

      {/* الحقول */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="قيمة المركبه"
          placeholder="ادخل قيمة المركبه"
          type="number"
          name="vehicle_price"
          icon={<FaMoneyBillWave />}
          value={formik.values.vehicle_price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError("vehicle_price")}
        />

        <MainInput
          label="عمولة البائع"
          placeholder="ادخل عمولة البائع"
          type="number"
          name="seller_commission"
          icon={<LuHandCoins />}
          value={formik.values.seller_commission}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <MainInput
          label="عموله ضمانه"
          type="select"
          name="commission_on"
          options={[
            { value: "", label: "اختر عموله ضمانه" },
            { value: "yes", label: "نعم" },
            { value: "no", label: "لا" },
          ]}
          icon={<LuHandCoins />}
          value={formik.values.commission_on}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError("commission_on")}
        />

        <MainInput
          label="قيمة الدفعه"
          placeholder="ادخل قيمة الدفعه"
          type="number"
          name="payment_amount"
          icon={<LuHandCoins />}
          value={formik.values.payment_amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {/* كود الخصم */}
      <div>
        <p className="lg:text-lg font-bold mb-2">هل تمتلك كود خصم؟</p>
        <div className="lg:w-1/2">
          <MainInput
            label="كود الخصم"
            type="text"
            name="code"
            placeholder="ادخل كود الخصم"
            icon={<CiDiscount1 />}
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("code")}
          />
        </div>
      </div>

      {/* صرف ضمانه */}
      <h3 className="text-xl lg:text-2xl font-bold text-primary">صرف ضمانه</h3>
      <p className="lg:text-lg font-bold mb-4">
        خلي ضمانك يوصلك أسرع! كيف تحب يتم التحويل بعد التنازل؟
      </p>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm lg:text-base">
          <input
            type="radio"
            name="payout_method"
            value="fast"
            checked={formik.values.payout_method === "fast"}
            onChange={formik.handleChange}
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          فورًا – بأسرع وقت ممكن (تُضاف 4 دنانير)
        </label>
        <label className="flex items-center gap-2 text-sm lg:text-base">
          <input
            type="radio"
            name="payout_method"
            value="normal"
            checked={formik.values.payout_method === "normal"}
            onChange={formik.handleChange}
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          بشكل اعتيادي – يوصل بنفس اليوم أو اللي بعده (مجانًا)
        </label>
      </div>

      {/* بيانات المركبة */}
      <DetailsCard data={data} />

      {/* عرض رسالة الخطأ العامة */}
      {errorMsg && <div className="text-error-200">{errorMsg}</div>}

      {/* زر التالي */}
      <button type="submit" className="mainBtn" disabled={mutation.isPending}>
        {mutation.isPending ? "جارٍ الإرسال..." : "التالي"}
      </button>
    </form>
  );
};

export default Step2;
