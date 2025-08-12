import { IoMdTime } from "react-icons/io";
import Avatar from "../../../common/Avatar";
import { Link } from "react-router-dom";
import { SlBell } from "react-icons/sl";

const Notifications = ({ notifications, isLoading, onClose }) => {
  if (isLoading) {
    return <p className="p-4 text-center">جاري التحميل...</p>;
  }

  if (!notifications?.length) {
    return <p className="p-4 text-center">لا يوجد اشعارات</p>;
  }

  return (
    <>
      <div>
        {notifications.slice(0, 3).map((n) => (
          <div
            key={n.id}
            className={`flex gap-2 p-4 cursor-pointer not-last:border-b border-neutral-200 ${
              n.read_at ? "" : "bg-secondary/20 hover:bg-secondary/30"
            }`}
          >
            <Avatar name={n.data?.title || "إشعار"} size="lg" />
            <div className="space-y-2 flex-1">
              <p className="text-sm text-neutral-800 line-clamp-3 flex-1">
                <span className="font-bold text-primary">{n.data?.title}</span>{" "}
                {n.data?.body}
              </p>
              <p className="text-neutral-500 flex items-center gap-1">
                <IoMdTime />
                {new Date(n.created_at).toLocaleString("ar-EG", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        onClick={onClose}
        to="/notifications"
        className="text-primary text-sm font-bold p-4 flex items-center gap-1 cursor-pointer"
      >
        <SlBell className="text-2xl" />
        رؤيه كل الاشعارات
      </Link>
    </>
  );
};

export default Notifications;
