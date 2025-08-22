import { FaChartLine } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { PiSigma } from "react-icons/pi";
import { RiExchangeDollarLine } from "react-icons/ri";

const TotalCountCardsList = [
  {
    id: 1,
    label: "اجمالي السيارات المباعة",
    value: 205,
    icon: <PiSigma />,
    color: "#00b3b9",
  },
  {
    id: 2,
    label: "اجمالى السيارات المشتراة",
    value: 21,
    icon: <FaChartLine />,
    color: "#0e7ac0",
  },
  {
    id: 3,
    label: "السيارات المباعة غير المملوكة",
    value: 30,
    icon: <RiExchangeDollarLine />,
    color: "#07124a",
  },
  {
    id: 4,
    label: "معدل الالغاء",
    value: 30,
    icon: <IoMdClose />,
    color: "#fc2127",
  },
  {
    id: 5,
    label: "معدل انتهاء الصلاحية",
    value: 30,
    icon: <IoWarningOutline />,
    color: "#f28303",
  },
];
const TotalCountCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-8">
      {TotalCountCardsList.map((card) => (
        <div
          key={card.id}
          className="whiteContainer text-white"
          style={{ backgroundColor: card.color }}
        >
          <div className="mb-4 flex justify-between items-center gap-2">
            <div>
              <p className="text-lg">{card.label}</p>
              <h4 className="text-4xl font-bold mt-2">{card.value}</h4>
            </div>
            <span
              className="p-2 rounded-full text-4xl"
              style={{ backgroundColor: "white", color: card.color }}
            >
              {card.icon}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalCountCards;
