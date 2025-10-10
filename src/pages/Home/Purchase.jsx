import InfiniteScroll from "react-infinite-scroll-component";
import DamanaList from "../../components/common/DamanaList";
import { useTranslation } from "react-i18next";

const Purchase = ({ data, fetchNextPage, hasNextPage, loading, error }) => {
  const { t } = useTranslation();

  return (
    <div
      id="purchaseScrollContainer"
      className="max-h-[101vh] overflow-y-auto px-1"
    >
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <p className="text-center p-4">
            {t("pages.purchase_sale.loadingMore")}
          </p>
        }
        endMessage={
          data.length !== 0 && (
            <p className="text-center p-4">
              {t("pages.purchase_sale.noMoreItems")}
            </p>
          )
        }
        scrollableTarget="purchaseScrollContainer"
        className="!overflow-hidden"
      >
        <DamanaList data={data} loading={loading} error={error} />
      </InfiniteScroll>
    </div>
  );
};

export default Purchase;
