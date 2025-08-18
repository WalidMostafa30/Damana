import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/common/PageTitle";
import HomeSlider from "./HomeSlider/HomeSlider";
import Sale from "./Sale";
import Purchase from "./Purchase";
import { fetchDamanat } from "../../services/damanaServices";

const faqs = [
  "كيف تعمل ضمانة ؟",
  "ما هي شروط ضمانة ؟",
  "ما هي حالات الدفع المتوفرة ؟",
  "ما هي شروط انشاء ضمانة للبائع ؟",
  "ما هي شروط قبول الضمانة للمشتري ؟",
];

const damana_status_options = [
  { value: null, label: "حالة الضمانة" },
  { value: "new", label: "جديد / بانتظار موافقه المشتري" },
  { value: "accepted", label: "مقبول بانتظار الدفع" },
  { value: "paid", label: "مدفوع بانتظار الصرف" },
  { value: "finished", label: "تم الصرف / منتهي " },
  { value: "rejected", label: "تم الرفض من المشتري" },
  { value: "cancelled", label: "تم الالغاء" },
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("sell"); // ⬅ type
  const [selectedStatus, setSelectedStatus] = useState(null); // ⬅ status
  const [date, setDate] = useState(""); // ⬅ date filter
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // جلب البيانات
  const { data, isLoading, isError } = useQuery({
    queryKey: ["damanat", selectedType, selectedStatus, date],
    queryFn: () => fetchDamanat(selectedType, selectedStatus, date),
    keepPreviousData: true,
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              className="bg-transparent outline-none homeLink"
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
              className="bg-transparent cursor-pointer outline-none homeLink"
            />
          </div>

          {pathname.includes("/sale") && (
            <Sale data={data} loading={isLoading} error={isError} />
          )}
          {pathname.includes("/purchase") && (
            <Purchase data={data} loading={isLoading} error={isError} />
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

        <div className="whiteContainer !p-0">
          <h3 className="text-2xl font-bold text-center p-4 text-primary border-b border-neutral-200">
            الأسئلة الشائعة
          </h3>
          <ul>
            {faqs.map((question, index) => (
              <li key={index} className="border-b border-neutral-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-lg font-medium cursor-pointer"
                >
                  {question}
                  <IoIosArrowDown
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="p-4 text-neutral-600">{question}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
};

export default Home;
