import { FaChartLine } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { PiSigma } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const TotalCountCards = ({ data = {} }) => {
  const { t } = useTranslation();

  


  const TotalCountCardsList = [
    {
      id: 1,
      label: t("pages.totalCount.carsSold"),
      value: data?.salleTrans_finished || 0,
      icon: <PiSigma />,
      color: "#00b3b9",
    },
    {
      id: 2,
      label: t("pages.totalCount.carsBought"),
      value: data?.buyerTrans_finished || 0,
      icon: <FaChartLine />,
      color: "#0e7ac0",
    },

    {
      id: 4,
      label: t("pages.totalCount.cancelRate"),
      value: `${data?.cancelledTransAvg || 0} %`,
      otherVal: `${data?.cancelledTrans || 0}`,
      icon: <IoMdClose />,
      color: "#fc2127",
    },

    {
      id: 5,
      label: t("pages.totalCount.expiredRate"),
      value: `${data?.expiredTransAvg || 0} %`,
      otherVal: `${data?.expiredTrans || 0}`,
      icon: <IoWarningOutline />,
      color: "#f28303",
    },
    
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
      {TotalCountCardsList.map((card) => (
        <div
          key={card.id}
          className="whiteContainer text-white"
          style={{ backgroundColor: card.color }}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-lg">{card.label}</p>
              <span
                className="p-2 rounded-full text-4xl"
                style={{ backgroundColor: "white", color: card.color }}
              >
                {card.icon}
              </span>
            </div>
            
            <div className="grid grid-cols-3">

{
  card.otherVal ? (

        <>
        
            <h4 className="text-4xl font-bold line-clacmp-1">
     {card.otherVal}
              </h4>

                  <span className="text-4xl text-gray-200">

                           {card.value}
                  </span>

        </>

  ) : (

            <h4 className="text-4xl font-bold line-clacmp-1">
            {card.value}
              </h4>

  )
}

        
            



              </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalCountCards;
