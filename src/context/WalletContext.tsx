'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '@/src/types/order';
import { Address } from '@/src/types/address';
import {
  fetchDashboardData,
  NotificationItem,
} from '@/src/types/dashboard-data';
import { useAuth } from './AuthContext';

interface WalletContextType {
  balance: number;
  topUp: (amount: number) => Promise<boolean>;
  isLoading: boolean;
  points: number;
  cartCount: number;
  notificationCount: number;
  addToCart: () => void;
  addNotification: () => void;
  deleteNotification: (id: string) => void;
  clearNotifications: () => void;
  activeOrders: Order[];
  notifications: NotificationItem[];
  primaryAddress: Address | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // Initialize with the hardcoded value from the design
  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Data States
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [primaryAddress, setPrimaryAddress] = useState<Address | null>(null);
  // Ephemeral notifications (TopUp, etc.)
  const [localNotifications, setLocalNotifications] = useState<
    NotificationItem[]
  >([]);

  // Real database-derived notifications
  const [dbNotifications, setDbNotifications] = useState<NotificationItem[]>(
    []
  );

  // Derived Counts
  const cartCount = activeOrders.length;
  // Combine local and DB notifications, sort by time desc
  const notifications = [...localNotifications, ...dbNotifications].sort(
    (a, b) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime()
  );

  const notificationCount = notifications.filter((n) => !n.read).length;

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return; // Don't fetch if not authenticated

    const loadData = async () => {
      const data = await fetchDashboardData();
      setActiveOrders(data.activeOrders);
      setPrimaryAddress(data.primaryAddress);
      setDbNotifications(data.notifications);
    };

    loadData();
  }, [user]);

  const topUp = async (amount: number) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setBalance((prev) => prev + amount);

    const newNotif: NotificationItem = {
      id: `topup-${Date.now()}`,
      title: 'Top Up Berhasil',
      message: `Top Up sebesar Rp ${amount.toLocaleString('id-ID')} berhasil.`,
      time: new Date().toISOString(),
      type: 'success',
      read: false,
    };

    setLocalNotifications((prev) => [newNotif, ...prev]);
    setIsLoading(false);
    return true;
  };

  const addToCart = () => {
    const mockOrder: any = {
      id: `ORD-${Date.now()}`,
      status: 'PENDING_PAYMENT',
      created_at: new Date().toISOString(),
    };
    setActiveOrders((prev) => [mockOrder, ...prev]);

    const newNotif: NotificationItem = {
      id: `order-new-${Date.now()}`,
      title: 'Pesanan Dibuat',
      message: 'Pesanan baru berhasil dibuat.',
      time: new Date().toISOString(),
      type: 'info',
      read: false,
    };
    setLocalNotifications((prev) => [newNotif, ...prev]);
  };

  const addNotification = () => {};

  const addNotificationItem = (item: NotificationItem) => {
    setLocalNotifications((prev) => [item, ...prev]);
  };

  const deleteNotification = (id: string) => {
    setLocalNotifications((prev) => prev.filter((n) => n.id !== id));
    setDbNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearNotifications = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setDbNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        topUp,
        isLoading,
        points,
        cartCount,
        notificationCount,
        addToCart,
        addNotification,
        deleteNotification,
        clearNotifications,
        activeOrders,
        notifications,
        primaryAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
