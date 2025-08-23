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
  { day: "الجمعة", c1: 30, c2: 60, c3: 110, c4: 155 },
  { day: "الخميس", c1: 90, c2: 140, c3: 180, c4: 220 },
  { day: "الاربعاء", c1: 90, c2: 120, c3: 170, c4: 240 },
  { day: "الثلاثاء", c1: 90, c2: 120, c3: 170, c4: 230 },
  { day: "الاثنين", c1: 40, c2: 55, c3: 130, c4: 190 },
  { day: "الاحد", c1: 80, c2: 160, c3: 180, c4: 245 },
  { day: "السبت", c1: 80, c2: 130, c3: 160, c4: 230 },
];

const CommissionCard = () => {
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

            {/* الشركات */}
            <Bar dataKey="c1" stackId="a" fill="#2084c5" />
            <Bar dataKey="c2" stackId="a" fill="#1bbbc0" />
            <Bar dataKey="c3" stackId="a" fill="#39416e" />
            <Bar dataKey="c4" stackId="a" fill="#737aa1" />
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
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "#39416e" }}
          ></span>
          <span>شركة 3</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "#737aa1" }}
          ></span>
          <span>شركة 4</span>
        </div>
      </div>
    </div>
  );
};

export default CommissionCard;
