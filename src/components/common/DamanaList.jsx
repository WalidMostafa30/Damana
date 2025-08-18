import DamanaCard from "./DamanaCard";
import noDataImg from "../../assets/images/No data-pana 1.png";
import { Link } from "react-router-dom";

const DamanaList = ({ data = [] }) => {
  if (!data || data.length === 0)
    return (
      <div className="flex items-center justify-center flex-col gap-4 mt-8">
        <img src={noDataImg} alt="no data" loading="lazy" className="w-96" />
        <p className="text-lg">
          لا توجد ضمانات حالية بعد. يمكنك البدء الآن من هنا:{" "}
          <Link to="/add-damana" className="text-primary font-bold">
            طلب ضمانة جديدة
          </Link>
        </p>
      </div>
    );

  return (
    <section className="space-y-4">
      {data.map((damana) => (
        <DamanaCard key={damana.id} damana={damana} />
      ))}
    </section>
  );
};

export default DamanaList;
