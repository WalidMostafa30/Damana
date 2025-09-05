import { Link } from "react-router-dom";
import { SlBell } from "react-icons/sl";
import NotificationCard from "../../../common/NotificationCard";
import { useTranslation } from "react-i18next";

const Notifications = ({ notifications, isLoading, onClose }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <p className="p-4 text-center">{t("loading")}</p>;
  }

  if (notifications?.length === 0) {
    return (
      <p className="p-4 text-center">
        {t("components.layout.notifications.noNotifications")}
      </p>
    );
  }

  return (
    <>
      <div>
        {notifications?.slice(0, 3).map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            header
            onClose={onClose}
          />
        ))}
      </div>

      <Link
        onClick={onClose}
        to="/notifications"
        className="text-primary text-sm font-bold p-2 lg:p-4 flex items-center gap-1 cursor-pointer border-t border-neutral-300 hover:bg-secondary/10"
      >
        <SlBell className="text-xl" />
        {t("components.layout.notifications.viewAll")}
      </Link>
    </>
  );
};

export default Notifications;
