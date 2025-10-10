import { useQuery } from "@tanstack/react-query";
import { getFAQ } from "../../services/staticDataService";
import LoadingSection from "../../components/Loading/LoadingSection";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { t } = useTranslation();

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

  if (isLoading) return <LoadingSection />;

  if (isError) return;

  return (
    <div className="whiteContainer !p-0">
      <h3 className="text-2xl font-bold p-4 text-primary border-b border-neutral-200">
        {t("pages.faq.title")}{" "}
      </h3>
      <ul className="md:max-h-[270px] overflow-y-auto">
        {faqs?.map((question, index) => (
          <li key={question.id} className="border-b border-neutral-200">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex gap-2 justify-between p-4 text-lg font-semibold cursor-pointer"
            >
              <span className="flex-1 text-start">{question.title}</span>
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              <div className="p-4 pt-0">
                <div
                  className="htmlContent"
                  dangerouslySetInnerHTML={{ __html: question.description }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
