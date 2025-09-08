import InfiniteScroll from "react-infinite-scroll-component";
import DamanaList from "../../components/common/DamanaList";
import { useTranslation } from "react-i18next";

const Sale = ({ data, fetchNextPage, hasNextPage, loading, error }) => {
  const { t } = useTranslation();

  return (
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
      className="!overflow-hidden"
    >
      <DamanaList data={data} addDamanaText loading={loading} error={error} />
    </InfiniteScroll>
  );
};
export default Sale;
