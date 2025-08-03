import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/common/PageTitle";
import { getPaymentMethods } from "../../services/authService";

const PaymentOptions = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: getPaymentMethods,
  });

  if (isLoading) return <p>جاري التحميل...</p>;
  if (isError) return <p>حدث خطأ: {error.message}</p>;
  if (!data?.length) return <p>لا توجد بيانات متاحة</p>;

  return (
    <section className="pageContainer space-y-4">
      <PageTitle
        title="خيارات الدفع"
        subtitle="هنا لديك طرق الدفع المتاحة ، يمكنك اختيار الطريقة التي تناسبك"
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
