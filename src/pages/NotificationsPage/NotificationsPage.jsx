import PageTitle from "../../components/common/PageTitle";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  markAllNotificationsRead,
  deleteAllNotifications,
} from "../../services/notificationsService";
import LoadingSection from "../../components/Loading/LoadingSection";
import NotificationCard from "../../components/common/NotificationCard";
import { useTranslation } from "react-i18next";

const NotificationsPage = () => {
  const { t } = useTranslation();
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

  if (isError) return <p>{t("pages.notificationsPage.error")}</p>;

  return (
    <section className="pageContainer space-y-4">
      <PageTitle
        title={t("pages.notificationsPage.title")}
        subtitle={t("pages.notificationsPage.subtitle")}
      />

      {notifications?.length > 0 ? (
        <>
          <div className="flex items-center gap-2">
            <button
              className="mainBtn !w-fit"
              onClick={() => markAllReadMutation.mutate()}
            >
              {t("pages.notificationsPage.markAllRead")}
            </button>
            <button
              className="mainBtn danger !w-fit"
              onClick={() => deleteAllMutation.mutate()}
            >
              {t("pages.notificationsPage.deleteAll")}
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
        <p className="text-center text-2xl p-4">
          {t("pages.notificationsPage.noNotifications")}
        </p>
      )}
    </section>
  );
};

export default NotificationsPage;
