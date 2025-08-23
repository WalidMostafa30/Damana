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

const DashboardTable = () => {
  return (
    <div className="whiteContainer">
      <div className="py-6 border-b border-gray-200">
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
  );
};

export default DashboardTable;
