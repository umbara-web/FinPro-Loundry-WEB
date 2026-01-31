// hooks/useWalletActions.ts

import { useCallback } from 'react';
import { NotificationItem } from '@/src/types/dashboard-data';
import { PartialOrder } from '@/src/types/wallet-context';
import { OrderStatus } from '@/src/types/order';

interface WalletActionsProps {
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveOrders: React.Dispatch<React.SetStateAction<PartialOrder[]>>;
  setLocalNotifications: React.Dispatch<
    React.SetStateAction<NotificationItem[]>
  >;
}

export function useWalletActions({
  setBalance,
  setIsLoading,
  setActiveOrders,
  setLocalNotifications,
}: WalletActionsProps) {
  const topUp = useCallback(
    async (amount: number) => {
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
    },
    [setBalance, setIsLoading, setLocalNotifications]
  );

  const addToCart = useCallback(() => {
    // ✅ Sekarang valid karena PartialOrder hanya require id, status, created_at
    const mockOrder: PartialOrder = {
      id: `ORD-${Date.now()}`,
      status: OrderStatus.WAITING_PAYMENT,
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
  }, [setActiveOrders, setLocalNotifications]);

  return { topUp, addToCart };
}
