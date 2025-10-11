import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationRead } from "../../services/notificationsService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Avatar from "./Avatar";
import { IoMdTime } from "react-icons/io";
import { SlBell } from "react-icons/sl";

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
      className={`flex cursor-pointer not-last:border-b border-neutral-300
        ${isRead ? "bg-white" : "bg-secondary/20 hover:bg-secondary/30"}
        ${header ? "gap-2 p-2 lg:gap-4 lg:p-4" : "gap-4 p-4"}`}
    >
      {/* <Avatar name={notification.data?.title} size="lg" /> */}
      <div
        className={`rounded-full flex items-center justify-center border border-primary ${
          isRead ? "bg-white text-primary" : "bg-primary text-white"
        } ${
          header ? "w-10 h-10 lg:w-12 lg:h-12 text-xl" : "w-12 h-12 text-2xl"
        }`}
      >
        <SlBell />
      </div>

      <div className="space-y-2 flex-1">
        <p
          className={`text-neutral-800 flex-1 ${
            header ? "text-xs lg:text-sm" : "lg:text-xl"
          } ${header && "line-clamp-3"}`}
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
