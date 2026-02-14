import { OrderStatus } from '@/src/types/order';
import {
  getOrderStatusColor,
  getOrderStatusLabel,
} from '@/src/lib/constants/order-status';

export const OrderStatusBadge = ({
  status,
}: {
  status: OrderStatus | string;
}) => {
  const colorClass = getOrderStatusColor(status as OrderStatus);
  const label = getOrderStatusLabel(status as OrderStatus);

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${colorClass}`}
    >
      {label}
    </span>
  );
};
