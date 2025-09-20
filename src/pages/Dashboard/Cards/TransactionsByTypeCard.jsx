import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  Cell,
} from "recharts";

const TransactionsByTypeCard = ({ data = {} }) => {
  const theData = [
    // { name: "بيع غير مملوك", value: 34, color: "#aedcf9" },
    {
      name: "شراء",
      value: Number(data?.buyerTransAvg).toFixed(2),
      color: "#0e7ac0",
    },
    {
      name: "بيع",
      value: Number(data?.salleTransAvg).toFixed(2),
      color: "#15b097",
    },
  ];

  const CustomLegend = () => {
    return (
      <ul className="flex gap-4 justify-center mt-4">
        {theData.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                backgroundColor: entry.color,
                borderRadius: "3px",
              }}
            ></span>
            <span>{entry.name}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="whiteContainer lg:col-span-4">
      <h3 className="text-lg font-semibold mb-4">توزيع المعاملات حسب النوع</h3>
      <div dir="ltr">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={theData}
            barSize={80}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend content={<CustomLegend />} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              <LabelList
                dataKey="value"
                position="top"
                formatter={(val) => `${val}%`}
                style={{ fill: "#0b1c47", fontWeight: "bold" }}
              />
              {theData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionsByTypeCard;
