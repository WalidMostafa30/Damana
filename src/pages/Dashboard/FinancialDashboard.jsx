import { useQuery } from "@tanstack/react-query";
import CommissionCard from "./Cards/CommissionCard";
import DashboardTable from "./Cards/DashboardTable";
import RevenueTrendCard from "./Cards/RevenueTrendCard";
import SalesPurchaseTransactionsCard from "./Cards/SalesPurchaseTransactionsCard";
import { getFinancialDashboardTable } from "../../services/dashboardServices";
import { useState } from "react";

const FinancialDashboard = ({
  dashboardData2,
  isLoading,
  isError,
  error,
  filters,
}) => {
  const [tableType, setTableType] = useState("sell");
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading: isLoadingTable,
    isError: isErrorTable,
  } = useQuery({
    queryKey: [
      "financialDashboardTable",
      page,
      tableType,
      filters.status,
      filters.dateRange,
      filters.company,
    ],
    queryFn: () =>
      getFinancialDashboardTable({
        page,
        type: tableType,
        status: filters.status,
        created_at_from: filters.dateRange?.startDate
          ?.toISOString()
          .split("T")[0],
        created_at_to: filters.dateRange?.endDate?.toISOString().split("T")[0],
        company_id: filters.company,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <LoadingSection />;

  if (isError)
    return (
      <div className="text-center">
        <FormError
          errorMsg={error?.response?.data?.error_msg || error.message}
        />
      </div>
    );

  const transactionsData = [
    {
      title: "معاملات شراء",
      amount: dashboardData2?.buyCard?.all_vehicle_price || 0,
      percentage: dashboardData2?.buyCard?.all_vehicle_price_percent || 0,
      typeColor: "#0e7ac0",
      bars: [
        {
          name: "قيد التنفيذ",
          value: Number(dashboardData2?.buyCard?.progress_vehicle_price) || 0,
          fill: "#00b3b9",
        },
        {
          name: "معلقة",
          value: Number(dashboardData2?.buyCard?.hold_vehicle_price) || 0,
          fill: "#eda145",
        },
        {
          name: "متأخرة",
          value: Number(dashboardData2?.buyCard?.late_vehicle_price) || 0,
          fill: "#fc2127",
        },
        {
          name: "مصروفة",
          value: Number(dashboardData2?.buyCard?.released_vehicle_price) || 0,
          fill: "#0e7ac0",
        },
      ],
      stats: [
        {
          label: "إجمالي قيمة المعاملات قيد التنفيذ",
          value: `${dashboardData2?.buyCard?.progress_vehicle_price} دينار أردني`,
          progress:
            (Number(dashboardData2?.buyCard?.progress_vehicle_price) /
              Number(dashboardData2?.buyCard?.all_vehicle_price || 1)) *
            100,
          color: "#0e7ac0",
        },
        {
          label: "إجمالي المبالغ المتأخرة",
          value: `${dashboardData2?.buyCard?.late_vehicle_price} دينار أردني`,
          progress:
            (Number(dashboardData2?.buyCard?.late_vehicle_price) /
              Number(dashboardData2?.buyCard?.all_vehicle_price || 1)) *
            100,
          color: "#fc2127",
        },
        {
          label: "إجمالي المبالغ المعلقة",
          value: `${dashboardData2?.buyCard?.hold_vehicle_price} دينار أردني`,
          progress:
            (Number(dashboardData2?.buyCard?.hold_vehicle_price) /
              Number(dashboardData2?.buyCard?.all_vehicle_price || 1)) *
            100,
          color: "#eda145",
        },
        {
          label: "إجمالي المبالغ المصروفة",
          value: `${dashboardData2?.buyCard?.released_vehicle_price} دينار أردني`,
          progress:
            (Number(dashboardData2?.buyCard?.released_vehicle_price) /
              Number(dashboardData2?.buyCard?.all_vehicle_price || 1)) *
            100,
          color: "#00b3b9",
        },
      ],
    },
    {
      title: "معاملات بيع",
      amount: dashboardData2?.selleCard?.all_vehicle_price || 0,
      percentage: dashboardData2?.selleCard?.all_vehicle_price_percent || 0,
      typeColor: "#00b3b9",
      bars: [
        {
          name: "قيد التنفيذ",
          value: Number(dashboardData2?.selleCard?.progress_vehicle_price) || 0,
          fill: "#00b3b9",
        },
        {
          name: "معلقة",
          value: Number(dashboardData2?.selleCard?.hold_vehicle_price) || 0,
          fill: "#eda145",
        },
        {
          name: "متأخرة",
          value: Number(dashboardData2?.selleCard?.late_vehicle_price) || 0,
          fill: "#fc2127",
        },
        {
          name: "مصروفة",
          value: Number(dashboardData2?.selleCard?.released_vehicle_price) || 0,
          fill: "#0e7ac0",
        },
      ],
      stats: [
        {
          label: "إجمالي قيمة المعاملات قيد التنفيذ",
          value: `${dashboardData2?.selleCard?.progress_vehicle_price} دينار أردني`,
          progress:
            (Number(dashboardData2?.selleCard?.progress_vehicle_price) /
              Number(dashboardData2?.selleCard?.all_vehicle_price || 1)) *
            100,
          color: "#0e7ac0",
        },
        {
          label: "إجمالي المبالغ المتأخرة",
          value: `${dashboardData2?.selleCard?.late_vehicle_price} دينار أردني`,
          progress:
            (Number(dashboardData2?.selleCard?.late_vehicle_price) /
              Number(dashboardData2?.selleCard?.all_vehicle_price || 1)) *
            100,
          color: "#fc2127",
        },
        {
          label: "إجمالي المبالغ المعلقة",
          value: `${dashboardData2?.selleCard?.hold_vehicle_price} دينار أردني`,
          progress:
            (Number(dashboardData2?.selleCard?.hold_vehicle_price) /
              Number(dashboardData2?.selleCard?.all_vehicle_price || 1)) *
            100,
          color: "#eda145",
        },
        {
          label: "إجمالي المبالغ المصروفة",
          value: `${dashboardData2?.selleCard?.released_vehicle_price} دينار أردني`,
          progress:
            (Number(dashboardData2?.selleCard?.released_vehicle_price) /
              Number(dashboardData2?.selleCard?.all_vehicle_price || 1)) *
            100,
          color: "#00b3b9",
        },
      ],
    },
  ];

  const tableData = {
    table_title: "جدول الدفعات",
    download_link: data?.download_table_link,
    table_header: [
      "رقم المعاملة",
      "رقم المركبة",
      "قيمه المركبة",
      "حالة الدفع",
      "تاريخ الدفع",
    ],
    table_rows:
      data?.data.map((item) => ({
        // id: item.id,
        commission_number: item.serial_number,
        car_number: item.registration_number,
        car_value: `${item.vehicle_price} دينار أردني`,
        status: (
          <span
            className="py-1 px-2 rounded-lg text-white"
            style={{ backgroundColor: `#${item.status_color}` }}
          >
            {item.status}
          </span>
        ),
        paid_date: new Date(item.paid_at).toLocaleDateString("en-GB"),
      })) || [],
    pagination: {
      current_page: data?.current_page || 1,
      next_page_url: data?.next_page_url,
      prev_page_url: data?.prev_page_url,
      per_page: data?.per_page || 15,
      from: data?.from || 0,
      to: data?.to || 0,
      total: data?.total || 0,
    },
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {transactionsData.map((card, index) => (
          <SalesPurchaseTransactionsCard key={index} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <RevenueTrendCard data={dashboardData2?.RevenueTrendCard} />
        <CommissionCard data={dashboardData2?.CommissionCard} />
      </div>

      <DashboardTable
        data={tableData}
        isLoading={isLoadingTable}
        isError={isErrorTable}
        tableType={tableType}
        setTableType={setTableType}
        setPage={setPage}
      />
    </>
  );
};

export default FinancialDashboard;
