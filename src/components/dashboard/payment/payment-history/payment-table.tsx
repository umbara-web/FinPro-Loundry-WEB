'use client';

import { Order } from '@/src/types/order';
import { ChevronDown, ChevronUp, Receipt } from 'lucide-react';
import Link from 'next/link';

interface PaymentTableProps {
  orders: Order[];
  isLoading?: boolean;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

/** Format number to Indonesian Rupiah */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format date to Indonesian locale */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Get payment status badge styling based on Payment_Status enum */
function getPaymentStatusBadge(paymentStatus: string | undefined) {
  const statusMap: Record<
    string,
    { label: string; bg: string; text: string; border: string }
  > = {
    PAID: {
      label: 'Berhasil',
      bg: 'bg-green-500/10',
      text: 'text-green-400',
      border: 'border-green-500/20',
    },
    PENDING: {
      label: 'Menunggu',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/20',
    },
    FAILED: {
      label: 'Gagal',
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      border: 'border-red-500/20',
    },
    EXPIRED: {
      label: 'Kadaluwarsa',
      bg: 'bg-slate-500/10',
      text: 'text-slate-400',
      border: 'border-slate-500/20',
    },
    REFUNDED: {
      label: 'Dikembalikan',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/20',
    },
  };

  // Default to PENDING if no payment status found
  const status = paymentStatus || 'PENDING';
  return (
    statusMap[status] || {
      label: 'Menunggu',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/20',
    }
  );
}

/** Sort indicator component */
function SortIndicator({
  field,
  sortBy,
  sortOrder,
}: {
  field: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}) {
  const isActive = sortBy === field;
  return (
    <div className='flex flex-col leading-[0.5]'>
      <ChevronUp
        className={`h-3.5 w-3.5 ${isActive && sortOrder === 'asc' ? 'opacity-100' : 'opacity-30'}`}
      />
      <ChevronDown
        className={`h-3.5 w-3.5 ${isActive && sortOrder === 'desc' ? 'opacity-100' : 'opacity-30'}`}
      />
    </div>
  );
}

export function PaymentTable({
  orders,
  isLoading,
  sortBy,
  sortOrder,
  onSort,
}: PaymentTableProps) {
  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#101922]'>
        <div className='flex flex-col items-center gap-3'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent' />
          <p className='text-sm text-slate-500'>Memuat data...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className='flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#101922]'>
        <div className='flex flex-col items-center gap-3 text-slate-500'>
          <Receipt className='h-12 w-12 opacity-50' />
          <p className='text-sm'>Tidak ada riwayat pembayaran</p>
        </div>
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#101922]'>
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50'>
              <th className='px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase'>
                ID Transaksi
              </th>
              <th className='px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase'>
                No. Pesanan
              </th>
              <th
                className='cursor-pointer px-6 py-5 transition-colors select-none hover:bg-slate-100 dark:hover:bg-slate-800'
                onClick={() => onSort('created_at')}
              >
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
              <th
                className='cursor-pointer px-6 py-5 transition-colors select-none hover:bg-slate-100 dark:hover:bg-slate-800'
                onClick={() => onSort('price_total')}
              >
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
              <th className='px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase'>
                Metode
              </th>
              <th className='px-6 py-5 text-center text-xs font-bold tracking-widest text-slate-500 uppercase'>
                Status
              </th>
              <th className='px-6 py-5 text-center text-xs font-bold tracking-widest text-slate-500 uppercase'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200 dark:divide-slate-700'>
            {orders.map((order) => {
              // Get payment status from the first payment record
              const paymentStatus = order.payment?.[0]?.status;
              const statusBadge = getPaymentStatusBadge(paymentStatus);
              const isInvoiceDisabled =
                paymentStatus === 'FAILED' || paymentStatus === 'EXPIRED';

              return (
                <tr
                  key={order.id}
                  className='transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40'
                >
                  <td className='px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300'>
                    TXN-{order.id.slice(-5).toUpperCase()}
                  </td>
                  <td className='px-6 py-4 text-sm font-medium text-blue-500'>
                    #{order.pickup_request_id?.slice(-8).toUpperCase() || '-'}
                  </td>
                  <td className='px-6 py-4 text-sm text-slate-500 dark:text-slate-400'>
                    {formatDate(order.created_at)}
                  </td>
                  <td className='px-6 py-4 text-right text-sm font-bold text-slate-900 dark:text-white'>
                    {formatCurrency(order.price_total || 0)}
                  </td>
                  <td className='px-6 py-4 text-sm text-slate-500 dark:text-slate-400'>
                    {order.payment?.[0]?.method || 'Transfer Bank'}
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}
                    >
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    {isInvoiceDisabled ? (
                      <button
                        disabled
                        className='inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-1.5 text-[11px] font-bold text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-600'
                      >
                        <Receipt className='h-4 w-4' />
                        Invoice
                      </button>
                    ) : (
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className='inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[11px] font-bold text-blue-500 transition-all hover:bg-blue-500 hover:text-white'
                      >
                        <Receipt className='h-4 w-4' />
                        Invoice
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
