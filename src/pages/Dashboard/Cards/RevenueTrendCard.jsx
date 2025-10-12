import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTranslation } from "react-i18next";

const colors = [
  "#2084c5",
  "#1bbbc0",
  "#39416e",
  "#737aa1",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
]; // لو عندك شركات كتير زود ألوان هنا

const RevenueTrendCard = ({ data }) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) return null;

  // استخراج مفاتيح الشركات ديناميك (غير مفتاح day)
  const companyKeys = Object.keys(data[0]).filter((key) => key !== "day");

  return (
    <div className="whiteContainer">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{t("pages.revenueTrend.title")}</h3>
        {/* <p className="text-sky-600 font-medium">
          {t("pages.revenueTrend.groupName")}
        </p> */}
      </div>

      {/* Chart */}
      <div dir="ltr" style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            {/* الشركات ديناميك */}
            {companyKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend ديناميك */}
      <div className="flex justify-center gap-6 mt-4 text-sm flex-wrap">
        {companyKeys.map((key, index) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ background: colors[index % colors.length] }}
            ></span>
            <span>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueTrendCard;
