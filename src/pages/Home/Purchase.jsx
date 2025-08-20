import InfiniteScroll from "react-infinite-scroll-component";
import DamanaList from "../../components/common/DamanaList";

const Purchase = ({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) => {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<p className="text-center p-4">تحميل المزيد...</p>}
      endMessage={<p className="text-center p-4">لا يوجد عناصر أخرى</p>}
    >
      <DamanaList data={data} />
      {isFetchingNextPage && (
        <p className="text-center p-4">جاري تحميل المزيد...</p>
      )}
    </InfiniteScroll>
  );
};

export default Purchase;
