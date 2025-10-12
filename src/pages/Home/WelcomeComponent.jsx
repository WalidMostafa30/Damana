import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../../services/authService";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { usePermission } from "../../hooks/usePermission";
import { useSelector } from "react-redux";

const WelcomeComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
  });
  const { t } = useTranslation();
  const { hasAndUser } = usePermission();

  const { profile } = useSelector((state) => state.profile);



  if (isLoading) return null;
  if (!hasAndUser("damana.create")) return null;






  return (
    <div className="whiteContainer text-center !p-8">
      <h3 className="text-2xl font-bold mb-4">
        {t("pages.home.welcomeTitle")}
      </h3>

      {data?.next_screen === "complete_register" ? (
        <>
          <p className="text-lg text-neutral-500 mb-4">
            {t("pages.home.completeRegisterSubtitle")}
          </p>

          <Link to="/complete-register" className="mainBtn">
            <FaFileInvoice className="text-2xl" />
            {t("pages.home.completeRegisterRequestBtn")}
          </Link>
        </>
      ) : (
        <>
          <p className="text-lg text-neutral-500 mb-4">
            {t("pages.home.welcomeSubtitle")}
          </p>

          <Link to="/add-damana" className="mainBtn">
            <FaCirclePlus className="text-2xl" />
            {t("pages.home.newRequest")}
          </Link>
        </>
      )}
    </div>
  );
};

export default WelcomeComponent;
