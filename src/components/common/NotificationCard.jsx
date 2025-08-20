import { QueryClient, useMutation } from "@tanstack/react-query";
import { markNotificationRead } from "../../services/notificationsService";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { IoMdTime } from "react-icons/io";

const NotificationCard = ({ notification, header = false }) => {
  const markReadMutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => QueryClient.invalidateQueries(["notifications"]),
  });

  const navigate = useNavigate();

  const handleNotificationClick = () => {
    markReadMutation.mutate({ id: notification.id });
    if (notification.data?.serial_number)
      navigate(`/damana/${notification.data?.vehicle_trans_id}`);
  };
  return (
    <div
      key={notification.id}
      className={`flex gap-4 p-4 cursor-pointer not-last:border-b border-neutral-300 ${
        notification.read_at ? "" : "bg-secondary/20 hover:bg-secondary/30"
      } ${markReadMutation.isSuccess ? "!bg-white" : ""}`}
      onClick={handleNotificationClick}
    >
      <Avatar name={notification.data?.title} size="lg" />

      <div className="space-y-2 flex-1">
        <p className={`text-neutral-800 flex-1 ${!header && "lg:text-xl"}`}>
          <span className="font-bold text-primary">
            {notification.data?.title}
          </span>{" "}
          {notification.data?.body}
        </p>

        <p className="text-neutral-500 lg:text-lg flex items-center gap-1">
          <IoMdTime />
          {new Date(notification.created_at).toLocaleString("ar-EG", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
