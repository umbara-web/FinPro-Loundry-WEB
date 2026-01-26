import { OrderStatus } from '@/src/types/order';

export const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.COMPLETED:
    case OrderStatus.DELIVERED:
      return 'border-green-500/20 bg-green-500/10 text-green-500';
    case OrderStatus.WAITING_PAYMENT:
    case OrderStatus.CREATED:
      return 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500';
    case OrderStatus.CANCELLED:
      return 'border-red-500/20 bg-red-500/10 text-red-500';
    default:
      return 'border-blue-500/20 bg-blue-500/10 text-blue-500';
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
