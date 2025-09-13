import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getFAQPage } from "../../services/staticDataService";
import LoadingPage from "../../components/Loading/LoadingPage";
import PageTitle from "../../components/common/PageTitle";

const FAQSPage = () => {
  const { t } = useTranslation();

  // جلب البيانات
  const {
    data: faqs,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getFAQPage(),
    queryKey: ["faqPage"],
    keepPreviousData: true,
  });

  console.log(faqs);

  if (isLoading) return <LoadingPage />;
  if (isError)
    return (
      <div className="pageContainer text-center text-xl">
        {t("pages.getPage.error")}
      </div>
    );

  return (
    <article className="pageContainer">
      <PageTitle
        title={t("pages.faqs-page.title")}
        subtitle={t("pages.faqs-page.subtitle")}
      />

      <section className="mt-8 flex flex-col gap-6 whiteContainer">
        {faqs?.map((faq) => (
          <div key={faq.id} className="">
            <h1 className="lg:text-xl font-bold text-white bg-primary px-4 py-2 rounded-se-2xl w-fit mb-2">
              {faq.name}
            </h1>

            {faq.faqs.map((item) => (
              <div
                key={item.id}
                className="not-last:border-b border-neutral-400 pb-4 mb-4"
              >
                <h2 className="text-lg font-bold mb-1">{item.title}</h2>
                <div
                  className="htmlContent"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            ))}
          </div>
        ))}
      </section>
    </article>
  );
};

export default FAQSPage;
