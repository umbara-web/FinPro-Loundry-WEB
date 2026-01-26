'use client';

import { Order } from '@/src/types/order';
import { OrderListItemInfo } from './order-list-item-info';
import { OrderListItemActions } from './order-list-item-actions';

interface OrderListItemProps {
  order: Order;
}

export function OrderListItem({ order }: OrderListItemProps) {
  return (
    <div className='flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 transition-all hover:bg-slate-800/50 sm:flex-row sm:items-center sm:justify-between'>
      <OrderListItemInfo order={order} />
      <OrderListItemActions order={order} />
    </div>
  );
}
