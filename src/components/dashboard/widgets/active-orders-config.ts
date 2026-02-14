import { OrderStatus } from '@/src/types/order';
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from '@/src/lib/constants/order-status';

interface StatusConfig {
  label: string;
  colorClass: string;
  step: number;
  progress: number;
  truckColor: string;
}

export function getStatusConfig(status: OrderStatus): StatusConfig {
  switch (status) {
    case OrderStatus.CREATED:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.CREATED],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.CREATED],
        step: 1,
        progress: 25,
        truckColor: 'text-amber-500',
      };
    case OrderStatus.WAITING_PAYMENT:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.WAITING_PAYMENT],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.WAITING_PAYMENT],
        step: 2,
        progress: 50,
        truckColor: 'text-amber-500',
      };
    case OrderStatus.PAID:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.PAID],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.PAID],
        step: 2,
        progress: 50,
        truckColor: 'text-emerald-500',
      };
    case OrderStatus.IN_WASHING:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.IN_WASHING],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.IN_WASHING],
        step: 2,
        progress: 50,
        truckColor: 'text-blue-500',
      };
    case OrderStatus.IN_IRONING:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.IN_IRONING],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.IN_IRONING],
        step: 2,
        progress: 50,
        truckColor: 'text-indigo-500',
      };
    case OrderStatus.IN_PACKING:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.IN_PACKING],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.IN_PACKING],
        step: 2,
        progress: 50,
        truckColor: 'text-violet-500',
      };
    case OrderStatus.READY_FOR_DELIVERY:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.READY_FOR_DELIVERY],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.READY_FOR_DELIVERY],
        step: 2,
        progress: 50,
        truckColor: 'text-orange-500',
      };
    case OrderStatus.ON_DELIVERY:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.ON_DELIVERY],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.ON_DELIVERY],
        step: 3,
        progress: 75,
        truckColor: 'text-orange-500',
      };
    case OrderStatus.DELIVERED:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.DELIVERED],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.DELIVERED],
        step: 3,
        progress: 75,
        truckColor: 'text-green-500',
      };
    case OrderStatus.COMPLETED:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.COMPLETED],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.COMPLETED],
        step: 4,
        progress: 100,
        truckColor: 'text-green-500',
      };
    case OrderStatus.CANCELLED:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.CANCELLED],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.CANCELLED],
        step: 1,
        progress: 0,
        truckColor: 'text-red-500',
      };
    case OrderStatus.ON_HOLD:
      return {
        label: ORDER_STATUS_LABELS[OrderStatus.ON_HOLD],
        colorClass: ORDER_STATUS_COLORS[OrderStatus.ON_HOLD],
        step: 1,
        progress: 0,
        truckColor: 'text-yellow-500',
      };
    default:
      return {
        label: ORDER_STATUS_LABELS[status] || status,
        colorClass:
          ORDER_STATUS_COLORS[status] ||
          'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/20 dark:text-slate-400 dark:border-slate-500/30',
        step: 1,
        progress: 0,
        truckColor: 'text-slate-500',
      };
  }
}
