import { useQuery } from "@tanstack/react-query";
import { getPage } from "../../services/staticDataService";
import LoadingSection from "../../components/Loading/LoadingSection";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  if (isLoading) return <LoadingSection />;

  if (isError)
    return (
      <div className="p-4 text-center">{t("pages.account.terms.error")} </div>
    );

  return (
    <>
      <div
        className="htmlContent"
        dangerouslySetInnerHTML={{ __html: pageContent?.content }}
      />
    </>
  );
};

export default Terms;
