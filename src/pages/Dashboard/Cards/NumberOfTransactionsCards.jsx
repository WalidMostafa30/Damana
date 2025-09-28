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
          <div className="mb-4 flex justify-between items-center gap-2">
            <div>
              <p className="text-lg">{card.label}</p>
              <h4 className="text-4xl font-bold my-2 line-clamp-1">
                {card.value}
              </h4>
            </div>
            <span
              className="p-2 rounded-full text-4xl"
              style={{ backgroundColor: card.color, color: "white" }}
            >
              {card.icon}
            </span>
          </div>

          {/* مثال لو حبيت تترجم نسبة النمو */}
          {/* <p className="flex items-center gap-2">
            <FiTrendingUp
              className="inline-block text-2xl"
              style={{ color: card.color }}
            />
            <span style={{ color: card.color, fontSize: "22px" }}>1.3%</span>
            {t("pages.transactions.higherThanLastWeek")}
          </p> */}
        </div>
      ))}
    </div>
  );
};

export default NumberOfTransactionsCards;
