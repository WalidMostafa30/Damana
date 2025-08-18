import { CiCalendarDate, CiUser } from "react-icons/ci";
import { PiCertificate } from "react-icons/pi";
import { Link } from "react-router-dom";
import Timer from "./Timer";

const DamanaCard = ({
  damana,
  selectable = false,
  selected = false,
  onSelect = () => {},
}) => {
  console.log(damana);

  return (
    <div
      onClick={selectable ? onSelect : undefined}
      className={`whiteContainer !p-0 ${
        selectable && selected ? "border-2 border-primary" : ""
      }`}
      style={{ cursor: selectable ? "pointer" : "default" }}
    >
      <h3
        className="lg:text-lg font-bold text-white px-4 py-2 rounded-t-2xl w-full lg:w-fit"
        style={{
          backgroundColor: damana?.status_color || "var(--color-secondary)",
        }}
      >
        {damana?.status_translate}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:p-6">
        <div className="grid xl:grid-cols-2 gap-2">
          <p className="lg:text-lg text-primary font-bold xl:col-span-2">
            رقم الضمانة:{" "}
            <span className="font-bold">{damana?.serial_number}</span>
          </p>

          <div className="flex items-center gap-1 text-sm lg:text-base">
            <PiCertificate className="text-2xl" />
            <p>
              <span>رقم اللوحة</span> :{" "}
              <span className="font-bold">{damana?.plate_number_code}</span>
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm lg:text-base">
            <CiUser className="text-2xl" />
            <p>
              <span>البائع</span> :{" "}
              <span className="font-bold">{damana?.seller?.name}</span>
            </p>
          </div>

          <div className="flex items-center gap-1 text-sm lg:text-base">
            <CiCalendarDate className="text-2xl" />
            <p>{`${damana?.vehicle_price} دينار أردني`}</p>
          </div>
          <div className="flex items-center gap-1 text-sm lg:text-base">
            <CiCalendarDate className="text-2xl" />
            <p>{new Date(damana?.created_at).toLocaleDateString("ar-EG")}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Timer expiryDate={damana?.schedule_expired_at} />
          {selectable ? (
            <span className="w-10 h-10 rounded-full border-2 border-primary p-1 flex items-center justify-center">
              {selected && (
                <span className="w-full h-full bg-primary rounded-full"></span>
              )}
            </span>
          ) : (
            <Link to={`/damana/${damana?.id}`} className="mainBtn w-full">
              عرض
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DamanaCard;
