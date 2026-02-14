'use client';

import { Calendar, Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { RotateCcw } from 'lucide-react';

interface PaymentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onResetFilters: () => void;
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
  onResetFilters,
}: PaymentFiltersProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Close dropdown detection
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelectClick = () => {
    setIsSelectOpen((prev) => !prev);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value);
    setIsSelectOpen(false);
  };

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

        {/* Search - auto search on typing */}
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
              className='h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white dark:placeholder:text-slate-600'
            />
          </div>
        </div>

        {/* Status with arrow icon */}
        <div className='space-y-2'>
          <label className='ml-1 block text-xs font-bold tracking-widest text-slate-500 uppercase'>
            Status Pembayaran
          </label>
          <div className='relative'>
            <select
              ref={selectRef}
              value={status}
              onClick={handleSelectClick}
              onBlur={() => setIsSelectOpen(false)}
              onChange={handleSelectChange}
              className='h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm text-slate-900 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white'
            >
              <option value='all'>Semua Status</option>
              <option value='PAID'>Berhasil</option>
              <option value='PENDING'>Menunggu</option>
              <option value='FAILED'>Gagal</option>
              <option value='EXPIRED'>Kadaluwarsa</option>
              <option value='REFUNDED'>Dikembalikan</option>
            </select>
            <IoChevronDown
              className={`pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400 transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        </div>

        {/* Reset Filter button (replaces Filter + X) */}
        <div className='flex gap-2'>
          <button
            onClick={onResetFilters}
            className='group flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-500 px-2 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 active:scale-95'
          >
            <RotateCcw className='h-4 w-4 transition-transform duration-300 group-active:-rotate-180' />
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
}
