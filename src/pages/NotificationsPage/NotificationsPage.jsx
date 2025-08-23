import PageTitle from "../../components/common/PageTitle";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  markAllNotificationsRead,
  deleteAllNotifications,
} from "../../services/notificationsService";
import LoadingSection from "../../components/layout/Loading/LoadingSection";
import NotificationCard from "../../components/common/NotificationCard";

const NotificationsPage = () => {
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

  if (isLoading) return <LoadingSection />;

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
            {notifications?.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-2xl p-4">لا توجد إشعارات حالياً</p>
      )}
    </section>
  );
};

export default NotificationsPage;
