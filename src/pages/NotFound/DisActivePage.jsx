import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../services/authService";
import { useTranslation } from "react-i18next";

const DisActivePage = ({ msg }) => {
  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
  });

  const { t } = useTranslation();
  return (
    <article className="pageContainer flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <FaExclamationTriangle className="text-warning-200 text-7xl lg:text-9xl" />
        <div
          dangerouslySetInnerHTML={{
            __html: msg,
          }}
        />
        <Link
          to={"/login"}
          onClick={() => logoutMutation.mutate()}
          className="mainBtn"
        >
          {t("pages.disActive.logoutBtn")}{" "}
        </Link>
      </div>
    </article>
  );
};

export default DisActivePage;
