import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
  FiActivity,
} from "react-icons/fi";

const FinancialDashboard = () => {
  const [hasData, setHasData] = useState(false);

  // Gauge Chart Component using PieChart
  const GaugeChart = ({
    percentage,
    current,
    total,
    title,
    color,
    icon: Icon,
  }) => {
    const data = [
      { name: "completed", value: percentage, fill: color },
      { name: "remaining", value: 100 - percentage, fill: "#e5e7eb" },
    ];

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg bg-opacity-10`}
              style={{ backgroundColor: color + "20" }}
            >
              <Icon className="w-5 h-5" style={{ color: color }} />
            </div>
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          </div>
          <button
            className={`px-3 py-1 rounded-full text-white text-xs font-medium`}
            style={{ backgroundColor: color }}
          >
            {title.includes("معلقة")
              ? "معلقة"
              : title.includes("الشراء")
              ? "شراء"
              : "بيع"}
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={450}
                  innerRadius={35}
                  outerRadius={55}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-gray-800">
                {hasData ? current.toLocaleString() : "00"}
              </div>
              <div className="text-xs text-gray-500">إجمالي الحد</div>
              <div className="text-sm font-bold" style={{ color: color }}>
                {hasData ? `${percentage}%` : "00%"}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3 bg-gray-50 rounded-lg p-4">
          {[
            "إجمالي قيمة المعاملات غير المكتملة",
            "إجمالي المبلغ المدفوع",
            "إجمالي المبلغ المستحق",
            "إجمالي المبلغ المتوسط",
          ].map((label, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">
                {hasData
                  ? `${(Math.random() * 10000).toFixed(0)} JOD`
                  : "0 دينار أردني"}
              </span>
              <span className="text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Progress data for weekly view
  const progressData = [
    { day: "الجمعة", value: hasData ? 91 : 0, maxValue: 250, color: "#14b8a6" },
    { day: "الخميس", value: hasData ? 90 : 0, maxValue: 250, color: "#14b8a6" },
    {
      day: "الأربعاء",
      value: hasData ? 90 : 0,
      maxValue: 250,
      color: "#3b82f6",
    },
    {
      day: "الثلاثاء",
      value: hasData ? 90 : 0,
      maxValue: 250,
      color: "#3b82f6",
    },
    {
      day: "الاثنين",
      value: hasData ? 60 : 0,
      maxValue: 250,
      color: "#14b8a6",
    },
    { day: "الأحد", value: hasData ? 90 : 0, maxValue: 250, color: "#14b8a6" },
    { day: "السبت", value: hasData ? 80 : 0, maxValue: 250, color: "#14b8a6" },
  ];

  // Monthly revenue data
  const monthlyData = [
    { month: "يناير", week1: hasData ? 62 : 0, week2: hasData ? 30 : 0 },
    { month: "فبراير", week1: hasData ? 30 : 0, week2: hasData ? 45 : 0 },
    { month: "مارس", week1: hasData ? 10 : 0, week2: hasData ? 60 : 0 },
    { month: "أبريل", week1: hasData ? 11 : 0, week2: hasData ? 35 : 0 },
    { month: "مايو", week1: hasData ? 45 : 0, week2: hasData ? 80 : 0 },
    { month: "يونيو", week1: hasData ? 91 : 0, week2: hasData ? 25 : 0 },
    { month: "يوليو", week1: hasData ? 19 : 0, week2: hasData ? 70 : 0 },
    { month: "أغسطس", week1: hasData ? 38 : 0, week2: hasData ? 45 : 0 },
    { month: "سبتمبر", week1: hasData ? 45 : 0, week2: hasData ? 55 : 0 },
    { month: "أكتوبر", week1: hasData ? 79 : 0, week2: hasData ? 65 : 0 },
    { month: "نوفمبر", week1: hasData ? 93 : 0, week2: hasData ? 75 : 0 },
    { month: "ديسمبر", week1: hasData ? 88 : 0, week2: hasData ? 85 : 0 },
  ];

  const ProgressBar = ({ day, value, maxValue, color }) => {
    const percentage = (value / maxValue) * 100;

    return (
      <div className="flex items-center gap-4 py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors">
        <div className="w-16 text-right text-sm text-gray-700 font-medium">
          {day}
        </div>
        <div className="flex-1">
          <div className="bg-gray-200 rounded-full h-8 relative overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all duration-1000 ease-out flex items-center justify-end pr-3 rounded-full`}
              style={{
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: color,
              }}
            >
              {hasData && value > 0 && (
                <span className="text-xs text-white font-bold">{value}</span>
              )}
            </div>
          </div>
        </div>
        <div className="w-12 text-sm text-gray-600 font-medium">{maxValue}</div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-sans"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            لوحة القيادة المالية
          </h1>
          <p className="text-gray-600">
            نظرة شاملة على الأداء المالي والمعاملات
          </p>
        </div>

        {/* Toggle Button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setHasData(!hasData)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
              hasData
                ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200"
                : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-200"
            }`}
          >
            {hasData ? (
              <FiTrendingDown className="w-5 h-5" />
            ) : (
              <FiTrendingUp className="w-5 h-5" />
            )}
            {hasData ? "إخفاء البيانات" : "عرض البيانات"}
          </button>
        </div>

        {/* Gauge Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <GaugeChart
            percentage={hasData ? 52 : 0}
            current={hasData ? 24533 : 0}
            total={47000}
            title="إجمالي قيمة المعاملات - معاملات غير مكتملة"
            color="#6366f1"
            icon={FiActivity}
          />
          <GaugeChart
            percentage={hasData ? 52 : 0}
            current={hasData ? 24533 : 0}
            total={47000}
            title="إجمالي قيمة معاملات الشراء"
            color="#3b82f6"
            icon={FiShoppingCart}
          />
          <GaugeChart
            percentage={hasData ? 52 : 0}
            current={hasData ? 205000 : 0}
            total={394000}
            title="إجمالي قيمة معاملات البيع"
            color="#14b8a6"
            icon={FiDollarSign}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Progress Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <FiUsers className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">العضوية</h3>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg font-medium shadow-sm hover:bg-blue-600 transition-colors">
                  أسبوعي
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                  شهري
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-teal-600 font-semibold text-lg mb-4 flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                حروف مرسومة
              </h4>
            </div>

            <div className="space-y-2 mb-6">
              {progressData.map((item, index) => (
                <ProgressBar
                  key={index}
                  day={item.day}
                  value={item.value}
                  maxValue={item.maxValue}
                  color={item.color}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-teal-400 rounded-full shadow-sm"></div>
                <span className="font-medium">1 أسبوع</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 rounded-full shadow-sm"></div>
                <span className="font-medium">2 أسبوع</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full shadow-sm"></div>
                <span className="font-medium">3 أسبوع</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-800 rounded-full shadow-sm"></div>
                <span className="font-medium">4 أسبوع</span>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FiTrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    اتجاه الإيرادات
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg font-medium shadow-sm hover:bg-blue-600 transition-colors">
                    شهري
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                    أسبوعي
                  </button>
                </div>
              </div>
              <h4 className="text-teal-600 font-semibold flex items-center gap-2">
                <FiActivity className="w-4 h-4" />
                حروف مرسومة
              </h4>
            </div>

            <div className="p-6">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                  <Bar dataKey="week1" fill="#14b8a6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="week2" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="px-6 pb-6">
              <div className="flex gap-6 text-sm bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-teal-400 rounded-full shadow-sm"></div>
                  <span className="font-medium">الأسبوع الأول</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                  <span className="font-medium">الأسبوع الثاني</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {hasData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {[
              {
                title: "إجمالي المبيعات",
                value: "1.2M JOD",
                change: "+12%",
                icon: FiDollarSign,
                color: "text-green-600",
                bg: "bg-green-100",
              },
              {
                title: "العملاء النشطون",
                value: "2,540",
                change: "+8%",
                icon: FiUsers,
                color: "text-blue-600",
                bg: "bg-blue-100",
              },
              {
                title: "معدل النمو",
                value: "15.3%",
                change: "+2.1%",
                icon: FiTrendingUp,
                color: "text-purple-600",
                bg: "bg-purple-100",
              },
              {
                title: "المعاملات اليوم",
                value: "423",
                change: "+5%",
                icon: FiActivity,
                color: "text-orange-600",
                bg: "bg-orange-100",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <FiArrowUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialDashboard;
