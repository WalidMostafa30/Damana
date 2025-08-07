import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCancellableDamanat } from "../../services/damanaServices";
import DamanaCard from "../../components/common/DamanaCard";
import noDataImg from "../../assets/images/No data-pana 1.png";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Sale = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["cancellableDamanat"],
    queryFn: ({ pageParam = 1 }) => fetchCancellableDamanat(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.data?.length === 0) return undefined; // مفيش بيانات تانية
      return allPages.length + 1; // الصفحة التالية
    },
  });

  // دمج كل الصفحات في مصفوفة واحدة
  const items = data?.pages.flatMap((page) => page.data) || [];

  if (isLoading) {
    return <h4 className="text-center mt-4">جارِ التحميل...</h4>;
  }

  if (isError) {
    return (
      <h4 className="text-center mt-4 text-red-500">
        حدث خطأ في تحميل البيانات
      </h4>
    );
  }

  return (
    <>
      {items.length !== 0 ? (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            isFetchingNextPage ? (
              <h4 className="text-center mt-4">جارِ التحميل...</h4>
            ) : null
          }
          endMessage={
            <p className="text-center mt-4 font-bold">تم عرض جميع الضمانات</p>
          }
          style={{ overflow: "visible" }}
        >
          <section className="space-y-4">
            {items.map((damana) => (
              <DamanaCard
                key={damana.id}
                number={damana.serial_number}
                plate={damana.plate_number_code}
                seller={damana.seller?.name}
                id={damana.id}
                status_translate={damana.status_translate}
                price={`${damana.vehicle_price} دينار أردني`}
                date={new Date(damana.created_at).toLocaleDateString("ar-EG")}
                statusText={damana.status_translate}
                hours={Math.max(
                  0,
                  Math.floor(
                    (new Date(damana.approval_period) - new Date()) /
                      (1000 * 60 * 60)
                  )
                )}
              />
            ))}
          </section>
        </InfiniteScroll>
      ) : (
        <div className="flex items-center justify-center flex-col gap-4 mt-8">
          <img src={noDataImg} alt="no data" loading="lazy" className="w-96" />
          <p className="text-lg">
            لا توجد ضمانات حالية بعد. يمكنك البدء الآن من هنا:{" "}
            <Link to="/add-damana" className="text-primary font-bold">
              طلب ضمانة جديدة
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Sale;
