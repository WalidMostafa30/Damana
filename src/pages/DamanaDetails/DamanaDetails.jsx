import DetailsCard from "../../components/common/DetailsCard";
import ActionsSection from "./ActionsSection";
import DamanaDetailsHead from "../../components/common/DamanaDetailsHead";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDamanaDetails } from "../../services/damanaServices";

const DamanaDetails = () => {
  const { id } = useParams();

  // 🛠 جلب بيانات الضمانة
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["damana-details", id],
    queryFn: () => fetchDamanaDetails(id),
    enabled: !!id, // يتأكد إن id موجود قبل ما يعمل الطلب
  });

  if (isLoading) {
    return <p className="text-center mt-6">جاري التحميل...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-6">
        فشل في تحميل البيانات: {error.message}
      </p>
    );
  }

  const damana = data; 

  const pageTitle = (title, large = false, color = "primary") => (
    <h3
      className={`font-bold text-white px-4 py-2 rounded-se-2xl w-fit ${
        large ? "text-lg lg:text-2xl" : "lg:text-xl"
      } ${color === "secondary" ? "bg-secondary" : "bg-primary"}`}
    >
      {title}
    </h3>
  );

  const vehicleData = [
    damana?.plate_number && {
      label: "رقم اللوحة والترميز",
      value: `${damana.plate_number}-${damana.plate_number}`,
    },
    damana?.vehicle_type && {
      label: "نوع المركبة",
      value: damana.vehicle_type,
    },
    damana?.category && { label: "الصنف", value: damana.category },
    damana?.color && { label: "لون المركبة", value: damana.color },
    damana?.chassis_number && {
      label: "رقم الشاصي",
      value: damana.chassis_number,
    },
    damana?.registration_number && {
      label: "رقم التسجيل",
      value: damana.registration_number,
    },
    damana?.registration_date && {
      label: "تاريخ التسجيل",
      value: damana.registration_date,
    },
    damana?.manufacture_year && {
      label: "تاريخ الصنع",
      value: damana.manufacture_year,
    },
    damana?.license_expiry_date && {
      label: "تاريخ انتهاء الرخصة",
      value: damana.license_expiry_date,
    },
    damana?.licensing_center && {
      label: "مركز الترخيص",
      value: damana.licensing_center,
    },
    damana?.engine_number && {
      label: "رقم المحرك",
      value: damana.engine_number,
    },
    damana?.load_capacity && {
      label: "الحمولة",
      value: damana.load_capacity,
    },
    damana?.registration_type && {
      label: "صفة التسجيل",
      value: damana.registration_type,
    },
    damana?.country_name && {
      label: "الدولة",
      value: damana.country_name,
    },
    damana?.vehicle_classification && {
      label: "تصنيف المركبة",
      value: damana.vehicle_classification,
    },
    damana?.engine_capacity && {
      label: "سعة المحرك",
      value: damana.engine_capacity,
    },
  ].filter(Boolean);

  return (
    <article className="pageContainer">
      {pageTitle(
        damana?.status_translate || "جار التحميل...",
        true,
        "secondary"
      )}

      <section className="baseWhiteContainer space-y-4">
        {/* رأس الصفحة */}
        <DamanaDetailsHead hours={2} minutes={30} data={damana} />

        {/* بيانات البائع */}
        <div>
          {pageTitle("بيانات البائع")}
          <DetailsCard
            data={[
              { label: "الاسم", value: damana?.seller?.name },
              { label: "رقم الهاتف", value: damana?.seller?.full_mobile },
              { label: "رقم الوطنى", value: damana?.seller?.national_number },
            ]}
          />
        </div>

        {/* بيانات المشتري */}
        <div>
          {pageTitle("بيانات المشتري")}
          <DetailsCard
            data={[
              { label: "الاسم", value: damana?.buyer?.name },
              { label: "رقم الهاتف", value: damana?.buyer?.full_mobile },
              { label: "رقم الوطنى", value: damana?.buyer?.national_number },
            ]}
          />
        </div>

        {/* بيانات المركبة */}
        <div>
          {pageTitle("بيانات المركبة")}
          <DetailsCard data={vehicleData} col={2} />
        </div>

        {/* أزرار التحكم */}
        <ActionsSection damana={damana} />
      </section>
    </article>
  );
};

export default DamanaDetails;
