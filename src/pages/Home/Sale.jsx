import DamanaList from "../../components/common/DamanaList";

const Sale = ({ data, loading, error }) => {
  return <DamanaList data={data} loading={loading} error={error} />;
};

export default Sale;
