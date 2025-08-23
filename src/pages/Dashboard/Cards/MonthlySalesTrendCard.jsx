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

const data = [
  { month: "يناير", value: 42 },
  { month: "فبراير", value: 92 },
  { month: "مارس", value: 52 },
  { month: "ابريل", value: 57 },
  { month: "مايو", value: 15 },
  { month: "يونيو", value: 57 },
  { month: "يوليو", value: 11 },
  { month: "اغسطس", value: 41 },
  { month: "سبتمبر", value: 20 },
  { month: "اكتوبر", value: 32 },
  { month: "نوفمبر", value: 17 },
  { month: "ديسمبر", value: 69 },
];

const MonthlySalesTrendCard = () => {
  return (
    <div className="whiteContainer lg:col-span-4">
      <h3 className="text-lg font-semibold mb-4">اتجاه المبيعات الشهري</h3>
      <div dir="ltr">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" />
            <YAxis width="100%" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="اتجاه المبيعات"
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
