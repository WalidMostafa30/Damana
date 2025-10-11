import { CiDollar } from "react-icons/ci";
import { FiTrendingUp } from "react-icons/fi";
import { IoCheckmarkCircleOutline, IoWarningOutline } from "react-icons/io5";
import { PiFanLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const NumberOfTransactionsCards = ({ data = {} }) => {
  const { t } = useTranslation();

  const NumberOfTransactionsCardsList = [
    {
      id: 1,
      label: t("pages.transactions.active"),
      value: data?.activeTrans || 0,
      icon: <PiFanLight />,
      color: "#17d81f",
    },
    {
      id: 2,
      label: t("pages.transactions.pending"),
      value: data?.holdTrans || 0,
      icon: <IoWarningOutline />,
      color: "#dc8319",
    },
    {
      id: 3,
      label: t("pages.transactions.paid"),
      value: data?.paidTrans || 0,
      icon: <CiDollar />,
      color: "#3891cb",
    },
    {
      id: 4,
      label: t("pages.transactions.completed"),
      value: data?.finishedTrans || 0,
      icon: <IoCheckmarkCircleOutline />,
      color: "#29a77b",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8">
      {NumberOfTransactionsCardsList.map((card) => (
        <div key={card.id} className="whiteContainer">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-lg">{card.label}</p>
              <span
                className="p-2 rounded-full text-4xl"
                style={{ backgroundColor: card.color, color: "white" }}
              >
                {card.icon}
              </span>
            </div>

            <h4 className="text-4xl font-bold line-clamp-1">{card.value}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NumberOfTransactionsCards;
