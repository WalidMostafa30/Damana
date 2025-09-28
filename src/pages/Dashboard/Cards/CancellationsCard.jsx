import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

const CancellationsCard = ({ data = {} }) => {
  const { t } = useTranslation();

  const theData = [
    {
      name: t("pages.cancellations.buyer"),
      value: data?.cancelledBuyerAvg,
      color: "#3f4c82",
    },
    {
      name: t("pages.cancellations.seller"),
      value: data?.cancelledSellerAvg,
      color: "#1677c2",
    },
    {
      name: t("pages.cancellations.admin"),
      value: data?.cancelledAdminAvg,
      color: "#26c6da",
    },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontWeight: "bold", fontSize: "14px" }}
      >
        {`${theData[index].name} ${theData[index].value}%`}
      </text>
    );
  };

  return (
    <div className="whiteContainer lg:col-span-3">
      <h3 className="text-lg font-semibold mb-4">
        {t("pages.cancellations.title")}
      </h3>
      <div dir="ltr" style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={theData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              dataKey="value"
            >
              {theData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" align="center" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CancellationsCard;
