'use client';

import { Order } from '@/src/types/order';
import { OrderListItem } from './order-list-item';
import { OrderEmptyState } from './order-empty-state';
import { LucideIcon } from 'lucide-react';

interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
}

export function OrderList({
  orders,
  isLoading,
  emptyMessage,
  emptyIcon,
}: OrderListProps) {
  if (isLoading) {
    return (
      <div className='space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='h-24 w-full animate-pulse rounded-xl bg-slate-800'
          />
        ))}
      </div>
    );
  }

  if (!orders?.length) {
    return <OrderEmptyState message={emptyMessage} icon={emptyIcon} />;
  }

  return (
    <div className='space-y-4'>
      {orders.map((order) => (
        <OrderListItem key={order.id} order={order} />
      ))}
    </div>
  );
}
