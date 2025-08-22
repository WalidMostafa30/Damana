import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";
// import {
//   FiUsers,
//   FiFileText,
//   FiAlertTriangle,
//   FiCheckCircle,
//   FiDownload,
//   FiMapPin,
//   FiClock,
//   FiDollarSign,
//   FiUser,
//   FiSettings,
//   FiTrend,
// } from "react-icons/fi";
import {
  IoMdCheckmarkCircle,
  IoMdWarning,
  IoMdAlert,
  IoMdTime,
} from "react-icons/io";
import {
  MdLocationOn,
  MdPeople,
  MdAssignmentTurnedIn,
  MdTrendingUp,
} from "react-icons/md";
import {
  AiOutlineFileAdd,
  AiOutlineUserAdd,
  AiOutlineSend,
} from "react-icons/ai";
import { BsGraphUp, BsFileEarmarkText, BsPeople } from "react-icons/bs";

const OperationalDashboard = () => {
  // Sample data for charts
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

  const pieData = [
    { name: "مكتمل", value: 45, color: "#22c55e" },
    { name: "قيد التنفيذ", value: 30, color: "#3b82f6" },
    { name: "متأخر", value: 25, color: "#ef4444" },
  ];

  const barData = [
    { name: "القطاع الأول", value: 345, color: "#60a5fa" },
    { name: "القطاع الثاني", value: 280, color: "#34d399" },
    { name: "القطاع الثالث", value: 420, color: "#fbbf24" },
  ];

  const tableData = [
    {
      id: "TRX77104",
      date: "12/06/2024",
      type: "استيراد",
      amount: "15,000",
      quantity: "1500.000",
      unit: "كجم",
      status: "مكتمل",
      location: "الرياض",
      operator: "المشغل الأساسي",
    },
    {
      id: "TRX77105",
      date: "13/06/2024",
      type: "تصدير",
      amount: "18,500",
      quantity: "1800.000",
      unit: "كجم",
      status: "مكتمل",
      location: "الرياض",
      operator: "المشغل الأساسي",
    },
    {
      id: "TRX77106",
      date: "14/06/2024",
      type: "محلي",
      amount: "12,300",
      quantity: "1200.000",
      unit: "كجم",
      status: "مكتمل",
      location: "الرياض",
      operator: "المشغل الأساسي",
    },
    {
      id: "TRX77107",
      date: "15/06/2024",
      type: "استيراد",
      amount: "16,800",
      quantity: "1680.000",
      unit: "كجم",
      status: "قيد المعالجة",
      location: "الرياض",
      operator: "المشغل الأساسي",
    },
    {
      id: "TRX77108",
      date: "16/06/2024",
      type: "تصدير",
      amount: "14,200",
      quantity: "1420.000",
      unit: "كجم",
      status: "مكتمل",
      location: "الرياض",
      operator: "المشغل الأساسي",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Total Orders */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <IoMdCheckmarkCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">
              إجمالي الطلبات المكتملة
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">173</div>
        </div>

        {/* Processing Orders */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <IoMdTime className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">الطلبات قيد المعالجة</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">10</div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <IoMdWarning className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-500">الطلبات المعلقة</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">2</div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              {/* <FiDollarSign className="w-6 h-6 text-green-600" /> */}
            </div>
            <span className="text-sm text-gray-500">إجمالي الإيرادات</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">15</div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-orange-500 rounded-lg p-4 text-white cursor-pointer hover:bg-orange-600 transition-colors">
          <div className="flex items-center gap-3">
            <AiOutlineFileAdd className="w-6 h-6" />
            <div>
              <div className="text-lg font-semibold">إنشاء طلب جديد</div>
              <div className="text-sm opacity-90">2%</div>
            </div>
          </div>
        </div>

        <div className="bg-red-500 rounded-lg p-4 text-white cursor-pointer hover:bg-red-600 transition-colors">
          <div className="flex items-center gap-3">
            <IoMdAlert className="w-6 h-6" />
            <div>
              <div className="text-lg font-semibold">طلب عاجل</div>
              <div className="text-sm opacity-90">1.6%</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 text-white cursor-pointer hover:bg-gray-800 transition-colors">
          <div className="flex items-center gap-3">
            <AiOutlineSend className="w-6 h-6" />
            <div>
              <div className="text-lg font-semibold">
                الطلبات المرسلة أو المستلمة
              </div>
              <div className="text-sm opacity-90">104</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500 rounded-lg p-4 text-white cursor-pointer hover:bg-blue-600 transition-colors">
          <div className="flex items-center gap-3">
            <MdPeople className="w-6 h-6" />
            <div>
              <div className="text-lg font-semibold">عدد العملاء المسجلين</div>
              <div className="text-sm opacity-90">21</div>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 rounded-lg p-4 text-white cursor-pointer hover:bg-teal-600 transition-colors">
          <div className="flex items-center gap-3">
            <MdLocationOn className="w-6 h-6" />
            <div>
              <div className="text-lg font-semibold">عدد المناطق المخدومة</div>
              <div className="text-sm opacity-90">203</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Notifications Panel */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            التنبيهات الحالية
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <IoMdWarning className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="font-medium text-gray-800">تنبيه</div>
                <div className="text-sm text-gray-600">
                  يتطلب مراجعة الطلب رقم 1046 من المدير
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <IoMdAlert className="w-5 h-5 text-red-600" />
              <div>
                <div className="font-medium text-gray-800">تحذير</div>
                <div className="text-sm text-gray-600">
                  يتطلب مراجعة الطلب رقم 1046 من المدير
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <IoMdCheckmarkCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-gray-800">مكتمل</div>
                <div className="text-sm text-gray-600">
                  مؤهل للحصول على شهادة التسليم
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <BsGraphUp className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-gray-800">تقرير الأسبوع</div>
                <div className="text-sm text-gray-600">
                  يتم تحضير PERFORMANCE من بيانات المبيعات
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <AiOutlineUserAdd className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-gray-800">فريق العمل</div>
                <div className="text-sm text-gray-600">
                  انضم عضو جديد إلى المنصة
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            أداء المبيعات الشهري
          </h3>
          <ResponsiveContainer width="100%" height={300}>
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
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
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
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            توزيع الطلبات حسب النوع
          </h3>
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
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              جدول إدارة المعاملات
            </h3>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                المعاملات الحالية
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                {/* <FiDownload className="w-4 h-4" /> */}
                تحميل
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراء
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المشغل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المنطقة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوحدة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكمية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  القيمة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نوع المعاملة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم المعاملة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    عرض
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.operator}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        row.status === "مكتمل"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        row.type === "استيراد"
                          ? "bg-blue-100 text-blue-800"
                          : row.type === "تصدير"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {row.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">عرض 5 من أصل 1 النتائج</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              السابق
            </button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalDashboard;
