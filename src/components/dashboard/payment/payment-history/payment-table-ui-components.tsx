'use client';

import { ChevronDown, ChevronUp, Receipt } from 'lucide-react';
import { BadgeStyle } from './payment-table-formatters';

// ============== UI COMPONENTS ==============

interface SortIndicatorProps {
  field: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export function SortIndicator({
  field,
  sortBy,
  sortOrder,
}: SortIndicatorProps) {
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

interface PaymentStatusBadgeProps {
  statusBadge: BadgeStyle;
}

export function PaymentStatusBadge({ statusBadge }: PaymentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}
    >
      {statusBadge.label}
    </span>
  );
}

export function LoadingState() {
  return (
    <div className='flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#101922]'>
      <div className='flex flex-col items-center gap-3'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent' />
        <p className='text-sm text-slate-500'>Memuat data...</p>
      </div>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className='flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#101922]'>
      <div className='flex flex-col items-center gap-3 text-slate-500'>
        <Receipt className='h-12 w-12 opacity-50' />
        <p className='text-sm'>Tidak ada riwayat pembayaran</p>
      </div>
    </div>
  );
}
