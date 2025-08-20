import { useParams } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import { getPage } from "../../services/staticDataService";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../components/layout/Loading/LoadingPage";

const GetPage = () => {
  const { page } = useParams();

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
        حدث خطأ أثناء تحميل الصفحة
      </div>
    );

  console.log("Page Content:", pageContent);

  return (
    <article className="pageContainer">
      <div
        className="htmlContent"
        dangerouslySetInnerHTML={{ __html: pageContent?.content }}
      />
    </article>
  );
};

export default GetPage;
