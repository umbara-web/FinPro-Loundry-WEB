import { formatCurrency } from '@/src/lib/utils/format';
import { useRouter } from 'next/navigation';
import { Order } from '@/src/types/order';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { MdPendingActions } from 'react-icons/md';
import { BiCheckShield } from 'react-icons/bi';

interface OrderSummaryProps {
  order: Order;
  isConfirming: boolean;
  onConfirm: () => void;
}

export function OrderSummary({
  order,
  isConfirming,
  onConfirm,
}: OrderSummaryProps) {
  const router = useRouter();

  // Calculate totals from order items when backend values are 0
  const calculatedTotal =
    order.price_total > 0
      ? order.price_total
      : (order.order_item || []).reduce((sum, item) => {
          const unitPrice = item.price || item.laundry_item?.price || 0;
          return sum + unitPrice * item.qty;
        }, 0);

  const calculatedWeight =
    order.total_weight > 0
      ? order.total_weight
      : (order.order_item || []).reduce((sum, item) => sum + item.qty, 0);

  // Logic for Buttons
  const showPayButton =
    order.status === 'WAITING_PAYMENT' ||
    (order.status === 'IN_PACKING' &&
      !order.payment?.some((p: any) => p.status === 'PAID'));
  const showConfirmButton = order.status === 'DELIVERED';

  return (
    <section className='grid grid-cols-1 gap-8 md:grid-cols-2'>
      {/* Payment Method Card */}
      <div className='border-border flex flex-col gap-4 rounded-2xl border bg-slate-200 p-8 dark:border-slate-700 dark:bg-slate-900'>
        <h3 className='text-muted-foreground mb-2 text-sm font-bold tracking-widest uppercase'>
          Metode Pembayaran
        </h3>

        {/* Placeholder for Payment Method - Logic to be enhanced later */}
        {order.status === 'PAID' || order.paid_at ? (
          <div className='flex items-center gap-4'>
            <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
              <FaMoneyBill1Wave className='h-6 w-6' />
            </div>
            <div>
              <p className='font-bold'>Pembayaran Sukses</p>
              <p className='text-muted-foreground text-xs'>Terverifikasi</p>
            </div>
            <div className='ml-auto flex items-center gap-1 text-green-500'>
              <BiCheckShield className='h-6 w-6' />
              <span className='text-xs font-bold uppercase'>Lunas</span>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
              <MdPendingActions className='h-6 w-6' />
            </div>
            <div>
              <p className='font-bold'>Belum Dibayar</p>
              <p className='text-muted-foreground text-xs'>
                Silahkan lakukan pembayaran
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cost Summary Card */}
      <div className='border-border flex flex-col gap-4 rounded-2xl border bg-slate-200 p-8 dark:border-slate-700 dark:bg-slate-900'>
        <h3 className='text-muted-foreground mb-2 text-sm font-bold tracking-widest uppercase'>
          Ringkasan Biaya
        </h3>
        <div className='space-y-3'>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Total Berat</span>
            <span className='font-medium'>{calculatedWeight} kg</span>
          </div>
          {/* Add other cost items if available */}
          <div className='border-border mt-2 flex items-center justify-between border-t pt-4'>
            <span className='text-foreground text-base font-bold'>
              Total Pembayaran
            </span>
            <span className='text-primary text-2xl font-bold dark:text-white'>
              {formatCurrency(calculatedTotal)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className='mt-6 flex flex-col gap-3'>
          {showPayButton && (
            <button
              onClick={() =>
                router.push(`/dashboard/orders/${order.id}/payment`)
              }
              className='bg-primary hover:bg-primary/90 shadow-primary/20 w-full rounded-xl py-3 font-bold text-white shadow-lg transition-all'
            >
              Bayar Sekarang
            </button>
          )}

          {showConfirmButton && (
            <button
              onClick={onConfirm}
              disabled={isConfirming}
              className='w-full rounded-xl bg-green-500 py-3 font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-green-600'
            >
              {isConfirming ? 'Memproses...' : 'Konfirmasi Pesanan'}
            </button>
          )}

          {order.status === 'COMPLETED' && (
            <div className='rounded-xl border border-green-200 bg-green-50 p-3 text-center text-sm font-bold text-green-600 dark:border-green-900/20 dark:bg-green-900/10 dark:text-green-500'>
              Pesanan Selesai
            </div>
          )}

          {/* Complaint Button - Show for DELIVERED or COMPLETED */}
          {['DELIVERED', 'COMPLETED'].includes(order.status) && (
            <button
              onClick={() =>
                router.push(`/dashboard/orders/${order.id}/complaint`)
              }
              className='w-full rounded-xl border border-orange-200 bg-orange-50 py-3 font-bold text-orange-600 transition-all hover:bg-orange-100 dark:border-orange-900/20 dark:bg-orange-900/10 dark:text-orange-400 dark:hover:bg-orange-900/20'
            >
              Ajukan Komplain
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
