import { getOrders } from '@/src/lib/api/order-api';
import { userApi } from '@/src/lib/api/user-api';
import { Order, OrderStatus } from '@/src/types/order';
import { Address } from '@/src/types/address';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'info' | 'warning';
  read: boolean;
}

export interface DashboardData {
  activeOrders: Order[];
  notifications: NotificationItem[];
  primaryAddress: Address | null;
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const result: DashboardData = {
    activeOrders: [],
    notifications: [],
    primaryAddress: null,
  };

  try {
    // 1. Fetch Active Orders
    const activeRes = await getOrders({
      page: 1,
      limit: 50,
      sortOrder: 'desc',
      sortBy: 'created_at',
    });

    if (activeRes?.data) {
      result.activeOrders = activeRes.data.filter(
        (o) =>
          o.status !== OrderStatus.COMPLETED &&
          o.status !== OrderStatus.CANCELLED
      );
    }

    // 2. Fetch Recent Activities (Orders sorted by update)
    const recentOrdersRes = await getOrders({
      page: 1,
      limit: 5,
      sortOrder: 'desc',
      sortBy: 'updated_at',
    });

    let initialDbNotifs: NotificationItem[] = [];

    if (recentOrdersRes?.data) {
      const orderNotifs = recentOrdersRes.data.map((order) => ({
        id: `ord-${order.id}-${order.updated_at}`,
        title: `Pesanan #${order.id.slice(0, 8)}`,
        message: `Status pesanan: ${order.status.replace(/_/g, ' ')}`,
        time: order.updated_at,
        type:
          order.status === OrderStatus.COMPLETED
            ? ('success' as const)
            : ('info' as const),
        read: false,
      }));
      initialDbNotifs = [...initialDbNotifs, ...orderNotifs];
    }

    // 3. Fetch Addresses (New Address Activity)
    try {
      const addresses = await userApi.getAddresses();
      const primary =
        addresses.find((addr) => addr.isPrimary) || addresses[0] || null;
      result.primaryAddress = primary;

      // Convert recent addresses to notifications (last 7 days)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const addressNotifs = addresses
        .filter((addr) => new Date(addr.createdAt) > oneWeekAgo)
        .map((addr) => ({
          id: `addr-${addr.id}`,
          title: 'Alamat Baru Ditambahkan',
          message: `Alamat "${addr.label}" telah ditambahkan.`,
          time: addr.createdAt,
          type: 'success' as const,
          read: true,
        }));

      initialDbNotifs = [...initialDbNotifs, ...addressNotifs];
    } catch (addrErr) {
      console.error('Failed to fetch addresses:', addrErr);
    }

    result.notifications = initialDbNotifs;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
  }

  return result;
}
