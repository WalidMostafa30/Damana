import { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import FinancialDashboard from "./FinancialDashboard";
import OperationalDashboard from "./OperationalDashboard";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {
  getCompanies,
  getFinancialDashboard,
  getRunningDashboard,
} from "../../services/dashboardServices";
import { useSelector } from "react-redux";
import { usePermission } from "../../hooks/usePermission";
import DatePickerModal from "../../components/form/DatePickerModal";
import LoadingPage from "../../components/Loading/LoadingPage";

const Dashboard = () => {
  const { has, loading } = usePermission();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState("operational");

  const canViewRunning = has("company.dashboard.running");
  const canViewFinancial = has("company.dashboard.financial");

  // ✅ بيانات الداشبورد التشغيلية
  const {
    data: dashboardData1,
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
  } = useQuery({
    queryKey: ["runningDashboard"],
    queryFn: getRunningDashboard,
    enabled: !loading && canViewRunning,
    staleTime: 1000 * 60,
  });

  // ✅ بيانات الداشبورد المالية
  const {
    data: dashboardData2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useQuery({
    queryKey: ["financialDashboard"],
    queryFn: getFinancialDashboard,
    enabled: !loading && canViewFinancial,
    staleTime: 1000 * 60,
  });

  // ✅ تحديث نوع الداشبورد حسب المسار
  useEffect(() => {
    if (pathname === "/dashboard") {
      if (canViewRunning) {
        navigate("/dashboard/operational", { replace: true });
        setSelectedType("operational");
      } else if (canViewFinancial) {
        navigate("/dashboard/financial", { replace: true });
        setSelectedType("financial");
      }
    } else if (pathname.includes("operational")) {
      setSelectedType("operational");
    } else if (pathname.includes("financial")) {
      setSelectedType("financial");
    }
  }, [pathname, navigate, canViewRunning, canViewFinancial]);


  // ✅ أثناء التحميل
  if (loading) return <LoadingPage />;

  return (
    <article className="pageContainer space-y-4 lg:space-y-8">
      <PageTitle
        title={t("pages.dashboard.pageTitle")}
        subtitle={t("pages.dashboard.subtitle")}
      />

   
      {/* ✅ تبويبات الداشبورد - تظهر فقط لو في صلاحية */}
      <div className="flex gap-2 border-b border-neutral-300">
        {canViewRunning && (
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
        )}

        {canViewFinancial && (
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
        )}
      </div>

      {/* ✅ محتوى الداشبورد */}
      {pathname.includes("operational") && canViewRunning && (
        <OperationalDashboard
          dashboardData1={dashboardData1}
          isLoading={isLoading1}
          isError={isError1}
          error={error1}
        />
      )}


      {pathname.includes("financial") && canViewFinancial && (
        <FinancialDashboard
          filters={{}}
          dashboardData2={dashboardData2}
          isLoading={isLoading2}
          isError={isError2}
          error={error2}
        />
      )}
    </article>
  );
};

export default Dashboard;
