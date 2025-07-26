import { CiCalendarDate } from "react-icons/ci";
import Timer from "../../components/common/Timer";
import DetailsCard from "../../components/common/DetailsCard";
import ActionsSection from "./ActionsSection";

const DamanaDetails = () => {
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

  const pageTitle = (title, large = false, color = "primary") => (
    <h3
      className={` font-bold text-white bg-primary px-4 py-2 rounded-se-2xl w-fit ${
        large ? "text-lg lg:text-2xl" : "lg:text-xl"
      } ${color === "secondary" ? "bg-secondary" : "bg-primary"}`}
    >
      {title}
    </h3>
  );

  return (
    <article className="pageContainer">
      {pageTitle("بانتظار موافقة المشتري", true, "secondary")}
      <section className="bg-base-white p-4 rounded-2xl space-y-4">
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 bg-white p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <p className="font-medium">رقم الضمانة:</p>
            <p className="text-primary font-bold">123456789</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium">رقم الترميز واللوحة:</p>
            <p className="text-primary font-bold">123-6789</p>
          </div>
          <div className="flex items-center gap-2">
            <CiCalendarDate className="text-2xl" />
            <p className="text-primary font-bold">01/01/2023</p>
          </div>
          <Timer hours={24} minutes={0} />
        </div>

        <div>
          {pageTitle("بيانات البائع")}
          <DetailsCard data={data} />
        </div>

        <div>
          {pageTitle("بيانات المركبة")}
          <DetailsCard data={data} col={2} />
        </div>

        <div>
          {pageTitle("بيانات الضمانة")}
          <DetailsCard data={data} />
        </div>

        <ActionsSection />
      </section>
    </article>
  );
};

export default DamanaDetails;
