import CommissionCard from "./Cards/CommissionCard";
import DashboardTable from "./Cards/DashboardTable";
import RevenueTrendCard from "./Cards/RevenueTrendCard";
import SalesPurchaseTransactionsCard from "./Cards/SalesPurchaseTransactionsCard";

const transactionsData = [
  {
    title: "معاملات غير مملوكة",
    amount: "24,533",
    percentage: 52,
    typeColor: "#07124a",
    bars: [
      { name: "A", value: 80, fill: "#00b3b9" },
      { name: "B", value: 70, fill: "#eda145" },
      { name: "C", value: 60, fill: "#fc2127" },
      { name: "D", value: 90, fill: "#0e7ac0" },
    ],
    stats: [
      {
        label: "إجمالي قيمة المعاملات قيد التنفيذ",
        value: "240,000 دينار أردني",
        progress: 80,
        color: "#0e7ac0",
      },
      {
        label: "إجمالي المبالغ المتأخرة",
        value: "121,000 دينار أردني",
        progress: 40,
        color: "#fc2127",
      },
      {
        label: "إجمالي المبالغ المعلقة",
        value: "240,000 دينار أردني",
        progress: 60,
        color: "#eda145",
      },
      {
        label: "إجمالي المبالغ المصروفة",
        value: "240,000 دينار أردني",
        progress: 50,
        color: "#00b3b9",
      },
    ],
  },
  {
    title: "معاملات شراء",
    amount: "24,533",
    percentage: 52,
    typeColor: "#0e7ac0",
    bars: [
      { name: "A", value: 85, fill: "#00b3b9" },
      { name: "B", value: 75, fill: "#eda145" },
      { name: "C", value: 65, fill: "#fc2127" },
      { name: "D", value: 95, fill: "#0e7ac0" },
    ],
    stats: [
      {
        label: "إجمالي قيمة المعاملات قيد التنفيذ",
        value: "240,000 دينار أردني",
        progress: 80,
        color: "#0e7ac0",
      },
      {
        label: "إجمالي المبالغ المتأخرة",
        value: "121,000 دينار أردني",
        progress: 40,
        color: "#fc2127",
      },
      {
        label: "إجمالي المبالغ المعلقة",
        value: "240,000 دينار أردني",
        progress: 60,
        color: "#eda145",
      },
      {
        label: "إجمالي المبالغ المصروفة",
        value: "240,000 دينار أردني",
        progress: 50,
        color: "#00b3b9",
      },
    ],
  },
  {
    title: "معاملات بيع",
    amount: "205,000",
    percentage: 52,
    typeColor: "#00b3b9",
    bars: [
      { name: "A", value: 90, fill: "#00b3b9" },
      { name: "B", value: 80, fill: "#eda145" },
      { name: "C", value: 70, fill: "#fc2127" },
      { name: "D", value: 100, fill: "#0e7ac0" },
    ],
    stats: [
      {
        label: "إجمالي قيمة المعاملات قيد التنفيذ",
        value: "114,500 دينار أردني",
        progress: 60,
        color: "#0e7ac0",
      },
      {
        label: "إجمالي المبالغ المتأخرة",
        value: "25,000 دينار أردني",
        progress: 20,
        color: "#fc2127",
      },
      {
        label: "إجمالي المبالغ المعلقة",
        value: "35,500 دينار أردني",
        progress: 40,
        color: "#eda145",
      },
      {
        label: "إجمالي المبالغ المصروفة",
        value: "30,000 دينار أردني",
        progress: 30,
        color: "#00b3b9",
      },
    ],
  },
];
const FinancialDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {transactionsData.map((card, index) => (
          <SalesPurchaseTransactionsCard key={index} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <RevenueTrendCard />
        <CommissionCard />
      </div>

      <DashboardTable />
    </>
  );
};

export default FinancialDashboard;
