'use client';

import Link from 'next/link';
import { Receipt, CreditCard } from 'lucide-react';
import { Order } from '@/src/types/order';
import {
  getMethodLabel,
  formatCurrency,
  formatDate,
  getPaymentStatusBadge,
  generateTransactionId,
  BadgeStyle,
} from './payment-table-formatters';
import {
  SortIndicator,
  PaymentStatusBadge,
} from './payment-table-ui-components';

// ============== TABLE COMPONENTS ==============

interface TableHeaderProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export function TableHeader({ sortBy, sortOrder, onSort }: TableHeaderProps) {
  const headerClass =
    'px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase';
  const clickClass =
    'cursor-pointer px-6 py-5 transition-colors select-none hover:bg-slate-100 dark:hover:bg-slate-800';

  return (
    <thead>
      <tr className='border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50'>
        <th className={headerClass}>ID Transaksi</th>
        <th className={headerClass}>No. Pesanan</th>
        <th className={clickClass} onClick={() => onSort('created_at')}>
          <div className='flex items-center gap-2'>
            <span
              className={`text-xs font-bold tracking-widest uppercase ${sortBy === 'created_at' ? 'text-blue-500' : 'text-slate-500'}`}
            >
              Tanggal
            </span>
            <SortIndicator
              field='created_at'
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </div>
        </th>
        <th className={clickClass} onClick={() => onSort('price_total')}>
          <div className='flex items-center justify-end gap-2'>
            <span
              className={`text-xs font-bold tracking-widest uppercase ${sortBy === 'price_total' ? 'text-blue-500' : 'text-slate-500'}`}
            >
              Nominal
            </span>
            <SortIndicator
              field='price_total'
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </div>
        </th>
        <th className={headerClass}>Metode</th>
        <th className={`${headerClass} text-center`}>Status</th>
        <th className={`${headerClass} text-center`}>Aksi</th>
      </tr>
    </thead>
  );
}

interface ActionButtonProps {
  isPending: boolean;
  isDisabled: boolean;
  orderId: string;
}

export function ActionButton({
  isPending,
  isDisabled,
  orderId,
}: ActionButtonProps) {
  if (isPending) {
    return (
      <Link
        href={`/dashboard/orders/${orderId}/payment`}
        className='inline-flex items-center gap-2 rounded-lg border border-orange-500/20 bg-orange-500 px-4 py-1.5 text-[11px] font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95'
      >
        <CreditCard className='h-4 w-4' />
        Bayar
      </Link>
    );
  }

  if (isDisabled) {
    return (
      <button
        disabled
        className='inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-1.5 text-[11px] font-bold text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-600'
      >
        <Receipt className='h-4 w-4' />
        Invoice
      </button>
    );
  }

  return (
    <Link
      href={`/dashboard/orders/${orderId}`}
      className='inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[11px] font-bold text-blue-500 transition-all hover:bg-blue-500 hover:text-white'
    >
      <Receipt className='h-4 w-4' />
      Invoice
    </Link>
  );
}

interface PaymentRowProps {
  order: Order;
  index: number;
}

export function PaymentRow({ order, index }: PaymentRowProps) {
  // Prioritize showing the successful payment if it exists
  const successPayment = order.payment?.find((p) => p.status === 'PAID');
  const payment = successPayment || order.payment?.[0];
  const paymentStatus = payment?.status;
  const paymentMethod = payment?.method;
  const statusBadge = getPaymentStatusBadge(paymentStatus);
  const isPending = !paymentStatus || paymentStatus === 'PENDING';
  const isPaid = paymentStatus === 'PAID';
  const isDisabled = paymentStatus === 'FAILED' || paymentStatus === 'EXPIRED';

  return (
    <tr
      key={order.id}
      className='transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40'
    >
      <td className='px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300'>
        <span className='font-mono'>
          {generateTransactionId(index, order.id)}
        </span>
      </td>
      <td className='px-6 py-4'>
        <Link
          href={`/dashboard/orders/${order.id}`}
          className='text-sm font-medium text-blue-500 transition-colors hover:text-blue-400 hover:underline'
        >
          {order.id.slice(0, 12).toUpperCase()}
        </Link>
      </td>
      <td className='px-6 py-4 text-sm text-slate-500 dark:text-slate-400'>
        {formatDate(order.created_at)}
      </td>
      <td className='px-6 py-4 text-right text-sm font-bold text-slate-900 dark:text-white'>
        {formatCurrency(order.price_total || 0)}
      </td>
      <td className='px-6 py-4 text-sm text-slate-500 dark:text-slate-400'>
        {getMethodLabel(paymentMethod)}
      </td>
      <td className='px-6 py-4 text-center'>
        <PaymentStatusBadge statusBadge={statusBadge} />
      </td>
      <td className='px-6 py-4 text-center'>
        <ActionButton
          isPending={isPending && !isPaid}
          isDisabled={isDisabled}
          orderId={order.id}
        />
      </td>
    </tr>
  );
}
