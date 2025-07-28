import DetailsCard from "../../../components/common/DetailsCard";
import MainInput from "../../../components/form/MainInput/MainInput";

const Step1 = () => {
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

  const pageTitle = (title) => (
    <h3 className="lg:text-xl font-bold text-white bg-primary p-2 pe-4 mb-2 rounded-e-3xl w-fit">
      {title}
    </h3>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl lg:text-2xl font-bold text-primary">بيانات اطراف الضمانه</h3>

      <div>
        {pageTitle("المالك")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput label="الرقم الوطني" name="nationalId" />
          <MainInput label="رقم الهاتف" name="phone" type="tel" />
        </div>
      </div>

      <div>
        {pageTitle("المشترى")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MainInput label="الرقم الوطني" name="nationalId" />
          <MainInput label="رقم الهاتف" name="phone" type="tel" />
        </div>
      </div>

      <div>
        {pageTitle("بيانات المركبه")}
        <DetailsCard data={data} col={2} />
      </div>
    </div>
  );
};

export default Step1;
