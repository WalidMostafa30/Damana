import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationRead } from "../../services/notificationsService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Avatar from "./Avatar";
import { IoMdTime } from "react-icons/io";

const NotificationCard = ({
  notification,
  header = false,
  onClose = () => {},
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isRead, setIsRead] = useState(!!notification.read_at);

  const markReadMutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      setIsRead(true);
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const handleNotificationClick = () => {
    if (!isRead) {
      markReadMutation.mutate({ id: notification.id });
    }
    if (notification.data?.serial_number) {
      navigate(`/damana/${notification.data?.vehicle_trans_id}`);
    }
    if (onClose) onClose();
  };

  return (
    <div
      key={notification.id}
      onClick={handleNotificationClick}
      className={`flex gap-4 p-4 cursor-pointer not-last:border-b border-neutral-300
        ${isRead ? "bg-white" : "bg-secondary/20 hover:bg-secondary/30"}`}
    >
      <Avatar name={notification.data?.title} size="lg" />

      <div className="space-y-2 flex-1">
        <p
          className={`text-neutral-800 flex-1 ${!header && "lg:text-xl"} ${
            header && "line-clamp-3"
          }`}
        >
          <span className="font-bold text-primary">
            {notification.data?.title}
          </span>{" "}
          {notification.data?.body}
        </p>

        <p className="text-neutral-500 lg:text-lg flex items-center gap-1">
          <IoMdTime />
          {new Date(notification.created_at).toLocaleString("en-GB", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
