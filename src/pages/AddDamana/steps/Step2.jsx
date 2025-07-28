import DetailsCard from "../../../components/common/DetailsCard";
import MainInput from "../../../components/form/MainInput/MainInput";

const Step2 = () => {
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
        <MainInput label="قيمة المركبه" type="number" />
        <MainInput label="عمولة البائع" type="number" />
        <MainInput label="عموله ضمانه" type="number" />
        <MainInput label="قيمة الدفعه" type="number" />
      </div>

      <div>
        <p className="lg:text-lg font-bold mb-2">هل تمتلك كود خصم؟</p>
        <div className="lg:w-1/2">
          <MainInput label="كود الخصم" type="number" />
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
            name="owner"
            value="yes"
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          فورًا – بأسرع وقت ممكن (تُضاف 4 دنانير)
        </label>
        <label className="flex items-center gap-2 text-sm lg:text-base">
          <input
            type="radio"
            name="owner"
            value="no"
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
