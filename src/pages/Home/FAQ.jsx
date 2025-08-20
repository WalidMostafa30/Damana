import { useQuery } from "@tanstack/react-query";
import { getFAQ } from "../../services/staticDataService";
import LoadingSection from "../../components/layout/Loading/LoadingSection";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // جلب البيانات
  const {
    data: faqs,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getFAQ(),
    queryKey: ["faq"],
    keepPreviousData: true,
  });

  console.log(faqs);

  if (isLoading) return <LoadingSection />;

  if (isError) return;

  return (
    <div className="whiteContainer !p-0">
      <h3 className="text-2xl font-bold text-center p-4 text-primary border-b border-neutral-200">
        الأسئلة الشائعة
      </h3>
      <ul>
        {faqs?.map((question, index) => (
          <li key={question.id} className="border-b border-neutral-200">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-lg font-medium cursor-pointer"
            >
              {question.title}
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
              <p className="p-4 text-neutral-600">{question.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
