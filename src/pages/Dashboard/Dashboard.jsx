import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import PageTitle from "../../components/common/PageTitle";
import FinancialDashboard from "./FinancialDashboard";
import OperationalDashboard from "./OperationalDashboard";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    status: "all",
    commission: "all",
    company: "all",
    dateRange: null, // 👈 في البداية مفيش تاريخ
  });

  const [tempRange, setTempRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [showPicker, setShowPicker] = useState(false);
  const [selectedType, setSelectedType] = useState("operational");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const closePicker = () => setShowPicker(false);

  useEffect(() => {
    if (pathname === "/dashboard") {
      navigate("/dashboard/operational", { replace: true });
      setSelectedType("operational");
    } else if (pathname.includes("operational")) {
      setSelectedType("operational");
    } else if (pathname.includes("financial")) {
      setSelectedType("financial");
    }
  }, [pathname, navigate]);

  return (
    <article className="pageContainer space-y-4 lg:space-y-8">
      <PageTitle
        title="لوحة التحكم الرئيسية"
        subtitle="لوحة التحكم التشغيلية والمالية الخاصة بجروب الشركات"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        <select
          className="filterBtn"
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="all">الحالة</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>

        {/* زرار التاريخ */}
        <button
          className="filterBtn w-full h-full"
          onClick={() => setShowPicker(true)}
        >
          {filters.dateRange
            ? `${filters.dateRange.startDate.toLocaleDateString()} - ${filters.dateRange.endDate.toLocaleDateString()}`
            : "اختر التاريخ"}
        </button>

        {/* مودال التاريخ */}
        {showPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full md:w-auto md:rounded-lg md:shadow-lg p-4 overflow-auto">
              <DateRange
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={[tempRange]}
                className="w-full"
                onChange={(item) => setTempRange(item.selection)}
              />

              <button
                className="mt-2 mainBtn"
                onClick={() => {
                  handleChange("dateRange", tempRange); // 👈 هنا بنسجل التاريخ بعد الضغط
                  closePicker();
                }}
              >
                تم
              </button>
            </div>
          </div>
        )}

        <select
          className="filterBtn"
          value={filters.commission}
          onChange={(e) => handleChange("commission", e.target.value)}
        >
          <option value="all">مبلغ العمولة</option>
          <option value="high">مرتفع</option>
          <option value="medium">متوسط</option>
        </select>

        <select
          className="filterBtn"
          value={filters.company}
          onChange={(e) => handleChange("company", e.target.value)}
        >
          <option value="all">الشركة</option>
          <option value="company1">شركة 1</option>
          <option value="company2">شركة 2</option>
        </select>
      </div>

      <div className="flex gap-2 border-b border-neutral-300">
        <button
          onClick={() => {
            setSelectedType("operational");
            navigate("/dashboard/operational");
          }}
          className={`homeLink flex-1 lg:flex-initial ${
            selectedType === "operational" ? "active-filter" : ""
          }`}
        >
          لوحة المعلومات التشغيلية
        </button>
        <button
          onClick={() => {
            setSelectedType("financial");
            navigate("/dashboard/financial");
          }}
          className={`homeLink flex-1 lg:flex-initial ${
            selectedType === "financial" ? "active-filter" : ""
          }`}
        >
          لوحه المعلومات المالية
        </button>
      </div>

      {pathname.includes("operational") && (
        <OperationalDashboard filters={filters} />
      )}
      {pathname.includes("financial") && (
        <FinancialDashboard filters={filters} />
      )}
    </article>
  );
};

export default Dashboard;
