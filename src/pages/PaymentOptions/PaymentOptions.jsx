import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/common/PageTitle";
import LoadingPage from "../../components/Loading/LoadingPage";
import { getPaymentMethods } from "../../services/staticDataService";
import { useTranslation } from "react-i18next";

const PaymentOptions = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: getPaymentMethods,
  });

  if (isLoading) return <LoadingPage />;

  if (isError)
    return (
      <p className="text-center text-lg">
        {t("pages.paymentOptions.error")}: {error?.response?.data?.error_msg}
      </p>
    );

  if (!data?.length)
    return (
      <p className="text-center text-lg">{t("pages.paymentOptions.noData")}</p>
    );

  return (
    <section className="pageContainer space-y-4">
      <PageTitle
        title={t("pages.paymentOptions.title")}
        subtitle={t("pages.paymentOptions.subtitle")}
      />

      <div className="space-y-4 baseWhiteContainer ">
        {data.map((method) => (
          <div
            key={method.id}
            className="whiteContainer flex flex-col lg:flex-row items-center gap-4"
          >
            {method.logo_full_path && (
              <img
                src={method.logo_full_path}
                alt={method.name}
                loading="lazy"
                className="max-w-[120px]"
              />
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {method.name}
              </h3>

              <div
                className="text-neutral-500 htmlContent"
                dangerouslySetInnerHTML={{ __html: method.text }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PaymentOptions;
