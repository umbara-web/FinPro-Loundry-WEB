import { Order, OrderStatus } from '@/src/types/order';
import {
  getOrderStatusLabel,
  getOrderStatusColor,
} from '@/src/lib/constants/order-status';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface OrderCardStatusProps {
  order: Order;
  itemsSummary: string;
  totalItems: number;
}

export function OrderCardStatus({
  order,
  itemsSummary,
  totalItems,
}: OrderCardStatusProps) {
  const isOngoing = [
    OrderStatus.IN_WASHING,
    OrderStatus.IN_IRONING,
    OrderStatus.IN_PACKING,
  ].includes(order.status);
  const isDelivery = order.status === OrderStatus.ON_DELIVERY;
  const isPaymentPending = order.status === OrderStatus.WAITING_PAYMENT;

  return (
    <div className='flex flex-1 flex-col gap-3'>
      <div className='flex items-center gap-3'>
        <div
          className={`rounded-md border px-2.5 py-1 text-xs font-bold tracking-wide uppercase ${getOrderStatusColor(
            order.status
          )}`}
        >
          {getOrderStatusLabel(order.status)}
        </div>
        <span className='text-xs font-medium text-gray-400'>
          #{order.id.slice(0, 8).toUpperCase()}
        </span>
        <span className='text-xs text-gray-400'>•</span>
        <span className='text-xs text-gray-400'>
          {format(new Date(order.created_at), 'dd MMM yyyy, HH:mm', {
            locale: id,
          })}
        </span>
      </div>

      <div>
        <h3 className='mb-1 text-lg font-bold text-gray-900 dark:text-white'>
          {itemsSummary || 'Paket Laundry'}
        </h3>
        <p className='text-sm text-gray-500 dark:text-[#92adc9]'>
          {totalItems} Item • {order.total_weight} kg
        </p>
      </div>

      {/* Dynamic Content based on Status */}
      {isOngoing && (
        <div className='mt-2'>
          <div className='flex w-full max-w-sm items-center'>
            <div className='bg-primary h-2 w-2 rounded-full'></div>
            <div className='bg-primary h-1 flex-1'></div>
            <div className='bg-primary ring-primary/20 h-2 w-2 rounded-full ring-4'></div>
            <div className='h-1 flex-1 bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-2 w-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
          </div>
          <div className='mt-1 flex w-full max-w-sm justify-between'>
            <span className='text-[10px] font-medium text-gray-500'>
              Dijemput
            </span>
            <span className='text-primary text-[10px] font-bold'>Dicuci</span>
            <span className='text-[10px] text-gray-400'>Selesai</span>
          </div>
        </div>
      )}

      {isDelivery && order.driver_task?.[0]?.driver && (
        <div className='bg-background-light mt-1 flex w-fit items-center gap-2 rounded-lg border border-gray-100 p-2 dark:border-transparent dark:bg-[#151e26]'>
          <div className='h-8 w-8 rounded-full bg-gray-300 bg-cover bg-center'>
            {/* Avatar placeholder */}
          </div>
          <div>
            <p className='text-xs font-bold text-gray-900 dark:text-white'>
              Driver: {order.driver_task[0].driver.name}
            </p>
            <p className='text-[10px] text-gray-500'>Sedang menuju lokasi</p>
          </div>
        </div>
      )}

      {isPaymentPending && (
        <p className='flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400'>
          <span className='material-symbols-outlined text-sm'>schedule</span>
          Segera lakukan pembayaran
        </p>
      )}
    </div>
  );
}
