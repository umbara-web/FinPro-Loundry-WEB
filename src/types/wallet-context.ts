// types/wallet-context.ts

import { Order, OrderStatus } from '@/src/types/order';
import { Address } from '@/src/types/address';
import { NotificationItem } from '@/src/types/dashboard-data';

// Tipe untuk order yang belum lengkap (misal: baru dibuat)
export type PartialOrder = {
  id: string;
  status: OrderStatus;
  created_at: string;
} & Partial<Omit<Order, 'id' | 'status' | 'created_at'>>;

export interface WalletContextType {
  balance: number;
  topUp: (amount: number) => Promise<boolean>;
  isLoading: boolean;
  points: number;
  cartCount: number;
  notificationCount: number;
  addToCart: () => void;
  deleteNotification: (id: string) => void;
  clearNotifications: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllAsRead: () => void;
  toggleNotificationRead: (id: string) => void;
  activeOrders: PartialOrder[];
  notifications: NotificationItem[];
  primaryAddress: Address | null;
}

export interface UserIdentifier {
  id?: string;
  email?: string;
}
