import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const colors = [
  "#2084c5",
  "#1bbbc0",
  "#39416e",
  "#737aa1",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
]; // لو زودت شركات أكتر حط ألوان زيادة هنا

const CommissionCard = ({ data }) => {
  if (!data || data.length === 0) return null;

  console.log("Commission Data:", data);
  

  // استخراج أسماء الشركات بشكل ديناميك من أول عنصر
  const companyKeys = Object.keys(data[0]).filter((key) => key !== "day");

  return (
    <div className="whiteContainer">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">العمولة</h3>
        <p className="text-sky-600 font-medium">جروب مرسيدس</p>
      </div>

      {/* Chart */}
      <div dir="ltr" style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="day" />
            <Tooltip />

            {/* الشركات ديناميك */}
            {companyKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={colors[index % colors.length]}
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

export default CommissionCard;
