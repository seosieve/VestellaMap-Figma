// notificationManager.ts

let currentNotification: NotificationHandler | null = null;

export const showNotification = (message: string) => {
  // 이전 알림이 있다면 취소
  if (currentNotification) {
    currentNotification.cancel();
  }

  currentNotification = figma.notify(message, { timeout: 2000 });
};
