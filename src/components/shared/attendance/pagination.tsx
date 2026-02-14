'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className='flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/30'>
      <p className='hidden text-sm text-slate-500 sm:block dark:text-slate-400'>
        Menampilkan {startItem}-{endItem} dari {totalItems} data
      </p>
      <div className='flex items-center gap-1'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='p-2 text-slate-400 transition-colors hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:text-white'
        >
          <ChevronLeft className='h-5 w-5' />
        </button>

        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={clsx(
                'h-8 w-8 rounded-lg text-sm font-medium transition-colors',
                currentPage === page
                  ? 'bg-[#137fec] font-bold text-white'
                  : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'
              )}
            >
              {page}
            </button>
          ) : (
            <span key={index} className='px-1 text-slate-400'>
              {page}
            </span>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='p-2 text-slate-400 transition-colors hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:text-white'
        >
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}
