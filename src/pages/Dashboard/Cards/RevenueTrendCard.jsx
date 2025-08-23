import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "الجمعة", company1: 62, company2: 57 },
  { day: "الخميس", company1: 11, company2: 10 },
  { day: "الاربعاء", company1: 45, company2: 30 },
  { day: "الثلاثاء", company1: 67, company2: 91 },
  { day: "الاثنين", company1: 19, company2: 15 },
  { day: "الاحد", company1: 38, company2: 45 },
  { day: "السبت", company1: 88, company2: 79 },
];

const RevenueTrendCard = () => {
  return (
    <div className="whiteContainer">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">اتجاه الإيرادات</h3>
        <p className="text-sky-600 font-medium">جروب مرسيدس</p>
      </div>

      {/* Chart */}
      <div dir="ltr" style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="company1" fill="#2084c5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="company2" fill="#1bbbc0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "#2084c5" }}
          ></span>
          <span>شركة 1</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "#1bbbc0" }}
          ></span>
          <span>شركة 2</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueTrendCard;
