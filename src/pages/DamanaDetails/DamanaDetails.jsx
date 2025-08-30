import DetailsCard from "../../components/common/DetailsCard";
import ActionsSection from "./ActionsSection";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDamanaDetails } from "../../services/damanaServices";
import LoadingPage from "../../components/Loading/LoadingPage";
import Timer from "../../components/common/Timer";
import { CiCalendarDate } from "react-icons/ci";
import CopyToClipboard from "../../components/common/CopyToClipboard";
import { toArabicWord } from "number-to-arabic-words/dist/index-node.js";

const DamanaDetails = () => {
  const { id } = useParams();

  // 🛠 جلب بيانات الضمانة
  const {
    data: damana,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["damana-details", id],
    queryFn: () => fetchDamanaDetails(id),
    enabled: !!id, // يتأكد إن id موجود قبل ما يعمل الطلب
  });
  console.log("Damana Details:", damana);

  if (isLoading) return <LoadingPage />;

  if (isError)
    return (
      <p className="text-center text-red-500 p-4 text-xl">
        فشل في تحميل البيانات: {error.message}
      </p>
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

  // const isDisabled = damana?.is_expired || damana?.blocked;

  const pageTitle = (title, large = false, color = "var(--color-primary)") => (
    <h3
      className={`font-bold text-white px-4 py-2 rounded-se-2xl w-fit ${
        large ? "text-lg lg:text-2xl" : "lg:text-xl !bg-primary"
      } `}
      style={{
        backgroundColor:
          large && color ? `#${color}` : "var(--color-secondary)",
      }}
    >
      {title}
    </h3>
  );

  const formatNumber = (num) => {
    if (num === null || num === undefined || num === "") return "-";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <article className="pageContainer relative">
      {/* {isDisabled ? (
        <section className="absolute z-30 top-0 left-0 w-full h-full bg-gray-500/50 flex items-center justify-center p-4">
          <p className="whiteContainer text-xl text-center">
            هذه الضمانة غير نشطة أو محظورة. لا يمكن إجراء أي إجراءات عليها
          </p>
        </section>
      ) : null} */}

      {pageTitle(
        damana?.status_translate || "جار التحميل...",
        true,
        damana?.status_color
      )}

      <section className="baseWhiteContainer space-y-4">
        <div className="whiteContainer flex items-start lg:items-center justify-between flex-col lg:flex-row gap-4">
          <div className="flex items-center gap-2">
            <p className="font-medium">رقم الضمانة:</p>
            <CopyToClipboard text={damana?.serial_number} />
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium">رقم الترميز واللوحة:</p>
            <p className="text-primary font-bold">{`${damana?.plate_number}-${damana?.plate_number}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <CiCalendarDate className="text-2xl" />
            <p className="text-primary font-bold">
              {new Date(damana?.created_at).toLocaleDateString("ar-EG")}
            </p>
          </div>
          <Timer expiryDate={damana?.schedule_expired_at} />
        </div>

        {/* بيانات البائع */}
        <div>
          {pageTitle("بيانات البائع")}
          <DetailsCard
            data={[
              { label: "الاسم", value: damana?.seller?.name },
              { label: "رقم الهاتف", value: damana?.seller?.full_mobile },
              { label: "رقم الوطني", value: damana?.seller?.national_number },
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
              { label: "رقم الوطني", value: damana?.buyer?.national_number },
            ]}
          />
        </div>

        {/* بيانات المركبة */}
        <div>
          {pageTitle("بيانات المركبة")}
          <DetailsCard data={vehicleData} col={2} />
        </div>

        {/* بيانات الضمانة */}
        <div>
          {pageTitle("بيانات الضمانة")}
          <DetailsCard
            data={[
              {
                label: "قيمة المركبة",
                value: `${formatNumber(damana?.vehicle_price)} دينار أردني`,
              },
              {
                label: "عمولة الضمانة",
                value: `${formatNumber(
                  damana?.commission_value_before_discount
                )} دينار`,
              },
              { label: "كود الخصم", value: damana?.code || "-" },
              {
                label: "نسبة الخصم",
                value: damana?.discount
                  ? `${formatNumber(damana?.discount)}${
                      damana?.discount_type === "percentage" ? "%" : " دينار"
                    }`
                  : "-",
              },
              {
                label: "العمولة بعد الخصم",
                value: `${formatNumber(damana?.commission_value)} دينار`,
              },
              {
                label: "سعر الضمانة الكلي",
                value: `${formatNumber(
                  damana?.vehicle_price_with_commission
                )} دينار أردني`,
              },
              {
                label: "سعر الضمانة الكلي كتابة",
                value: `${toArabicWord(
                  Number(damana?.vehicle_price_with_commission)
                )} دينار أردني فقط`,
              },
              // {
              //   label: "المستحق للبائع",
              //   value: `${damana?.due_to_seller} دينار`,
              // },
              // {
              //   label: "المخصوم من المشتري",
              //   value: `${damana?.deduction_from_buyer} دينار`,
              // },
            ]}
          />
        </div>

        {/* أزرار التحكم */}
        <ActionsSection damana={damana} />
      </section>
    </article>
  );
};

export default DamanaDetails;
