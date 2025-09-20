import CancellationsCard from "./Cards/CancellationsCard";
import DashboardTable from "./Cards/DashboardTable";
import MonthlySalesTrendCard from "./Cards/MonthlySalesTrendCard";
import NumberOfTransactionsCards from "./Cards/NumberOfTransactionsCards";
import SmartAlertsCard from "./Cards/SmartAlertsCard";
import TotalCountCards from "./Cards/TotalCountCards";
import TransactionsByTypeCard from "./Cards/TransactionsByTypeCard";
import LoadingSection from "../../components/Loading/LoadingSection";
import FormError from "../../components/form/FormError";

const OperationalDashboard = ({
  dashboardData1,
  isLoading,
  isError,
  error,
  tableData,
}) => {
  console.log("Dashboard Data:", dashboardData1);

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
        {/* <SmartAlertsCard data={dashboardData1} /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-8">
        <TransactionsByTypeCard data={dashboardData1} />
        <CancellationsCard data={dashboardData1} />
      </div>

      <DashboardTable data={tableData} />
    </>
  );
};

export default OperationalDashboard;
