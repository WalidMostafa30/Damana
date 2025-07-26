import MainInput from "../../../components/form/MainInput/MainInput";

const Step2 = () => {
  const rightColumnData = [
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
      <h3 className="text-2xl font-bold text-primary">بيانات الضمانة</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput label="قيمة المركبه" type="number" />
        <MainInput label="عمولة البائع" type="number" />
        <MainInput label="عموله ضمانه" type="number" />
        <MainInput label="قيمة الدفعه" type="number" />
      </div>

      <div>
        <p className="text-lg font-bold mb-2">هل تمتلك كود خصم؟</p>
        <div className="lg:w-1/2">
          <MainInput label="كود الخصم" type="number" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-primary">صرف ضمانه</h3>
      <p className="text-lg font-bold mb-2">
        خلي ضمانك يوصلك أسرع! كيف تحب يتم التحويل بعد التنازل؟
      </p>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="owner"
            value="yes"
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          فورًا – بأسرع وقت ممكن (تُضاف 4 دنانير)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="owner"
            value="no"
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          بشكل اعتيادي – يوصل بنفس اليوم أو اللي بعده (مجانًا)
        </label>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* العمود الأيمن */}
        <div className="p-4 space-y-2 text-primary font-medium">
          {rightColumnData.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <p>{item.label}</p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2;
