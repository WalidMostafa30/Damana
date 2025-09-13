import { useParams } from "react-router-dom";
import { getPage } from "../../services/staticDataService";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../components/Loading/LoadingPage";
import { useTranslation } from "react-i18next";

const GetPage = () => {
  const { page } = useParams();

  const { t } = useTranslation();

  // جلب البيانات
  const {
    data: pageContent,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getPage(page),
    queryKey: ["page", page],
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingPage />;
  if (isError)
    return (
      <div className="pageContainer text-center text-xl">
        {t("pages.getPage.error")}
      </div>
    );

  return (
    <article className="pageContainer">
      <div
        className="htmlContent whiteContainer"
        dangerouslySetInnerHTML={{ __html: pageContent?.content }}
      />
    </article>
  );
};

export default GetPage;
