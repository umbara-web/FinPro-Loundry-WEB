import { Order, OrderStatus } from '@/src/types/order';
import Link from 'next/link';
import { getStatusStyle, formatCurrency, formatDate } from './utils';

interface Props {
  order: Order;
}

export function PaymentHistoryRow({ order }: Props) {
  const itemDesc =
    order.order_item?.length > 0
      ? `${order.order_item[0].laundry_item.name} (${order.order_item[0].qty}) ${
          order.order_item.length > 1
            ? `+${order.order_item.length - 1} lainnya`
            : ''
        }`
      : 'Pesanan Laundry';

  return (
    <tr className='border-b border-[#233648] transition-colors last:border-0 hover:bg-[#233648]/30'>
      <td className='p-4 font-bold text-white'>
        #{order.id.slice(0, 8).toUpperCase()}
      </td>
      <td className='p-4 text-[#92adc9]'>{formatDate(order.created_at)}</td>
      <td className='p-4 text-white'>{itemDesc}</td>
      <td className='p-4 font-bold text-white'>
        {formatCurrency(order.price_total)}
      </td>
      <td className='p-4'>
        {order.status === OrderStatus.PAID && (
          <span className='inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500'>
            Berhasil
          </span>
        )}
        {order.status === OrderStatus.WAITING_PAYMENT && (
          <span className='inline-flex items-center rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-500'>
            Menunggu
          </span>
        )}
        {(order.status === OrderStatus.CANCELLED ||
          order.status === OrderStatus.COMPLETED) && (
          // Assuming Completed is also 'Berhasil' in user's view or handling strictly 'Gagal' for Cancelled
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              order.status === OrderStatus.CANCELLED
                ? 'bg-red-500/10 text-red-500'
                : 'bg-green-500/10 text-green-500'
            }`}
          >
            {order.status === OrderStatus.CANCELLED ? 'Gagal' : 'Selesai'}
          </span>
        )}
        {/* Fallback for other statuses */}
        {![
          OrderStatus.PAID,
          OrderStatus.WAITING_PAYMENT,
          OrderStatus.CANCELLED,
          OrderStatus.COMPLETED,
        ].includes(order.status) && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(order.status)}`}
          >
            {order.status.replace(/_/g, ' ')}
          </span>
        )}
      </td>
      <td className='p-4 text-right'>
        {order.status === OrderStatus.WAITING_PAYMENT ? (
          <Link
            href={`/customer/orders/${order.id}/payment`}
            className='text-xs font-medium text-blue-500 hover:text-blue-400 hover:underline'
          >
            Bayar
          </Link>
        ) : (
          <Link
            href={`/customer/orders/${order.id}`} // Or invoice link if available
            className='text-xs font-medium text-blue-500 hover:text-blue-400 hover:underline'
          >
            {order.status === OrderStatus.PAID ||
            order.status === OrderStatus.COMPLETED
              ? 'Lihat Invoice'
              : 'Detail'}
          </Link>
        )}
      </td>
    </tr>
  );
}
