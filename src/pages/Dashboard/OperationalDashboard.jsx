import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRunningDashboardTable } from "../../services/dashboardServices";
import LoadingSection from "../../components/Loading/LoadingSection";
import FormError from "../../components/form/FormError";
import NumberOfTransactionsCards from "./Cards/NumberOfTransactionsCards";
import TotalCountCards from "./Cards/TotalCountCards";
import MonthlySalesTrendCard from "./Cards/MonthlySalesTrendCard";
import TransactionsByTypeCard from "./Cards/TransactionsByTypeCard";
import CancellationsCard from "./Cards/CancellationsCard";
import DashboardTable from "./Cards/DashboardTable";

const OperationalDashboard = ({
  dashboardData1,
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
      "runningDashboardTable",
      page,
      tableType,
      filters.status,
      filters.dateRange,
      filters.company,
    ],
    queryFn: () =>
      getRunningDashboardTable({
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

  const tableData = {
    table_title: "جدول إدارة المعاملات",
    download_link: data?.download_table_link,
    table_header: [
      "رقم المعاملة",
      "اسم المشترى",
      "اسم البائع",
      "رقم المركبة",
      "قيمه المركبة",
      "عمولة ضمانة",
      "الحالة",
      "تاريخ الانشاء",
      "اخر تحديث",
    ],
    table_rows:
      data?.data?.map((item) => ({
        commission_number: item.serial_number,
        buyer_name: item?.buyer_company
          ? item?.buyer_company.ar_name
          : item?.buyer?.name,
        seller_name: item?.seller_company
          ? item?.seller_company.ar_name
          : item?.seller?.name,
        car_number: item.registration_number,
        car_value: `${item.vehicle_price} دينار أردني`,
        damana_commission: `${item.commission_value} دينار أردني`,
        status: (
          <span
            className="py-1 px-2 rounded-lg text-white"
            style={{ backgroundColor: `#${item.status_color}` }}
          >
            {item.status}
          </span>
        ),
        created_date: new Date(item.created_at).toLocaleDateString("en-GB"),
        last_update: new Date(item.updated_at).toLocaleDateString("en-GB"),
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

  if (isLoading) return <LoadingSection />;

  if (isError)
    return (
      <div className="text-center">
        <FormError
          errorMsg={error?.response?.data?.error_msg || error.message}
        />
      </div>
    );

  return (
    <>
      <NumberOfTransactionsCards data={dashboardData1} />
      <TotalCountCards data={dashboardData1} />
      <div className="grid grid-cols-1 gap-4 lg:gap-8">
        <MonthlySalesTrendCard data={dashboardData1} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-8">
        <TransactionsByTypeCard data={dashboardData1} />
        <CancellationsCard data={dashboardData1} />
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

export default OperationalDashboard;
