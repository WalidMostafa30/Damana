import MainInput from "../../../components/form/MainInput/MainInput";

const Step1 = () => {
  // بيانات العمود الأيمن
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

  // بيانات العمود الأيسر
  const leftColumnData = [
    { label: "شركة التأمين", value: "شركة دنيا للتأمين" },
    { label: "مركز الترخيص", value: "عمان" },
    { label: "رقم المحرك", value: "555496735" },
    { label: "نوع الوقود", value: "بنزين" },
    { label: "الحمولة", value: "4 ركاب" },
    { label: "رقم البوليصة", value: "2024/ 585785" },
    { label: "صفة التسجيل", value: "خصوصي" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-primary">بيانات اطراف الضمانه</h3>

      <div>
        <h3 className="text-xl font-bold text-white bg-primary p-2 pe-4 mb-2 rounded-e-3xl w-fit">
          المالك
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput label="الرقم الوطني" name="nationalId" />
          <MainInput label="رقم الهاتف" name="phone" type="tel" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white bg-primary p-2 pe-4 mb-2 rounded-e-3xl w-fit">
          المشترى
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput label="الرقم الوطني" name="nationalId" />
          <MainInput label="رقم الهاتف" name="phone" type="tel" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white bg-primary p-2 pe-4 mb-2 rounded-e-3xl w-fit">
          بيانات المركبه
        </h3>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 grid lg:grid-cols-2 divide-x divide-gray-200">
          {/* العمود الأيمن */}
          <div className="p-4 space-y-2 text-primary font-medium">
            {rightColumnData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2"
              >
                <p>{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>

          {/* العمود الأيسر */}
          <div className="p-4 space-y-2 text-primary font-medium">
            {leftColumnData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2"
              >
                <p>{item.value}</p>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
