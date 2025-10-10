import { CiCalendarDate, CiUser } from "react-icons/ci";
import { PiCertificate } from "react-icons/pi";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Timer from "./Timer";
import CopyToClipboard from "./CopyToClipboard";

const DamanaCard = ({
  damana,
  selectable = false,
  selected = false,
  onSelect = () => {},
}) => {
  const { t } = useTranslation();
  const tr = (key) => t(`components.common.damanaCard.${key}`);

  console.log("DamanaCard ", damana);

  return (
    <div
      onClick={selectable ? onSelect : undefined}
      className={`whiteContainer !p-0 ${
        selectable && selected ? "border-2 border-primary" : ""
      }`}
      style={{ cursor: selectable ? "pointer" : "default" }}
    >
      <h3
        className="lg:text-lg font-bold text-white px-4 py-2 rounded-t-2xl min-w-full md:min-w-1/3 inline-block"
        style={{
          backgroundColor: damana?.status_color
            ? `#${damana.status_color}`
            : "var(--color-secondary)",
        }}
      >
        {damana?.status_translate}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:p-6">
        <div className="grid 2xl:grid-cols-2 gap-2">
          <p className="lg:text-base text-primary font-bold 2xl:col-span-2 flex items-center flex-wrap gap-1">
            {tr("DamanaNumber")}:{" "}
            <CopyToClipboard text={damana?.serial_number} />
            {damana?.pay_status_translate && (
              <div className="px-1 py-1 border-2 border-secondary text-secondary font-bold rounded-lg w-fit text-center  text-xs ms-1">
                {damana?.pay_status_translate}
              </div>
            )}
          </p>

          <div className="flex items-start gap-1 text-sm lg:text-sm">
            <PiCertificate className="text-2xl" />
            <p>
              <span>{tr("plateNumber")}</span> :{" "}
              <span className="font-bold">{damana?.plate_number_code}</span>
            </p>
          </div>

          <div className="flex items-start gap-1 text-sm lg:text-sm">
            <CiUser className="text-2xl" />
            <p>
              <span>{tr("seller")}</span> :{" "}
              <span className="font-bold">
                {damana?.seller_company
                  ? damana?.seller_company.ar_name
                  : damana?.seller?.name}
              </span>
            </p>
          </div>

          <div className="flex items-start gap-1 text-sm lg:text-sm">
            <FaMoneyBill1Wave className="text-2xl" />
            <p>
              {damana?.vehicle_price} {tr("price")}
            </p>
          </div>

          <div className="flex items-start gap-1 text-sm lg:text-sm">
            <CiCalendarDate className="text-2xl" />
            <p>
              <span>{tr("date")}: </span>
              {new Date(damana?.created_at).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-end gap-2">
          {!damana.is_expired &&
            damana.status != "finished" &&
            damana.status != "rejected" &&
            damana.status != "cancelled" &&
            damana.status != "expired" &&
            damana.status != "cancellable" &&
            damana?.schedule_expired_at && (
              <Timer expiryDate={damana?.schedule_expired_at} />
            )}

          {selectable ? (
            <span className="w-10 h-10 rounded-full border-2 border-primary p-1 flex items-center justify-center">
              {selected && (
                <span className="w-full h-full bg-primary rounded-full"></span>
              )}
            </span>
          ) : (
            <Link to={`/damana/${damana?.id}`} className="mainBtn w-full">
              {tr("show")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DamanaCard;
