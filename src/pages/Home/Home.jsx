import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useTranslation } from "react-i18next";
import PageTitle from "../../components/common/PageTitle";
import HomeSlider from "./HomeSlider/HomeSlider";
import Sale from "./Sale";
import Purchase from "./Purchase";
import { fetchDamanat } from "../../services/damanaServices";
import FAQ from "./FAQ";
import { getApplicationConfiguration } from "../../services/staticDataService";

const Home = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState("sell");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [tempRange, setTempRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [showPicker, setShowPicker] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: [
        "damanat",
        selectedType,
        selectedStatus,
        dateRange
          ? {
              created_at_from: dateRange.startDate.toISOString().split("T")[0],
              created_at_to: dateRange.endDate.toISOString().split("T")[0],
            }
          : null,
      ],
      queryFn: fetchDamanat,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });

  const { data: configData } = useQuery({
    queryKey: ["applicationConfiguration"],
    queryFn: getApplicationConfiguration,
  });

  const damana_status_options = [
    { value: "", label: t("pages.home.all") },
    ...(configData?.filer_statuses
      ? Object.entries(configData.filer_statuses).map(([key, value]) => ({
          value: key,
          label: value,
        }))
      : []),
  ];

  useEffect(() => {
    if (pathname === "/damanaty") {
      navigate("/damanaty/sale", { replace: true });
      setSelectedType("sell");
    } else if (pathname.includes("/sale")) {
      setSelectedType("sell");
    } else if (pathname.includes("/purchase")) {
      setSelectedType("buy");
    }
  }, [pathname, navigate]);

  return (
    <section className="pageContainer grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="col-span-1 xl:col-span-2 space-y-4">
        <PageTitle
          title={t("pages.home.title")}
          subtitle={t("pages.home.subtitle")}
        />

        <section className="baseWhiteContainer space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
            <button
              onClick={() => {
                setSelectedType("sell");
                navigate("/damanaty/sale");
              }}
              className={`homeLink ${
                selectedType === "sell" ? "active-sale" : ""
              }`}
            >
              {t("pages.home.sellGuarantees")}
            </button>
            <button
              onClick={() => {
                setSelectedType("buy");
                navigate("/damanaty/purchase");
              }}
              className={`homeLink ${
                selectedType === "buy" ? "active-purchase" : ""
              }`}
            >
              {t("pages.home.buyGuarantees")}
            </button>

            <select
              className="filterBtn"
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
            >
              {damana_status_options.map((option) => (
                <option key={option.value ?? "all"} value={option.value ?? ""}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              className="filterBtn w-full h-full"
              onClick={() => setShowPicker(true)}
            >
              {dateRange
                ? `${dateRange.startDate.toLocaleDateString(
                    "en-GB"
                  )} - ${dateRange.endDate.toLocaleDateString("en-GB")}`
                : t("pages.home.selectDate")}
            </button>
          </div>

          {showPicker && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div
                className="bg-white w-full md:w-auto md:rounded-lg md:shadow-lg p-4 overflow-auto"
                dir="ltr"
              >
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
                    setDateRange(tempRange);
                    setShowPicker(false);
                  }}
                >
                  {t("pages.home.confirm")}
                </button>
              </div>
            </div>
          )}

          {pathname.includes("/sale") && (
            <Sale
              data={data?.pages.flatMap((page) => page.data) || []}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              loading={isLoading}
              error={error}
            />
          )}
          {pathname.includes("/purchase") && (
            <Purchase
              data={data?.pages.flatMap((page) => page.data) || []}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              loading={isLoading}
              error={error}
            />
          )}
        </section>
      </div>

      <aside className="space-y-8">
        <div className="whiteContainer text-center !p-8">
          <h3 className="text-2xl font-bold mb-4">
            {t("pages.home.welcomeTitle")}
          </h3>
          <p className="text-lg text-neutral-500 mb-4">
            {t("pages.home.welcomeSubtitle")}
          </p>
          <Link to="/add-damana" className="mainBtn">
            <FaCirclePlus className="text-2xl" />
            {t("pages.home.newRequest")}
          </Link>
        </div>

        <HomeSlider />
        <FAQ />
      </aside>
    </section>
  );
};

export default Home;
