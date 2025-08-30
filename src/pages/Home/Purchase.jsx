import InfiniteScroll from "react-infinite-scroll-component";
import DamanaList from "../../components/common/DamanaList";

const Purchase = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  loading,
  error,
}) => {
  return (
    <>
      {data?.length === 0 ? (
        <DamanaList data={data} addDamanaText loading={loading} error={error} />
      ) : (
        <div id="saleScrollContainer" className="max-h-[80vh] overflow-y-auto">
          <InfiniteScroll
            dataLength={data.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<p className="text-center p-4">تحميل المزيد...</p>}
            endMessage={
              data.length !== 0 && (
                <p className="text-center p-4">لا يوجد عناصر أخرى</p>
              )
            }
            scrollableTarget="saleScrollContainer" // 👈 يراقب الـ div ده بس
          >
            <DamanaList
              data={data}
              addDamanaText
              loading={loading}
              error={error}
            />
            {isFetchingNextPage && (
              <p className="text-center p-4">جاري تحميل المزيد...</p>
            )}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Purchase;
