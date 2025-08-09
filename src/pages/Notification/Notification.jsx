import { IoMdTime } from "react-icons/io";
import PageTitle from "../../components/common/PageTitle";
import Avatar from "../../components/common/Avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  markAllNotificationsRead,
  deleteAllNotifications,
  markNotificationRead,
} from "../../services/notificationsService";

const Notification = () => {
  const queryClient = useQueryClient();

  // جلب الإشعارات
  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });
  console.log("notifications", notifications);

  // Mutation - تحديد الكل كمقروء
  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => queryClient.invalidateQueries(["notifications"]),
  });

  // Mutation - حذف الكل
  const deleteAllMutation = useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => queryClient.invalidateQueries(["notifications"]),
  });

  // Mutation - قراءة إشعار
  const markReadMutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => queryClient.invalidateQueries(["notifications"]),
  });

  if (isLoading) return <p>جاري التحميل...</p>;
  if (isError) return <p>حدث خطأ أثناء تحميل الإشعارات</p>;

  return (
    <section className="pageContainer space-y-4">
      <PageTitle
        title="الاشعارات"
        subtitle="هنا جميع الاشعارات الخاصة بك التي تحتوي على كافة معلوماتك وحالات ضماناتك"
      />

      {notifications?.length > 0 ? (
        <>
          <div className="flex items-center gap-2">
            <button
              className="mainBtn !w-fit"
              onClick={() => markAllReadMutation.mutate()}
            >
              تحديد الكل كمقروء
            </button>
            <button
              className="mainBtn danger !w-fit"
              onClick={() => deleteAllMutation.mutate()}
            >
              حذف الكل
            </button>
          </div>

          <div className="bg-base-white border border-neutral-200">
            {notifications?.map((n) => (
              <div
                key={n.id}
                className={`flex gap-4 p-4 cursor-pointer not-last:border-b border-neutral-200 ${
                  n.read_at ? "" : "bg-secondary/20 hover:bg-secondary/30"
                }`}
                onClick={() => markReadMutation.mutate(n.id)}
              >
                <Avatar name={n.data?.title || "إشعار"} size="lg" />

                <div className="space-y-2 flex-1">
                  <p className="text-neutral-800 flex-1 lg:text-xl">
                    <span className="font-bold text-primary">
                      {n.data?.title}
                    </span>{" "}
                    {n.data?.body}
                  </p>

                  <p className="text-neutral-500 lg:text-lg flex items-center gap-1">
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
        </>
      ) : (
        <p className="text-center text-2xl p-4">لا توجد إشعارات حالياً</p>
      )}
    </section>
  );
};

export default Notification;
