import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/common/PageTitle";
import HomeSlider from "./HomeSlider/HomeSlider";
import Sale from "./Sale";
import Purchase from "./Purchase";
import { fetchDamanat } from "../../services/damanaServices";
import FAQ from "./FAQ";
import { getApplicationConfiguration } from "../../services/staticDataService";

const Home = () => {
  const [selectedType, setSelectedType] = useState("sell"); // ⬅ type
  const [selectedStatus, setSelectedStatus] = useState(null); // ⬅ status
  const [date, setDate] = useState(""); // ⬅ date filter
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // جلب البيانات
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["damanat", selectedType, selectedStatus, date],
      queryFn: fetchDamanat,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });

  const { data: configData } = useQuery({
    queryKey: ["applicationConfiguration"],
    queryFn: getApplicationConfiguration,
  });

  const damana_status_options = [
    { value: "", label: "الكل" }, // 👈 أول اختيار
    ...(configData?.filer_statuses
      ? Object.entries(configData.filer_statuses).map(([key, value]) => ({
          value: key,
          label: value,
        }))
      : []),
  ];

  useEffect(() => {
    // لو دخل /damanaty من غير تحديد، يروح على /sale
    if (pathname === "/damanaty") {
      navigate("/damanaty/sale", { replace: true });
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

            <select
              className="bg-transparent outline-none homeLink filter"
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
            >
              {damana_status_options.map((option) => (
                <option key={option.value ?? "all"} value={option.value ?? ""}>
                  {option.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="تاريخ الضمانة"
              className="bg-transparent cursor-pointer outline-none homeLink filter"
            />
          </div>

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
