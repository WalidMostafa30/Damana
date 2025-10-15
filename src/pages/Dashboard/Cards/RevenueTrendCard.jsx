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
import { useState } from "react";
import { getRevenueTrendCardDashboard } from "../../../services/dashboardServices";
import LoadingSection from "../../../components/Loading/LoadingSection";
import { useQuery } from "@tanstack/react-query";

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

const RevenueTrendCard = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("weekly");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));


  // ✅ بيانات الداشبورد المالية
  const {
    data: RevenueTrendData,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useQuery({
    queryKey: ["getRevenueTrendCardDashboard", filter, month],
    queryFn: () => getRevenueTrendCardDashboard({ filter, month }),
    staleTime: 1000 * 60,
  });




  if (isLoading2) return <LoadingSection />;









  if (!RevenueTrendData || RevenueTrendData.length === 0) return null;


  // استخراج مفاتيح الشركات ديناميك (غير مفتاح day)
  const companyKeys = Object.keys(RevenueTrendData[0]).filter((key) => key !== "day");

  return (
    <div className="whiteContainer">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{t("pages.revenueTrend.title")}</h3>
        <div className="flex gap-2">

          <select
            className="filterBtn"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          // onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="weekly">{t("pages.dashboard.weekly")}</option>
            <option value="monthly">{t("pages.dashboard.monthly")}</option>
            {/* <option value="yearly">{t("pages.dashboard.yearly")}</option> */}

          </select>

          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="filterBtn rounded  " />



        </div>



        {/* <p className="text-sky-600 font-medium">
          {t("pages.revenueTrend.groupName")}
        </p> */}
      </div>

      {/* Chart */}
      <div dir="ltr" style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={RevenueTrendData}>
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
