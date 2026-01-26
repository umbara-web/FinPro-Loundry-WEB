import { formatCurrency } from '@/src/lib/utils/format';
import { useRouter } from 'next/navigation';

interface OrderSummaryProps {
  order: any; // Ideally typed strict
  isConfirming: boolean;
  onConfirm: () => void;
}

export function OrderSummary({
  order,
  isConfirming,
  onConfirm,
}: OrderSummaryProps) {
  const router = useRouter();

  // Logic for Buttons
  const showPayButton =
    order.status === 'WAITING_PAYMENT' ||
    (order.status === 'IN_PACKING' &&
      !order.payment?.some((p: any) => p.status === 'PAID'));
  const showConfirmButton = order.status === 'DELIVERED';

  return (
    <div className='flex flex-col gap-4'>
      <div className='dark:bg-surface-dark rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700'>
        <h3 className='mb-4 font-bold'>Ringkasan Biaya</h3>
        <div className='mb-2 flex justify-between text-sm'>
          <span>Total Berat/Item</span>
          <span>{order.total_weight} kg</span>
        </div>
        <div className='text-primary my-2 flex justify-between border-t border-slate-100 pt-2 text-lg font-bold dark:border-slate-800'>
          <span>Total</span>
          <span>{formatCurrency(order.price_total)}</span>
        </div>

        {/* Actions */}
        <div className='mt-6 flex flex-col gap-3'>
          {showPayButton && (
            <button
              onClick={() =>
                router.push(`/customer/orders/${order.id}/payment`)
              }
              className='bg-primary hover:bg-primary/90 shadow-primary/20 w-full rounded-lg py-3 font-bold text-white shadow-lg transition-all'
            >
              Bayar Sekarang
            </button>
          )}

          {showConfirmButton && (
            <button
              onClick={onConfirm}
              disabled={isConfirming}
              className='w-full rounded-lg bg-green-500 py-3 font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-green-600'
            >
              {isConfirming ? 'Memproses...' : 'Konfirmasi Pesanan'}
            </button>
          )}

          {order.status === 'COMPLETED' && (
            <div className='rounded-lg border border-green-200 bg-green-50 p-3 text-center text-sm font-bold text-green-600 dark:border-green-900/20 dark:bg-green-900/10 dark:text-green-500'>
              Pesanan Selesai
            </div>
          )}

          {/* Complaint Button - Show for DELIVERED or COMPLETED */}
          {['DELIVERED', 'COMPLETED'].includes(order.status) && (
            <button
              onClick={() =>
                router.push(`/customer/orders/${order.id}/complaint`)
              }
              className='w-full rounded-lg border border-orange-200 bg-orange-50 py-3 font-bold text-orange-600 transition-all hover:bg-orange-100 dark:border-orange-900/20 dark:bg-orange-900/10 dark:text-orange-400 dark:hover:bg-orange-900/20'
            >
              Ajukan Komplain
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
