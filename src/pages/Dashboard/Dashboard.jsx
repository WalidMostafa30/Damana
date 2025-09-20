import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import PageTitle from "../../components/common/PageTitle";
import FinancialDashboard from "./FinancialDashboard";
import OperationalDashboard from "./OperationalDashboard";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {
  getCompanies,
  getRunningDashboard,
  getRunningDashboardTable,
} from "../../services/dashboardServices";

const Dashboard = () => {
  const { t } = useTranslation();

  const {
    data: dashboardData1,
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
  } = useQuery({
    queryKey: ["runningDashboard"],
    queryFn: getRunningDashboard,
    staleTime: 1000 * 60,
  });

  const { data: tableData } = useQuery({
    queryKey: ["runningDashboardTable"],
    queryFn: getRunningDashboardTable,
    staleTime: 1000 * 60,
  });

  const [filters, setFilters] = useState({
    status: "all",
    commission: "all",
    company: "all",
    dateRange: null,
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

  const { data: companiesData } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
    staleTime: 1000 * 60, // دقيقة قبل ما يعيد الفetch
  });

  return (
    <article className="pageContainer space-y-4 lg:space-y-8">
      <PageTitle
        title={t("pages.dashboard.pageTitle")}
        subtitle={t("pages.dashboard.subtitle")}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        <select
          className="filterBtn"
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="all">{t("pages.dashboard.status")}</option>
          <option value="active">{t("pages.dashboard.status_active")}</option>
          <option value="inactive">
            {t("pages.dashboard.status_inactive")}
          </option>
        </select>

        <button
          className="filterBtn w-full h-full"
          onClick={() => setShowPicker(true)}
        >
          {filters.dateRange
            ? `${filters.dateRange.startDate.toLocaleDateString()} - ${filters.dateRange.endDate.toLocaleDateString()}`
            : t("pages.dashboard.date_picker")}
        </button>

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
                  handleChange("dateRange", tempRange);
                  closePicker();
                }}
              >
                {t("pages.dashboard.confirm_button")}
              </button>
            </div>
          </div>
        )}

        <select
          className="filterBtn"
          value={filters.commission}
          onChange={(e) => handleChange("commission", e.target.value)}
        >
          <option value="all">{t("pages.dashboard.commission")}</option>
          <option value="high">{t("pages.dashboard.commission_high")}</option>
          <option value="medium">
            {t("pages.dashboard.commission_medium")}
          </option>
        </select>

        <select
          className="filterBtn"
          value={filters.company}
          onChange={(e) => handleChange("company", e.target.value)}
        >
          <option value="">{t("pages.dashboard.company")}</option>
          {companiesData?.map((comp) => (
            <option key={comp.id} value={comp.id}>
              {comp.name}
            </option>
          ))}
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
          {t("pages.dashboard.operational_tab")}
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
          {t("pages.dashboard.financial_tab")}
        </button>
      </div>

      {pathname.includes("operational") && (
        <OperationalDashboard
          filters={filters}
          dashboardData1={dashboardData1}
          isLoading={isLoading1}
          isError={isError1}
          error={error1}
          tableData={tableData}
        />
      )}
      {pathname.includes("financial") && (
        <FinancialDashboard filters={filters} />
      )}
    </article>
  );
};

export default Dashboard;
