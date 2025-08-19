import DamanaList from "../../components/common/DamanaList";

const Purchase = ({ data, loading, error }) => {
  return <DamanaList data={data} loading={loading} error={error} />;
};

export default Purchase;
