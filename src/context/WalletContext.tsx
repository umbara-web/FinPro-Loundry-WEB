'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { Order } from '@/src/types/order';
import { Address } from '@/src/types/address';
import {
  fetchDashboardData,
  NotificationItem,
} from '@/src/types/dashboard-data';
import { useAuth } from './AuthContext';
import { WalletContextType, PartialOrder } from '@/src/types/wallet-context';
import { loadReadMap } from '@/src/lib/utils/notification-storage';
import { useNotificationActions } from '@/src/hooks/use-notification-actions';
import { useWalletActions } from '@/src/hooks/use-wallet-actions';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(0);
  const [points] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeOrders, setActiveOrders] = useState<PartialOrder[]>([]);
  const [primaryAddress, setPrimaryAddress] = useState<Address | null>(null);
  const [localNotifications, setLocalNotifications] = useState<
    NotificationItem[]
  >([]);
  const [dbNotifications, setDbNotifications] = useState<NotificationItem[]>(
    []
  );
  const [readMap, setReadMap] = useState<Record<string, boolean>>({});

  const { user } = useAuth();

  // Load readMap saat user berubah
  useEffect(() => {
    setReadMap(loadReadMap(user));
  }, [user?.id, user?.email]);

  // Fetch dashboard data
  useEffect(() => {
    if (!user) return;
    fetchDashboardData().then((data) => {
      setActiveOrders(data.activeOrders as PartialOrder[]);
      setPrimaryAddress(data.primaryAddress);
      setDbNotifications(data.notifications);
    });
  }, [user]);

  // Computed notifications dengan status read dari readMap
  const notifications = useMemo(() => {
    return [...localNotifications, ...dbNotifications]
      .map((n) => ({ ...n, read: readMap[n.id] ?? n.read }))
      .sort(
        (a, b) =>
          new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime()
      );
  }, [localNotifications, dbNotifications, readMap]);

  const notificationCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const cartCount = activeOrders.length;

  // Custom hooks untuk actions
  const { topUp, addToCart } = useWalletActions({
    setBalance,
    setIsLoading,
    setActiveOrders,
    setLocalNotifications,
  });

  const notificationActions = useNotificationActions({
    user,
    localNotifications,
    dbNotifications,
    setLocalNotifications,
    setDbNotifications,
    setReadMap,
  });

  const contextValue = useMemo<WalletContextType>(
    () => ({
      balance,
      topUp,
      isLoading,
      points,
      cartCount,
      notificationCount,
      addToCart,
      activeOrders,
      notifications,
      primaryAddress,
      ...notificationActions,
    }),
    [
      balance,
      topUp,
      isLoading,
      points,
      cartCount,
      notificationCount,
      addToCart,
      activeOrders,
      notifications,
      primaryAddress,
      notificationActions,
    ]
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
}
