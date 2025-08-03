import { CiCalendarDate } from "react-icons/ci";
import Timer from "../../components/common/Timer";

const DamanaDetailsHead = ({ hours, minutes }) => {
  return (
    <div
      className={`grid lg:grid-cols-2 ${
        hours && minutes ? "xl:grid-cols-4" : "xl:grid-cols-3"
      } gap-4 whiteContainer`}
    >
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
      {hours && minutes && <Timer hours={hours} minutes={minutes} />}
    </div>
  );
};

export default DamanaDetailsHead;
