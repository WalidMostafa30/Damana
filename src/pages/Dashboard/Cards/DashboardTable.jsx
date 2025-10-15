import LoadingSection from "../../../components/Loading/LoadingSection";
import noDataImg from "../../../assets/images/No data-pana 1.png";
import { GrDownload } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { usePermission } from "../../../hooks/usePermission";
import { useState } from "react";
import DatePickerModal from "../../../components/form/DatePickerModal";
const DashboardTable = ({
  data,
  isLoading,
  isError,
  tableType,
  setTableType,
  setPage,
  selectedType,
  filters,
  setFilters,
}) => {
  const { t } = useTranslation();


  const { profile } = useSelector((state) => state.profile);
  const [tempRange, setTempRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [showPicker, setShowPicker] = useState(false);
  const { has } = usePermission();
  const { data: appConfig } = useSelector((state) => state.appConfig);
  const canViewRunning = has("company.dashboard.running");
  const canViewFinancial = has("company.dashboard.financial");
  const handleConfirmDate = () => {
    handleChange("dateRange", tempRange);
    setShowPicker(false);
  };

  const handleClearDate = () => {
    handleChange("dateRange", null);
    setShowPicker(false);
  };

  const handleResetDate = () => {
    setTempRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };
  const filer_financial_statuses = [
    { value: "", label: t("pages.home.all") },
    ...(appConfig?.filer_financial_statuses
      ? Object.entries(appConfig.filer_financial_statuses).map(
          ([key, value]) => ({
            value: key,
            label: value,
          })
        )
      : []),
  ];

  // ✅ تحديد الحالة بناءً على نوع الصفحة
  const currentStatusOptions =
    selectedType === "operational"
      ? filer_running_statuses
      : filer_financial_statuses;


  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };
  const damana_status_options = [
    { value: "", label: t("pages.home.all") },
    ...(appConfig?.filer_statuses
      ? Object.entries(appConfig.filer_statuses).map(([key, value]) => ({
          value: key,
          label: value,
        }))
      : []),
  ];
  // ✅ فلترة الحالة
  // ✅ فلترة الحالة التشغيلية
  const filer_running_statuses = [
    { value: "", label: t("pages.home.all") },
    ...(appConfig?.filer_running_statuses
      ? Object.entries(appConfig.filer_running_statuses).map(
          ([key, value]) => ({
            value: key,
            label: value,
          })
        )
      : []),
  ];

//*************** */




  if (isLoading) return <LoadingSection />;

  if (isError) return;

  const { pagination } = data;

  return (
    <div className="whiteContainer">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {data.table_title}
        </h3>

        {/* <a
          href={data.download_table_link}
          className="text-2xl text-secondary bg-secondary/10 hover:bg-secondary/30 p-2 rounded-lg cursor-pointer"
          download
        >
          <GrDownload />
        </a> */}
      </div>



      {/* الفلاتر */}
      <div className="md:flex gap-2 border-b border-neutral-300  grid grid-cols-2  ">
        <button
          className={`homeLink flex-1 lg:flex-initial ${
            tableType === "sell" ? "active-filter" : ""
          }`}
          onClick={() => setTableType("sell")}
        >
          {t("pages.table_dashboard.sellerTransactions")}
        </button>
        <button
          className={`homeLink flex-1 lg:flex-initial ${
            tableType === "buy" ? "active-filter" : ""
          }`}
          onClick={() => setTableType("buy")}
        >
          {t("pages.table_dashboard.buyerTransactions")}
        </button>






      {(canViewRunning || canViewFinancial) && (
        <div className="md:ms-auto ltr  grid grid-cols-2  col-span-full  gap-2 lg:gap-2 mb-2 ">
          {/* فلتر الحالة */}
          <select
            className="filterBtn"
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="all">{t("pages.dashboard.status")}</option>
            {currentStatusOptions.map((option) => (
              <option key={option.value ?? "all"} value={option.value ?? ""}>
                {option.label}
              </option>
            ))}
          </select>

          {/* فلتر التاريخ */}
          <button
            className="filterBtn w-full h-full"
            onClick={() => setShowPicker(true)}
          >
            {filters.dateRange
              ? `${filters.dateRange.startDate.toLocaleDateString()} - ${filters.dateRange.endDate.toLocaleDateString()}`
              : t("pages.dashboard.date_picker")}
          </button>

          {showPicker && (
            <DatePickerModal
              tempRange={tempRange}
              setTempRange={setTempRange}
              onConfirm={handleConfirmDate}
              onClear={handleClearDate}
              onReset={handleResetDate}
              onClose={() => setShowPicker(false)}
              confirmLabel={t("pages.dashboard.confirm_button")}
              clearLabel={t("pages.dashboard.clear_button")}
              resetLabel={t("pages.dashboard.reset_button")}
            />
          )}

          {/* فلتر الشركة */}
          {profile?.show_group_data && (
            <select
              className="filterBtn"
              value={filters.company}
              onChange={(e) => handleChange("company", e.target.value)}
            >
              <option value="">
                {isCompaniesLoading
                  ? t("loading")
                  : t("pages.dashboard.company")}
              </option>
              {companiesData?.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}


      </div>



      {/* الجدول */}
      <div className="overflow-x-auto">
        {data.table_rows.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {data.table_header.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-start font-medium tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {data.table_rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-primary font-medium"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center flex-col gap-4 mt-8">
            <img
              src={noDataImg}
              alt={t("pages.table_dashboard.noData")}
              loading="lazy"
              className="w-96"
            />
            <p className="text-lg">{t("pages.table_dashboard.noData")}</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex flex-col items-center lg:flex-row lg:justify-between gap-4">
        <div className="text-gray-500">
          {t("pages.table_dashboard.pagination", {
            from: pagination.from,
            to: pagination.to,
            total: pagination.total,
          })}
        </div>

        <div className="flex gap-1">
          <button
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled={!pagination.prev_page_url}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            {t("pages.table_dashboard.prev")}
          </button>

          <span className="px-3 py-1 bg-primary text-white rounded">
            {pagination.current_page}
          </span>

          <button
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled={!pagination.next_page_url}
            onClick={() => setPage((prev) => prev + 1)}
          >
            {t("pages.table_dashboard.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
