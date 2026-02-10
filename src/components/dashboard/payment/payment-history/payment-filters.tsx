'use client';

import { Calendar, Search, Filter, X } from 'lucide-react';

interface PaymentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onFilter: () => void;
  onClearFilters: () => void;
}

export function PaymentFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onFilter,
  onClearFilters,
}: PaymentFiltersProps) {
  /** Handle Enter key on search input */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFilter();
    }
  };

  /** Check if any filter is active */
  const hasActiveFilters =
    search.trim() !== '' ||
    status !== 'all' ||
    dateFrom !== '' ||
    dateTo !== '';

  return (
    <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6 dark:border-slate-700 dark:bg-[#101922]'>
      <div className='grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-4'>
        {/* Date From */}
        <div className='space-y-2'>
          <label className='ml-1 block text-xs font-bold tracking-widest text-slate-500 uppercase'>
            Dari Tanggal
          </label>
          <div className='relative'>
            <Calendar className='pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400' />
            <input
              type='date'
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
              className='h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white dark:placeholder:text-slate-600'
            />
          </div>
        </div>

        {/* Date To */}
        <div className='space-y-2'>
          <label className='ml-1 block text-xs font-bold tracking-widest text-slate-500 uppercase'>
            Sampai Tanggal
          </label>
          <div className='relative'>
            <Calendar className='pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400' />
            <input
              type='date'
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
              className='h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white dark:placeholder:text-slate-600'
            />
          </div>
        </div>

        {/* Search */}
        <div className='space-y-2'>
          <label className='ml-1 block text-xs font-bold tracking-widest text-slate-500 uppercase'>
            Cari Transaksi
          </label>
          <div className='relative'>
            <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400' />
            <input
              type='text'
              placeholder='ID / No. Pesanan'
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className='h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white dark:placeholder:text-slate-600'
            />
          </div>
        </div>

        {/* Status */}
        <div className='space-y-2'>
          <label className='ml-1 block text-xs font-bold tracking-widest text-slate-500 uppercase'>
            Status Pembayaran
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className='h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white'
          >
            <option value='all'>Semua Status</option>
            <option value='PAID'>Berhasil</option>
            <option value='PENDING'>Menunggu</option>
            <option value='FAILED'>Gagal</option>
            <option value='EXPIRED'>Kadaluwarsa</option>
            <option value='REFUNDED'>Dikembalikan</option>
          </select>
        </div>

        {/* Filter Buttons */}
        <div className='flex gap-2'>
          <button
            onClick={onFilter}
            className='flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-500 px-2 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 active:scale-95'
          >
            <Filter className='h-4 w-4' />
            Filter
          </button>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className='flex h-10 cursor-pointer items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
              title='Hapus Filter'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
