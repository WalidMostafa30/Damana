import api from "./api";

// جلب الإشعارات
export const fetchNotifications = async () => {
  const { data } = await api.get("/notifications/list");
  return data?.data;
};

// تحديد الكل كمقروء
export const markAllNotificationsRead = async () => {
  await api.post("/notifications/read_all");
};

// حذف الكل
export const deleteAllNotifications = async () => {
  await api.post("/notifications/delete_all");
};

// قراءة إشعار محدد
export const markNotificationRead = async (id) => {
  await api.post(`/notifications/read`, id);
};
