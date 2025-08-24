import InfiniteScroll from "react-infinite-scroll-component";
import DamanaList from "../../components/common/DamanaList";

const Sale = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  loading,
  error,
}) => {
  return (
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
      style={{ overflow: "hidden" }}
    >
      <DamanaList data={data} addDamanaText loading={loading} error={error}/>
      {isFetchingNextPage && (
        <p className="text-center p-4">جاري تحميل المزيد...</p>
      )}
    </InfiniteScroll>
  );
};

export default Sale;
