import LoadingSection from "../../../components/Loading/LoadingSection";
import noDataImg from "../../../assets/images/No data-pana 1.png";
import { GrDownload } from "react-icons/gr";
import { useTranslation } from "react-i18next";

const DashboardTable = ({
  data,
  isLoading,
  isError,
  tableType,
  setTableType,
  setPage,
}) => {
  const { t } = useTranslation();

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
      <div className="flex gap-2 border-b border-neutral-300">
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
