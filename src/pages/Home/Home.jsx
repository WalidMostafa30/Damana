import { BsCalendar2Date } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import noDataImg from "../../assets/images/No data-pana 1.png";
import homeBanner from "../../assets/images/home-banner.png";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { useState } from "react";

const faqs = [
  "كيف تعمل ضمانة ؟",
  "ما هي شروط ضمانة ؟",
  "ما هي حالات الدفع المتوفرة ؟",
  "ما هي شروط انشاء ضمانة للبائع ؟",
  "ما هي شروط قبول الضمانة للمشتري ؟",
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pageContainer grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-1 lg:col-span-2 space-y-4">
        <h2 className="text-3xl font-bold">ضماناتي</h2>
        <p className="text-lg text-neutral-500">
          هنا تجد جميع الضمانات الخاصة بك مع كافة بياناتها.
        </p>

        <section className="bg-base-white p-4 rounded-lg shadow-md">
          <ul className="flex items-center flex-wrap gap-4">
            <li className="homeLink">ضمانات البيع</li>
            <li className="homeLink">ضمانات الشراء</li>
            <li className="homeLink">
              حالة الضمانة <IoIosArrowDown className="text-2xl" />
            </li>
            <li className="homeLink">
              تاريخ الضمانة <BsCalendar2Date className="text-2xl" />
            </li>
          </ul>

          <article>
            <div className="flex items-center justify-center flex-col gap-4 mt-8">
              <img
                src={noDataImg}
                alt="no data"
                loading="lazy"
                className="w-96"
              />
              <p className="text-lg">
                لا توجد ضمانات حالية بعد. يمكنك البدء الآن من هنا:{" "}
                <Link to="/add-damana" className="text-primary font-bold">
                  طلب ضمانة جديدة
                </Link>
              </p>
            </div>
          </article>
        </section>
      </div>

      <aside className="space-y-8">
        <div className="text-center p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">مرحبًا بك في ضمانة!</h3>
          <p className="text-lg text-neutral-500 mb-4">
            يمكنك بدء ضمانة جديدة بالضغط على الزر أدناه
          </p>
          <Link to="/add-damana" className="mainBtn">
            <FaCirclePlus className="text-2xl" />
            طلب ضمانة جديدة
          </Link>
        </div>

        <img src={homeBanner} alt="banner" loading="lazy" className="w-full" />

        <div className="rounded-2xl shadow-lg">
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
                  <p className="p-4 text-neutral-600">
                    هذا مثال للإجابة على السؤال "{question}". يمكنك تغيير النص
                    هنا.
                  </p>
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
