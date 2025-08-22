import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const lineData = [
  { month: "يناير", value: 35 },
  { month: "فبراير", value: 28 },
  { month: "مارس", value: 45 },
  { month: "أبريل", value: 32 },
  { month: "مايو", value: 55 },
  { month: "يونيو", value: 42 },
  { month: "يوليو", value: 65 },
  { month: "أغسطس", value: 48 },
  { month: "سبتمبر", value: 38 },
  { month: "أكتوبر", value: 52 },
  { month: "نوفمبر", value: 45 },
  { month: "ديسمبر", value: 58 },
];
const MonthlySalesTrendCard = () => {
  return (
    <div className="whiteContainer lg:col-span-4">
      <h3 className="text-lg font-semibold mb-4">أداء المبيعات الشهري</h3>

      <ResponsiveContainer height={300}>
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: "#3b82f6", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesTrendCard;
