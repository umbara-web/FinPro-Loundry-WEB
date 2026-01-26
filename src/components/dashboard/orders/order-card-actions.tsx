import { Order, OrderStatus } from '@/src/types/order';
import {
  CreditCard,
  MessageSquare,
  MapPin,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

interface OrderCardActionsProps {
  order: Order;
  onConfirm: () => void;
}

export function OrderCardActions({ order, onConfirm }: OrderCardActionsProps) {
  const isOngoing = [
    OrderStatus.IN_WASHING,
    OrderStatus.IN_IRONING,
    OrderStatus.IN_PACKING,
  ].includes(order.status);
  const isDelivery = order.status === OrderStatus.ON_DELIVERY;
  const isPaymentPending = order.status === OrderStatus.WAITING_PAYMENT;
  const isCompleted = order.status === OrderStatus.COMPLETED;
  const isDelivered = order.status === OrderStatus.DELIVERED;

  return (
    <div className='flex min-w-45 flex-row justify-between gap-4 border-t border-gray-100 pt-4 md:flex-col md:items-end md:border-t-0 md:border-l md:pt-0 md:pl-6 dark:border-gray-800'>
      <div className='text-right'>
        <p className='mb-0.5 text-xs text-gray-500 dark:text-gray-400'>
          Total Harga
        </p>
        <p className='text-xl font-black text-gray-900 dark:text-white'>
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(order.price_total)}
        </p>
      </div>

      <div className='flex gap-2'>
        {isPaymentPending ? (
          <>
            <button className='rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-[#233648] dark:text-white dark:hover:bg-[#2c4054]'>
              Batal
            </button>
            <button className='flex items-center gap-1 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-orange-600'>
              <CreditCard className='h-4 w-4' />
              Bayar
            </button>
          </>
        ) : isCompleted ? (
          <>
            <button className='rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-white dark:border-gray-600 dark:text-gray-400 dark:hover:bg-[#2c4054]'>
              Invoice
            </button>
            <button className='flex items-center gap-1 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-[#233648] dark:text-white dark:hover:bg-[#2c4054]'>
              <RefreshCw className='h-4 w-4' />
              Pesan Lagi
            </button>
          </>
        ) : (
          <>
            <button className='rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-[#233648] dark:text-white dark:hover:bg-[#2c4054]'>
              Detail
            </button>
            {isDelivery && (
              <button className='flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700'>
                <MessageSquare className='h-4 w-4' />
                Chat
              </button>
            )}
            {isOngoing && (
              <button className='flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700'>
                <MapPin className='h-4 w-4' />
                Lacak
              </button>
            )}
            {isDelivered && (
              <button
                onClick={onConfirm}
                className='flex items-center gap-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-green-600/20 transition-colors hover:bg-green-700'
              >
                <CheckCircle className='h-4 w-4' />
                Konfirmasi Pesanan
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
