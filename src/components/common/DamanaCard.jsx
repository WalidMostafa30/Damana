import { CiCalendarDate, CiUser } from "react-icons/ci";
import { PiCertificate } from "react-icons/pi";
import { Link } from "react-router-dom";
import Timer from "./Timer";

const DamanaCard = ({
  hours,
  number,
  plate,
  seller,
  buyer,
  date,
  selectable = false,
  selected = false,
  onSelect = () => {},
}) => {
  return (
    <div
      onClick={selectable ? onSelect : undefined}
      className="whiteContainer !p-0"
      style={{ cursor: selectable ? "pointer" : "default" }}
    >
      <h3 className="lg:text-lg font-bold bg-secondary text-white px-4 py-2 rounded-t-2xl w-full lg:w-fit">
        بانتظار موافقه المشتري
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:p-6">
        <div className="grid xl:grid-cols-2 gap-2">
          <p className="lg:text-lg text-primary font-bold xl:col-span-2">
            رقم الضمانة: <span className="font-bold">{number}</span>
          </p>

          <div className="flex items-center gap-1 text-sm lg:text-base">
            <PiCertificate className="text-2xl" />
            <p>
              <span>رقم اللوحة</span> :{" "}
              <span className="font-bold">{plate}</span>
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm lg:text-base">
            <CiUser className="text-2xl" />
            <p>
              <span>البائع</span> : <span className="font-bold">{seller}</span>
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm lg:text-base">
            <CiUser className="text-2xl" />
            <p>
              <span>المشتري</span> : <span className="font-bold">{buyer}</span>
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm lg:text-base">
            <CiCalendarDate className="text-2xl" />
            <p>{date}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Timer hours={hours} />
          {selectable ? (
            <span className="w-10 h-10 rounded-full border-2 border-primary p-1 flex items-center justify-center">
              {selected && (
                <span className="w-full h-full bg-primary rounded-full"></span>
              )}
            </span>
          ) : (
            <Link to="/damana" className="mainBtn w-full">
              عرض
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DamanaCard;
