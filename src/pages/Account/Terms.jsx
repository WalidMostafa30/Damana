import { useQuery } from "@tanstack/react-query";
import { getPage } from "../../services/staticDataService";
import LoadingSection from "../../components/Loading/LoadingSection";

const Terms = () => {
  const {
    data: pageContent,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getPage("full_terms_and_conditions"),
    queryKey: ["page"],
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSection />;

  if (isError)
    return (
      <div className="p-4 text-center">
        حدث خطاء اثناء تحميل الشروط والاحكام
      </div>
    );

  return (
    <>
      <h3 className="text-lg lg:text-2xl text-primary font-bold mb-6">
        الشروط والاحكام الخاصه بضمانة
      </h3>

      <div
        className="htmlContent"
        dangerouslySetInnerHTML={{ __html: pageContent?.content }}
      />
    </>
  );
};

export default Terms;
