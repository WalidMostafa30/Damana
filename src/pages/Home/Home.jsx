import { IoIosArrowDown } from "react-icons/io";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import HomeSlider from "./HomeSlider/HomeSlider";

const faqs = [
  "كيف تعمل ضمانة ؟",
  "ما هي شروط ضمانة ؟",
  "ما هي حالات الدفع المتوفرة ؟",
  "ما هي شروط انشاء ضمانة للبائع ؟",
  "ما هي شروط قبول الضمانة للمشتري ؟",
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { pathname } = useLocation();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pageContainer grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-1 lg:col-span-2 space-y-4">
        <PageTitle
          title="ضماناتى"
          subtitle="هنا تجد جميع الضمانات الخاصة بك مع كافة بياناتها."
        />

        <section className="baseWhiteContainer !border-neutral-100 space-y-4">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-4">
            <Link
              to={"/damanaty/sale"}
              className={`homeLink ${
                pathname.includes("/sale") ? "active-sale" : ""
              }`}
            >
              ضمانات البيع
            </Link>
            <Link
              to={"/damanaty/purchase"}
              className={`homeLink ${
                pathname.includes("/purchase") ? "active-purchase" : ""
              }`}
            >
              ضمانات الشراء
            </Link>

            <select id="" className="bg-transparent outline-none homeLink">
              <option value="">حاله الضمانة</option>
              <option value="جديدة">جديدة</option>
              <option value="جارية">جارية</option>
              <option value="منتهية">منتهية</option>
            </select>

            <input
              type="date"
              className="bg-transparent cursor-pointer outline-none homeLink"
            />
          </div>

          <Outlet />
        </section>
      </div>

      <aside className="space-y-8">
        <div className="whiteContainer !border-neutral-100 text-center !p-8">
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

        <div className="whiteContainer !border-neutral-100 !p-0">
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
