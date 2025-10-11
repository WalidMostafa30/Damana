import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/common/PageTitle";
import HomeSlider from "./HomeSlider/HomeSlider";
import Sale from "./Sale";
import Purchase from "./Purchase";
import { fetchDamanat } from "../../services/damanaServices";
import FAQ from "./FAQ";
import WelcomeComponent from "./WelcomeComponent";
import { useSelector } from "react-redux";
import DatePickerModal from "../../components/form/DatePickerModal";
import { usePermission } from "../../hooks/usePermission";
import noAccessImg from "../../assets/images/No data-pana 1.png";

const Home = () => {
  const { t } = useTranslation();
  const { hasAndUser } = usePermission();

  const canViewSell = hasAndUser("damanas.selle.list");
  const canViewBuy = hasAndUser("damanas.buy.list");

  console.log("canViewSell", canViewSell);
  console.log("canViewBuy", canViewBuy);

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
      enabled:
        (selectedType === "sell" && canViewSell) ||
        (selectedType === "buy" && canViewBuy), // ✅ تشغيل الـ API فقط لو عنده صلاحية
    });

  const { data: appConfig } = useSelector((state) => state.appConfig);

  const damana_status_options = [
    { value: "", label: t("pages.home.all") },
    ...(appConfig?.filer_statuses
      ? Object.entries(appConfig.filer_statuses).map(([key, value]) => ({
          value: key,
          label: value,
        }))
      : []),
  ];

  useEffect(() => {
    if (pathname === "/damanaty") {
      if (canViewSell) {
        navigate("/damanaty/sale", { replace: true });
        setSelectedType("sell");
      } else if (canViewBuy) {
        navigate("/damanaty/purchase", { replace: true });
        setSelectedType("buy");
      }
    } else if (pathname.includes("/sale")) {
      setSelectedType("sell");
    } else if (pathname.includes("/purchase")) {
      setSelectedType("buy");
    }
  }, [pathname, navigate, canViewSell, canViewBuy]);

  // دوال للتحكم في مودال التاريخ
  const handleConfirmDate = () => {
    setDateRange(tempRange);
    setShowPicker(false);
  };

  const handleClearDate = () => {
    setDateRange(null);
    setShowPicker(false);
  };

  const handleResetDate = () => {
    setTempRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };

  return (
    <section className="pageContainer grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="col-span-1 xl:col-span-2 space-y-4">
        <PageTitle
          title={t("pages.home.title")}
          subtitle={t("pages.home.subtitle")}
        />

        {canViewBuy || canViewSell ? (
          <section className="baseWhiteContainer space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
              {canViewSell && (
                <button
                  onClick={() => {
                    setSelectedType("sell");
                    navigate("/damanaty/sale");
                  }}
                  className={`homeLink ${
                    selectedType === "sell" ? "active-sale" : ""
                  }`}
                >
                  {t("pages.home.sellDamanas")}
                </button>
              )}

              {canViewBuy && (
                <button
                  onClick={() => {
                    setSelectedType("buy");
                    navigate("/damanaty/purchase");
                  }}
                  className={`homeLink ${
                    selectedType === "buy" ? "active-purchase" : ""
                  }`}
                >
                  {t("pages.home.buyDamanas")}
                </button>
              )}

              <select
                className="filterBtn"
                value={selectedStatus || ""}
                onChange={(e) => setSelectedStatus(e.target.value || null)}
              >
                {damana_status_options.map((option) => (
                  <option
                    key={option.value ?? "all"}
                    value={option.value ?? ""}
                  >
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
              <DatePickerModal
                tempRange={tempRange}
                setTempRange={setTempRange}
                onConfirm={handleConfirmDate}
                onClear={handleClearDate}
                onReset={handleResetDate}
                onClose={() => setShowPicker(false)}
                confirmLabel={t("pages.home.confirm")}
                clearLabel={t("pages.home.clear")}
                resetLabel={t("pages.home.reset")}
              />
            )}

            {pathname.includes("/sale") && canViewSell && (
              <Sale
                data={data?.pages.flatMap((page) => page.data) || []}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                loading={isLoading}
                error={error}
              />
            )}

            {pathname.includes("/purchase") && canViewBuy && (
              <Purchase
                data={data?.pages.flatMap((page) => page.data) || []}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                loading={isLoading}
                error={error}
              />
            )}
          </section>
        ) : (
          <img
            src={noAccessImg}
            alt="no access"
            className="w-full max-w-md mx-auto mt-10"
          />
        )}
      </div>

      <aside className="space-y-8">
        <WelcomeComponent />
        <HomeSlider />
        <FAQ />
      </aside>
    </section>
  );
};

export default Home;
