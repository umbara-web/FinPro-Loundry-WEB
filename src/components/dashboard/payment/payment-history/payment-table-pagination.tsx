'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaymentTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function PaymentTablePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaymentTablePaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display (max 5 visible)
  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisible / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className='flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row dark:border-slate-700 dark:bg-slate-800/30'>
      <p className='text-xs text-slate-500'>
        Menampilkan{' '}
        <span className='font-semibold text-slate-700 dark:text-slate-300'>
          {endItem}
        </span>{' '}
        dari{' '}
        <span className='font-semibold text-slate-700 dark:text-slate-300'>
          {totalItems}
        </span>{' '}
        transaksi
      </p>

      <div className='flex items-center gap-2'>
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent dark:border-slate-700 dark:hover:bg-slate-800'
        >
          <ChevronLeft className='h-5 w-5' />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 rounded-xl text-xs font-bold transition-all ${
              currentPage === page
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'border border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-100 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent dark:border-slate-700 dark:hover:bg-slate-800'
        >
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}
