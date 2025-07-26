import { useState } from "react";
import DamanaCard from "../../components/common/DamanaCard";
import noDataImg from "../../assets/images/No data-pana 1.png";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const allDamanat = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  hours: 3,
  number: `13212312213-${i + 1}`,
  plate: "12-1212",
  seller: "رائد الدوو",
  buyer: "محمد علي",
  date: "1/2/2023",
}));

const Purchase = () => {
  const [items, setItems] = useState(allDamanat.slice(0, 10)); // نبدأ بـ 10 عناصر
  const [hasMore, setHasMore] = useState(true);

  // دالة تحميل بيانات إضافية
  const fetchMoreData = () => {
    if (items.length >= allDamanat.length) {
      setHasMore(false);
      return;
    }

    // نضيف 10 عناصر إضافية
    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...allDamanat.slice(prev.length, prev.length + 10),
      ]);
    }, 1000);
  };

  return (
    <>
      {allDamanat.length !== 0 ? (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center mt-4">جارِ التحميل...</h4>}
          endMessage={
            <p className="text-center mt-4 font-bold">تم عرض جميع الضمانات</p>
          }
          style={{ overflow: "visible" }}
        >
          <section className="space-y-4">
            {items.map((damana) => (
              <DamanaCard key={damana.id} {...damana} />
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

export default Purchase;
