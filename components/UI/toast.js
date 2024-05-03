import { notification } from "antd";

const toast = () => {
  const [api, contextHolder] = notification.useNotification();
  // 'success' | 'info' | 'warning' | 'error'
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  return {
    contextHolder,
    showToast: openNotificationWithIcon,
  };
};

export default toast;
