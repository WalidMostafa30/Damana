import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const pieData = [
  { name: "مكتمل", value: 45, color: "#22c55e" },
  { name: "قيد التنفيذ", value: 30, color: "#3b82f6" },
  { name: "متأخر", value: 25, color: "#ef4444" },
];

const CancellationsCard = () => {
  return (
    <div className="whiteContainer lg:col-span-3">
      <h3 className="text-lg font-semibold mb-4">
        إحصائيات الطلبات
      </h3>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        {pieData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancellationsCard;
