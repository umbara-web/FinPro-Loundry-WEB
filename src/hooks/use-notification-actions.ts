// hooks/useNotificationActions.ts

import { useCallback } from 'react';
import { NotificationItem } from '@/src/types/dashboard-data';
import { saveReadMap } from '@/src/lib/utils/notification-storage';
import { UserIdentifier } from '@/src/types/wallet-context';

interface NotificationActionsProps {
  user: UserIdentifier | null;
  localNotifications: NotificationItem[];
  dbNotifications: NotificationItem[];
  setLocalNotifications: React.Dispatch<
    React.SetStateAction<NotificationItem[]>
  >;
  setDbNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  setReadMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export function useNotificationActions({
  user,
  localNotifications,
  dbNotifications,
  setLocalNotifications,
  setDbNotifications,
  setReadMap,
}: NotificationActionsProps) {
  const allNotifications = [...localNotifications, ...dbNotifications];

  const deleteNotification = useCallback(
    (id: string) => {
      setLocalNotifications((prev) => prev.filter((n) => n.id !== id));
      setDbNotifications((prev) => prev.filter((n) => n.id !== id));
      setReadMap((prev) => {
        const newMap = { ...prev };
        delete newMap[id];
        saveReadMap(user, newMap);
        return newMap;
      });
    },
    [user, setLocalNotifications, setDbNotifications, setReadMap]
  );

  const markAllAsRead = useCallback(() => {
    setReadMap((prev) => {
      const newMap = { ...prev };
      allNotifications.forEach((n) => {
        newMap[n.id] = true;
      });
      saveReadMap(user, newMap);
      return newMap;
    });
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setDbNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, [
    user,
    allNotifications,
    setLocalNotifications,
    setDbNotifications,
    setReadMap,
  ]);

  const clearNotifications = useCallback(() => {
    markAllAsRead();
  }, [markAllAsRead]);

  const markNotificationAsRead = useCallback(
    (id: string) => {
      setReadMap((prev) => {
        if (prev[id] === true) return prev;
        const newMap = { ...prev, [id]: true };
        saveReadMap(user, newMap);
        return newMap;
      });
    },
    [user, setReadMap]
  );

  const toggleNotificationRead = useCallback(
    (id: string) => {
      setReadMap((prev) => {
        const currentNotif = allNotifications.find((n) => n.id === id);
        const currentStatus = prev[id] ?? currentNotif?.read ?? false;
        const newMap = { ...prev, [id]: !currentStatus };
        saveReadMap(user, newMap);
        return newMap;
      });
    },
    [user, allNotifications, setReadMap]
  );

  return {
    deleteNotification,
    clearNotifications,
    markNotificationAsRead,
    markAllAsRead,
    toggleNotificationRead,
  };
}
