'use client';

import { Order } from '@/src/types/order';
import { formatCurrency } from '@/src/lib/utils/format';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface OrderListItemInfoProps {
  order: Order;
}

export function OrderListItemInfo({ order }: OrderListItemInfoProps) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-3'>
        <span className='font-mono text-sm font-medium text-slate-400'>
          #{order.id.slice(0, 8).toUpperCase()}
        </span>
        <span className='rounded-full bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300'>
          {format(new Date(order.created_at), 'dd MMM yyyy', { locale: id })}
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <p className='text-lg font-bold text-white'>
          {formatCurrency(order.price_total)}
        </p>
        <span className='text-xs text-slate-500'>
          • {order.order_item?.length || 0} Item
        </span>
      </div>
    </div>
  );
}
