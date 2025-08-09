import DamanaCard from "../../components/common/DamanaCard";
import noDataImg from "../../assets/images/No data-pana 1.png";
import { Link } from "react-router-dom";

const Sale = ({ data, loading, error }) => {
  if (loading) return <p className="text-center mt-4">جار التحميل...</p>;
  if (error)
    return <p className="text-center text-red-500">حدث خطأ في التحميل</p>;
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
        <DamanaCard
          key={damana.id}
          number={damana.serial_number}
          plate={damana.plate_number_code}
          seller={damana.seller?.name}
          id={damana.id}
          status_translate={damana.status_translate}
          price={`${damana.vehicle_price} دينار أردني`}
          date={new Date(damana.created_at).toLocaleDateString("ar-EG")}
          statusText={damana.status_translate}
          hours={Math.max(
            0,
            Math.floor(
              (new Date(damana.approval_period) - new Date()) / (1000 * 60 * 60)
            )
          )}
        />
      ))}
    </section>
  );
};

export default Sale;
