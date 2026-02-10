'use client';

import { formatCurrency } from '@/src/lib/utils/format';
import { MdLock, MdVerifiedUser } from 'react-icons/md';

interface Order {
  id: string;
  total_weight: number;
  price_total: number;
}

interface OrderSummaryCardProps {
  order: Order;
  isPending: boolean;
  onPayment: () => void;
}

export function OrderSummaryCard({
  order,
  isPending,
  onPayment,
}: OrderSummaryCardProps) {
  return (
    <div className='dark:bg-surface-dark mt-11 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-transparent'>
      <SummaryHeader orderId={order.id} />
      <CostBreakdown
        totalWeight={order.total_weight}
        priceTotal={order.price_total}
      />
      <ActionButton isPending={isPending} onPayment={onPayment} />
    </div>
  );
}

function SummaryHeader({ orderId }: { orderId: string }) {
  return (
    <div className='border-b border-slate-100 p-5 dark:border-slate-700'>
      <h3 className='text-lg font-bold'>Ringkasan Pesanan</h3>
      <p className='mt-1 text-xs text-red-600'>ID: #{orderId.slice(0, 8)}</p>
    </div>
  );
}

interface CostBreakdownProps {
  totalWeight: number;
  priceTotal: number;
}

function CostBreakdown({ totalWeight, priceTotal }: CostBreakdownProps) {
  return (
    <div className='flex flex-col gap-2 border-t border-slate-100 p-5 dark:border-slate-700'>
      <div className='flex justify-between text-sm text-slate-500 dark:text-slate-400'>
        <span>Total Item/Berat</span>
        <span className='font-medium'>{totalWeight} kg</span>
      </div>
      <div className='my-2 h-px bg-slate-100 dark:bg-slate-700'></div>
      <div className='flex items-center justify-between'>
        <span className='text-base font-bold'>Total Tagihan</span>
        <span className='text-primary text-xl font-black dark:text-white'>
          {formatCurrency(priceTotal)}
        </span>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  isPending: boolean;
  onPayment: () => void;
}

function ActionButton({ isPending, onPayment }: ActionButtonProps) {
  return (
    <div className='p-5 pt-0'>
      <button
        onClick={onPayment}
        disabled={isPending}
        className='shadow-primary/25 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 text-base font-bold text-white shadow-lg transition-all hover:bg-blue-800 disabled:opacity-50'
      >
        <MdLock />
        <span>{isPending ? 'Memproses...' : 'Bayar Sekarang'}</span>
      </button>
      <p className='mt-3 flex items-center justify-center gap-1 text-center text-xs text-slate-400'>
        <MdVerifiedUser className='text-xs' />
        Transaksi Anda aman & terenkripsi
      </p>
    </div>
  );
}
