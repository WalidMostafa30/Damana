import { LuHandCoins } from "react-icons/lu";
import DetailsCard from "../../../components/common/DetailsCard";
import MainInput from "../../../components/form/MainInput/MainInput";
import { CiDiscount1 } from "react-icons/ci";
import { FaMoneyBillWave } from "react-icons/fa";

const Step2 = ({ formik, getError }) => {
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

  return (
    <div className="space-y-4">
      <h3 className="text-xl lg:text-2xl font-bold text-primary">
        بيانات الضمانة
      </h3>

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

      <DetailsCard data={data} />
    </div>
  );
};

export default Step2;
