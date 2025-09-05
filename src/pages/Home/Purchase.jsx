import InfiniteScroll from "react-infinite-scroll-component";
import DamanaList from "../../components/common/DamanaList";

const Purchase = ({ data, fetchNextPage, hasNextPage, loading, error }) => {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<p className="text-center p-4">جاري تحميل المزيد...</p>}
      endMessage={
        data.length !== 0 && (
          <p className="text-center p-4">لا يوجد عناصر أخرى</p>
        )
      }
      className="!overflow-hidden"
    >
      <DamanaList data={data} addDamanaText loading={loading} error={error} />
    </InfiniteScroll>
  );
};

export default Purchase;
