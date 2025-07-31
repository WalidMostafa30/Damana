import api from "./api";

export const fetchNotifications = async () => {
  const response = await api.get("api/v2/notifications/list?page=1");
  return response.data.data;
};

export const getNotifications = async (page = 1) => {
  try {
    const response = await api.get(`api/v2/notifications/list?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.post("api/v2/notifications/read", {
      id: notificationId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await api.post("api/v2/notifications/read_all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAllNotifications = async () => {
  try {
    const response = await api.post("api/v2/notifications/delete_all");
    return response.data;
  } catch (error) {
    throw error;
  }
};
