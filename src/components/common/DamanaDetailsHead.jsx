import { CiCalendarDate } from "react-icons/ci";
import Timer from "../../components/common/Timer";

const DamanaDetailsHead = ({ data }) => {
  return (
    <div className={`grid lg:grid-cols-2 xl:grid-cols-4 gap-4 whiteContainer`}>
      <div className="flex items-center gap-2">
        <p className="font-medium">رقم الضمانة:</p>
        <p className="text-primary font-bold">{data?.serial_number}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-medium">رقم الترميز واللوحة:</p>
        <p className="text-primary font-bold">{`${data?.plate_number}-${data?.plate_number}`}</p>
      </div>
      <div className="flex items-center gap-2">
        <CiCalendarDate className="text-2xl" />
        <p className="text-primary font-bold">{data?.license_expiry_date}</p>
      </div>
      {<Timer expiryDate={data?.license_expiry_date} />}
    </div>
  );
};

export default DamanaDetailsHead;
