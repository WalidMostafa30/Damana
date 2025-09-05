import DamanaCard from "./DamanaCard";
import noDataImg from "../../assets/images/No data-pana 1.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingSection from "../Loading/LoadingSection";
import FormError from "../form/FormError";

const DamanaList = ({
  data = [],
  loading,
  error,
  selectable,
  selectedIds = [],
  onSelect,
  addDamanaText = false,
}) => {
  const { t } = useTranslation();
  const tr = (key) => t(`components.common.damanaList.${key}`);

  if (loading) return <LoadingSection />;

  if (error)
    return (
      <FormError
        errorMsg={error?.response?.data?.error_msg || tr("errorLoading")}
      />
    );

  if (!data || data.length === 0)
    return (
      <div className="flex items-center justify-center flex-col gap-4 mt-8">
        <img src={noDataImg} alt="no data" loading="lazy" className="w-96" />
        {addDamanaText ? (
          <p className="text-lg">
            {tr("noDataWithLink")}{" "}
            <Link to="/add-damana" className="text-primary font-bold">
              {tr("newRequest")}
            </Link>
          </p>
        ) : (
          <p className="text-lg">{tr("noData")}</p>
        )}
      </div>
    );

  return (
    <section className="space-y-4">
      {data.map((damana) => (
        <DamanaCard
          key={damana.id}
          damana={damana}
          selectable={selectable}
          selected={selectedIds.includes(damana.id)}
          onSelect={() => onSelect(damana.id)}
        />
      ))}
    </section>
  );
};

export default DamanaList;
