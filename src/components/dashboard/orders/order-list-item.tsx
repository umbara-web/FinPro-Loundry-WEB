'use client';

import { Order, OrderStatus } from '@/src/types/order';
import { formatCurrency } from '@/src/lib/utils/format';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import {
  ChevronRight,
  Shirt,
  BedDouble,
  Sparkles,
  Truck,
  Clock,
} from 'lucide-react';
import { OrderStatusBadge } from './order-status-badge';

interface OrderListItemProps {
  order: Order;
}

export function OrderListItem({ order }: OrderListItemProps) {
  // Helper to determine icon based on items or default
  const getOrderIcon = () => {
    // Simple logic: check first item name or default to shirt
    const firstItem =
      order.order_item?.[0]?.laundry_item.name.toLowerCase() || '';
    if (firstItem.includes('bed') || firstItem.includes('selimut'))
      return <BedDouble className='text-3xl' />;
    if (firstItem.includes('dry') || firstItem.includes('jas'))
      return <Sparkles className='text-3xl' />;
    return <Shirt className='text-3xl' />;
  };

  const getIconColor = () => {
    const firstItem =
      order.order_item?.[0]?.laundry_item.name.toLowerCase() || '';
    if (firstItem.includes('bed'))
      return 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400';
    if (firstItem.includes('dry'))
      return 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400';
    return 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400';
  };

  return (
    <div className='group hover:border-primary/60 flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all dark:border-slate-700 dark:bg-[#1c2732]'>
      <div className='grid grid-cols-1 items-center gap-6 p-6 lg:grid-cols-12'>
        {/* Order ID & Date */}
        <div className='flex flex-col lg:col-span-3'>
          <div className='mb-1 flex items-center gap-2'>
            <span className='text-[10px] font-bold tracking-widest text-gray-400 uppercase'>
              No. Pesanan
            </span>
            {order.status === OrderStatus.IN_WASHING && (
              <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500'></span>
            )}
          </div>
          <h3 className='text-lg font-bold text-gray-900 dark:text-white'>
            {order.id.slice(0, 12).toUpperCase()}
          </h3>
          <p className='mt-0.5 text-xs font-medium text-gray-500 dark:text-[#92adc9]'>
            {format(new Date(order.created_at), 'd MMM yyyy • HH:mm', {
              locale: id,
            })}{' '}
            WIB
          </p>
        </div>

        {/* Icon & Main Info */}
        <div className='flex items-start gap-4 border-l border-gray-100 lg:col-span-5 lg:pl-6 dark:border-slate-800'>
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getIconColor()}`}
          >
            {getOrderIcon()}
          </div>
          <div className='flex flex-col'>
            <h4 className='text-sm font-bold text-gray-900 dark:text-white'>
              {order.order_item?.[0]?.laundry_item.name || 'Layanan Laundry'}
              {order.order_item?.length > 1 &&
                ` + ${order.order_item.length - 1} lainnya`}
            </h4>
            <p className='mt-1 line-clamp-2 text-xs text-gray-500 dark:text-[#92adc9]'>
              {order.total_weight} kg • {order.order_item?.length || 0} Item
            </p>
            <div className='mt-2 flex items-center gap-2'>
              <span className='rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-400'>
                Reguler
              </span>
              {order.driver_task?.[0]?.driver?.name && (
                <div className='flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400'>
                  <Truck className='h-3 w-3' />
                  {order.driver_task[0].driver.name}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status & Price */}
        <div className='flex flex-col items-start justify-between border-l border-gray-100 lg:col-span-4 lg:items-end lg:pl-6 dark:border-slate-800'>
          <div className='text-left lg:text-right'>
            <div className='mb-2 inline-flex'>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className='mb-0.5 text-[10px] font-bold tracking-tight text-gray-400 uppercase'>
              Total Harga
            </p>
            <p className='text-xl font-black tracking-tight text-gray-900 dark:text-white'>
              {formatCurrency(order.price_total)}
            </p>
          </div>
        </div>
      </div>

      {/* Footer / Action Button */}
      <div className='flex justify-center px-6 pt-2 pb-6'>
        {order.status === 'WAITING_PAYMENT' ? (
          <Button
            asChild
            className='group/btn w-full max-w-sm gap-2 rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600'
          >
            <Link href={`/customer/orders/${order.id}/payment`}>
              <span className='text-sm font-bold whitespace-nowrap'>
                Bayar Sekarang
              </span>
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            className='group/btn shadow-primary/20 w-full max-w-sm cursor-pointer gap-2 rounded-xl bg-blue-500 text-white shadow-lg transition-all duration-300 hover:bg-blue-800'
          >
            <Link href={`/dashboard/orders/${order.id}`}>
              <span className='text-sm font-bold whitespace-nowrap'>
                Detail Pesanan
              </span>
              <ChevronRight className='text-xl transition-transform group-hover/btn:translate-x-0.5' />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
