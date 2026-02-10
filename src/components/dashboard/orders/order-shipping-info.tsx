import { Order } from '@/src/types/order';
import { FaShippingFast, FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { MdMarkUnreadChatAlt } from 'react-icons/md';

interface OrderShippingInfoProps {
  order: Order;
}

export function OrderShippingInfo({ order }: OrderShippingInfoProps) {
  const driverTask =
    order.driver_task && order.driver_task.length > 0
      ? order.driver_task[0]
      : null;
  const driver = driverTask?.driver;

  return (
    <div className='border-border space-y-6 rounded-2xl border bg-slate-200 p-8 dark:border-slate-700 dark:bg-slate-900'>
      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
          <FaShippingFast className='h-6 w-6' />
        </div>
        <h3 className='text-lg font-bold'>Informasi Pengiriman</h3>
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
          Lokasi Tujuan
        </p>
        <div className='flex items-start gap-3'>
          <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
            <FaMapMarkerAlt className='h-6 w-6' />
          </div>
          <div>
            <p className='text-sm font-semibold'>
              {order.pickup_request.customer_address.city}
            </p>
            <p className='text-muted-foreground mt-1 text-xs leading-relaxed'>
              {order.pickup_request.customer_address.address},{' '}
              {order.pickup_request.customer_address.postal_code}
            </p>
          </div>
        </div>
      </div>

      <div className='border-border border-t pt-6'>
        <p className='text-muted-foreground mb-4 text-xs font-bold tracking-wider uppercase'>
          Driver Penjemputan
        </p>
        {driver ? (
          <div className='flex items-center gap-4'>
            <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
              <BsFillFileEarmarkPersonFill className='h-6 w-6' />
            </div>
            <div className='flex-1'>
              <p className='text-sm font-bold'>{driver.name}</p>
              <p className='text-muted-foreground text-xs'>
                ID Driver: {driver.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <button className='bg-primary/10 text-primary hover:bg-primary/20 flex size-10 cursor-pointer items-center justify-center rounded-xl transition-colors'>
              <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
                <MdMarkUnreadChatAlt className='h-6 w-6' />
              </div>
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <p className='text-muted-foreground text-xs italic'>
              Belum ada driver ditugaskan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
