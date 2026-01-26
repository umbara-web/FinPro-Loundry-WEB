import { OrderStatus } from '@/src/types/order';

/**
 * Indonesian labels for all order statuses
 */
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.CREATED]: 'Menunggu Penjemputan Driver',
  [OrderStatus.WAITING_PAYMENT]: 'Menunggu Pembayaran',
  [OrderStatus.PAID]: 'Laundry Telah Sampai Outlet',
  [OrderStatus.IN_WASHING]: 'Laundry Sedang Dicuci',
  [OrderStatus.IN_IRONING]: 'Laundry Sedang Disetrika',
  [OrderStatus.IN_PACKING]: 'Laundry Sedang Di Packing',
  [OrderStatus.READY_FOR_DELIVERY]: 'Laundry Siap Diantar',
  [OrderStatus.ON_DELIVERY]: 'Laundry Sedang Dikirim',
  [OrderStatus.DELIVERED]: 'Laundry Telah Diterima',
  [OrderStatus.COMPLETED]: 'Selesai',
  [OrderStatus.CANCELLED]: 'Dibatalkan',
  [OrderStatus.ON_HOLD]: 'Ditunda',
};

/**
 * Color classes for each order status
 */
export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.CREATED]:
    'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20',
  [OrderStatus.WAITING_PAYMENT]:
    'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20',
  [OrderStatus.PAID]:
    'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  [OrderStatus.IN_WASHING]:
    'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  [OrderStatus.IN_IRONING]:
    'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  [OrderStatus.IN_PACKING]:
    'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  [OrderStatus.READY_FOR_DELIVERY]:
    'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20',
  [OrderStatus.ON_DELIVERY]:
    'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
  [OrderStatus.DELIVERED]:
    'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20',
  [OrderStatus.COMPLETED]:
    'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20',
  [OrderStatus.CANCELLED]:
    'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20',
  [OrderStatus.ON_HOLD]:
    'bg-gray-100 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20',
};

/**
 * Filter categories to backend statuses mapping
 */
export const STATUS_FILTER_GROUPS = {
  ongoing: [
    OrderStatus.CREATED,
    OrderStatus.WAITING_PAYMENT,
    OrderStatus.PAID,
    OrderStatus.IN_WASHING,
    OrderStatus.IN_IRONING,
    OrderStatus.IN_PACKING,
    OrderStatus.READY_FOR_DELIVERY,
  ],
  shipping: [OrderStatus.ON_DELIVERY],
  completed: [OrderStatus.DELIVERED, OrderStatus.COMPLETED],
  cancelled: [OrderStatus.CANCELLED],
};

// Helper to get status label
export function getOrderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status] || status.replace(/_/g, ' ');
}

// Helper to get status color classes
export function getOrderStatusColor(status: OrderStatus): string {
  return ORDER_STATUS_COLORS[status] || 'bg-gray-100 text-gray-600';
}
