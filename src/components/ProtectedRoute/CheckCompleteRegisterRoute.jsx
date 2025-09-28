import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../../services/authService";
import LoadingPage from "../Loading/LoadingPage";
import { useTranslation } from "react-i18next";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePermission } from "../../hooks/usePermission";

const CheckCompleteRegisterRoute = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
  });

  const { t } = useTranslation();

  const { hasAndUser } = usePermission();

  if (isLoading) return <LoadingPage />;

  if (data?.next_screen === "complete_register") {
    return (
      <article className="pageContainer flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaExclamationTriangle className="text-warning-200 text-7xl lg:text-9xl" />
          <h3 className="text-xl font-bold">
            {t(
              "components.protectedRoutes.checkCompleteRegisterRoute.completeRegisterTitle"
            )}
          </h3>

          <p className="text-center text-neutral-500 max-w-md">
            {t(
              "components.protectedRoutes.checkCompleteRegisterRoute.completeRegisterMessage"
            )}
          </p>

          <Link to={"/complete-register"} replace className="mainBtn">
            {t(
              "components.protectedRoutes.checkCompleteRegisterRoute.completeRegisterBtn"
            )}
          </Link>
        </div>
      </article>
    );
  }

  if (!hasAndUser("damana.cancel")) {
    return (
      <article className="pageContainer flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaExclamationTriangle className="text-warning-200 text-7xl lg:text-9xl" />
          <h3 className="text-xl font-bold">
            لا توجد صلاحية للوصول لهذه الصفحة
          </h3>

          <Link to={"/"} replace className="mainBtn">
            الصفحة الرئيسة
          </Link>
        </div>
      </article>
    );
  }

  return children;
};

export default CheckCompleteRegisterRoute;
