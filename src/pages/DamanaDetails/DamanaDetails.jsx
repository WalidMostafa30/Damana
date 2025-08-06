import DetailsCard from "../../components/common/DetailsCard";
import ActionsSection from "./ActionsSection";
import DamanaDetailsHead from "../../components/common/DamanaDetailsHead";
import { useParams } from "react-router-dom";

const DamanaDetails = () => {
  const { id } = useParams();

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
      {id && (
        <p className="text-primary text-lg font-bold">رقم الضمانة: {id}</p>
      )}
      {pageTitle("بانتظار موافقة المشتري", true, "secondary")}
      <section className="baseWhiteContainer space-y-4">
        <DamanaDetailsHead hours={2} minutes={30} />

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
