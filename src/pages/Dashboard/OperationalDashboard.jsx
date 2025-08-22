import CancellationsCard from "./Cards/CancellationsCard";
import DashboardTable from "./Cards/DashboardTable";
import MonthlySalesTrendCard from "./Cards/MonthlySalesTrendCard";
import NumberOfTransactionsCards from "./Cards/NumberOfTransactionsCards";
import SmartAlertsCard from "./Cards/SmartAlertsCard";
import TotalCountCards from "./Cards/TotalCountCards";
import TransactionsByTypeCard from "./Cards/TransactionsByTypeCard";

const OperationalDashboard = () => {
  return (
    <>
      <NumberOfTransactionsCards />
      <TotalCountCards />

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-8">
        <MonthlySalesTrendCard />
        <SmartAlertsCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-8">
        <TransactionsByTypeCard />
        <CancellationsCard />
      </div>

      <DashboardTable />
    </>
  );
};

export default OperationalDashboard;
