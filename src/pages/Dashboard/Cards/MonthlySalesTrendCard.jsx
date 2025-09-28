import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTranslation } from "react-i18next";

const MonthlySalesTrendCard = ({ data = {} }) => {
  const { t } = useTranslation();

  return (
    <div className="whiteContainer">
      <h3 className="text-lg font-semibold mb-4">
        {t("pages.monthlySalesTrend.title")}
      </h3>
      <div dir="ltr">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data?.getMonthlySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" />
            <YAxis width="100%" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name={t("pages.monthlySalesTrend.sales")}
              stroke="#3391cd"
              strokeWidth={2}
              dot={{ r: 6, fill: "#3391cd", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySalesTrendCard;
