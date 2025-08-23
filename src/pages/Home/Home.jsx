import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import PageTitle from "../../components/common/PageTitle";
import HomeSlider from "./HomeSlider/HomeSlider";
import Sale from "./Sale";
import Purchase from "./Purchase";
import { fetchDamanat } from "../../services/damanaServices";
import FAQ from "./FAQ";
import { getApplicationConfiguration } from "../../services/staticDataService";

const Home = () => {
  const [selectedType, setSelectedType] = useState("sell");
  const [selectedStatus, setSelectedStatus] = useState(null);

  // هنا التاريخ الأساسي هيبقى فاضى
  const [dateRange, setDateRange] = useState(null);

  // هنا بس بنمسك الاختيار المؤقت (قبل ما يدوس تم)
  const [tempRange, setTempRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [showPicker, setShowPicker] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // جلب البيانات
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
          : null, // 👈 لو مفيش تاريخ مش هيتبعت
      ],
      queryFn: fetchDamanat,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });

  // جلب الكونفيج
  const { data: configData } = useQuery({
    queryKey: ["applicationConfiguration"],
    queryFn: getApplicationConfiguration,
  });

  const damana_status_options = [
    { value: "", label: "الكل" },
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
    <section className="pageContainer grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-1 lg:col-span-2 space-y-4">
        <PageTitle
          title="ضماناتى"
          subtitle="هنا تجد جميع الضمانات الخاصة بك مع كافة بياناتها."
        />

        <section className="baseWhiteContainer space-y-4">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-4">
            {/* نوع الضمانة */}
            <button
              onClick={() => {
                setSelectedType("sell");
                navigate("/damanaty/sale");
              }}
              className={`homeLink ${
                selectedType === "sell" ? "active-sale" : ""
              }`}
            >
              ضمانات البيع
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
              ضمانات الشراء
            </button>

            {/* فلتر الحالة */}
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

            {/* فلتر التاريخ */}
            <button
              className="filterBtn w-full h-full"
              onClick={() => setShowPicker(true)}
            >
              {dateRange
                ? `${dateRange.startDate.toLocaleDateString(
                    "ar-EG"
                  )} - ${dateRange.endDate.toLocaleDateString("ar-EG")}`
                : "اختر التاريخ"}
            </button>
          </div>

          {/* مودال اختيار التاريخ */}
          {showPicker && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white w-full md:w-auto md:rounded-lg md:shadow-lg p-4 overflow-auto">
                <DateRange
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={[tempRange]}
                  className="w-full"
                  onChange={(item) => setTempRange(item.selection)} // 👈 يغير المؤقت بس
                />
                <button
                  className="mt-2 mainBtn"
                  onClick={() => {
                    setDateRange(tempRange); // 👈 لما يدوس تم يتسجل التاريخ
                    setShowPicker(false);
                  }}
                >
                  تم
                </button>
              </div>
            </div>
          )}

          {/* عرض البيانات */}
          {pathname.includes("/sale") && (
            <Sale
              data={data?.pages.flatMap((page) => page.data) || []}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
          {pathname.includes("/purchase") && (
            <Purchase
              data={data?.pages.flatMap((page) => page.data) || []}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </section>
      </div>

      {/* Sidebar */}
      <aside className="space-y-8">
        <div className="whiteContainer text-center !p-8">
          <h3 className="text-2xl font-bold mb-4">مرحبًا بك في ضمانة!</h3>
          <p className="text-lg text-neutral-500 mb-4">
            يمكنك بدء ضمانة جديدة بالضغط على الزر أدناه
          </p>
          <Link to="/add-damana" className="mainBtn">
            <FaCirclePlus className="text-2xl" />
            طلب ضمانة جديدة
          </Link>
        </div>

        <HomeSlider />
        <FAQ />
      </aside>
    </section>
  );
};

export default Home;
