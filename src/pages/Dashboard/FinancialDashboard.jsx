import CommissionCard from "./Cards/CommissionCard";
import DashboardTable from "./Cards/DashboardTable";
import RevenueTrendCard from "./Cards/RevenueTrendCard";
import SalesPurchaseTransactionsCard from "./Cards/SalesPurchaseTransactionsCard";

const FinancialDashboard = () => {
  return (
    <>
      <div>
        <SalesPurchaseTransactionsCard />
        <SalesPurchaseTransactionsCard />
        <SalesPurchaseTransactionsCard />
      </div>

      <div>
        <RevenueTrendCard />
        <CommissionCard />
      </div>

      <DashboardTable />
    </>
  );
};

export default FinancialDashboard;
