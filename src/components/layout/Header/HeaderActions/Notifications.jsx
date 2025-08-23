import { Link } from "react-router-dom";
import { SlBell } from "react-icons/sl";
import NotificationCard from "../../../common/NotificationCard";

const Notifications = ({ notifications, isLoading, onClose }) => {
  if (isLoading) {
    return <p className="p-4 text-center">جاري التحميل...</p>;
  }

  if (notifications?.length === 0) {
    return <p className="p-4 text-center">لا يوجد اشعارات</p>;
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
        className="text-primary text-sm font-bold p-2 lg:p-4 flex items-center gap-1 cursor-pointer"
      >
        <SlBell className="text-xl" />
        رؤيه كل الاشعارات
      </Link>
    </>
  );
};

export default Notifications;
