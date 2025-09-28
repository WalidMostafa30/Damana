import { FiTrendingUp } from "react-icons/fi";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useTranslation } from "react-i18next";

const SalesPurchaseTransactionsCard = ({
  title,
  amount,
  percentage,
  bars,
  stats,
  typeColor,
}) => {
  const { t } = useTranslation();

  return (
    <div className="whiteContainer">
      <div className="flex flex-col items-center gap-4">
        {/* Header */}
        <div className="flex justify-between w-full text-gray-500">
          <span
            className="px-4 py-2 rounded-full text-white"
            style={{ backgroundColor: typeColor }}
          >
            {t(title)}
          </span>

          {/* مثال لو حبيت ترجمة نسبة النمو */}
          {/* <span
            style={{ color: typeColor }}
            className="flex items-center gap-2 text-xl"
          >
            <FiTrendingUp />
            <span>1.3%</span>
            <span>{t("pages.salesPurchase.higherThanLastWeek")}</span>
          </span> */}
        </div>

        {/* Chart (Half Pie) */}
        <div className="w-[220px] h-[150px]" dir="ltr">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={bars}
                dataKey="value"
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
              >
                {bars.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Value */}
        <h2 className="text-2xl font-bold">{amount} JOD</h2>
        <p className="text-gray-400">{t("pages.salesPurchase.totalCount")}</p>
        <p className="font-semibold text-secondary">{percentage}%</p>

        {/* Stats */}
        <div className="w-full flex flex-col gap-4 mt-2">
          {stats.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{t(item.label)}</span>
                <span>{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${item.progress}%`,
                    backgroundColor: item.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesPurchaseTransactionsCard;
