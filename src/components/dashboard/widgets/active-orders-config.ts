import { OrderStatus } from '@/src/types/order';

interface StatusConfig {
  label: string;
  colorClass: string;
  step: number;
  progress: number;
  truckColor: string;
}

export function getStatusConfig(status: OrderStatus): StatusConfig {
  switch (status) {
    case OrderStatus.IN_WASHING:
      return {
        label: 'Sedang Dicuci',
        colorClass:
          'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',
        step: 2,
        progress: 50,
        truckColor: 'text-blue-500',
      };
    case OrderStatus.IN_IRONING:
      return {
        label: 'Sedang Disetrika',
        colorClass:
          'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-400 dark:border-indigo-500/30',
        step: 3,
        progress: 75,
        truckColor: 'text-indigo-500',
      };
    case OrderStatus.ON_DELIVERY:
    case OrderStatus.READY_FOR_DELIVERY:
      return {
        label: 'Sedang Diantar',
        colorClass:
          'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30',
        step: 4,
        progress: 90,
        truckColor: 'text-orange-500',
      };
    case OrderStatus.WAITING_PAYMENT:
    case OrderStatus.CREATED:
      return {
        label: 'Menunggu Pembayaran',
        colorClass:
          'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',
        step: 1,
        progress: 10,
        truckColor: 'text-amber-500',
      };
    default:
      return {
        label: status,
        colorClass:
          'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/20 dark:text-slate-400 dark:border-slate-500/30',
        step: 1,
        progress: 0,
        truckColor: 'text-slate-500',
      };
  }
}
