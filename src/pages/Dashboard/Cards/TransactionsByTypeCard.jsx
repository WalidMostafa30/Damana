import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const barData = [
  { name: "القطاع الأول", value: 345, color: "#60a5fa" },
  { name: "القطاع الثاني", value: 280, color: "#34d399" },
  { name: "القطاع الثالث", value: 420, color: "#fbbf24" },
];

const TransactionsByTypeCard = () => {
  return (
    <div className="whiteContainer lg:col-span-4">
      <h3 className="text-lg font-semibold mb-4">توزيع المعاملات حسب النوع</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
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
          <Bar dataKey="value" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsByTypeCard;
