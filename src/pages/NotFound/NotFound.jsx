import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <article className="pageContainer flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <FaExclamationTriangle className="text-warning-200 text-7xl lg:text-9xl" />
        <h1 className="text-4xl lg:text-6xl">{t("pages.notFound.title")}</h1>
        <h3 className="text-xl lg:text-2xl">{t("pages.notFound.subtitle")}</h3>
        <p className="lg:text-lg">{t("pages.notFound.description")}</p>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="mainBtn"
        >
          {t("pages.notFound.homeBtn")}
        </button>
      </div>
    </article>
  );
};

export default NotFound;
