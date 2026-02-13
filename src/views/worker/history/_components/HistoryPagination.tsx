import { ArrowLeft, ChevronRight } from 'lucide-react';

interface HistoryPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const HistoryPagination = ({
  page,
  totalPages,
  onPageChange,
}: HistoryPaginationProps) => {
  return (
    <div className='mt-10 flex items-center justify-between border-t border-slate-200 pt-6 pb-12 dark:border-slate-800'>
      <button
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-blue-400'
      >
        <ArrowLeft className='h-4 w-4' />
        Sebelumnya
      </button>
      <div className='flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400'>
        <span>Halaman</span>
        <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white'>
          {page}
        </span>
        <span>dari {totalPages}</span>
      </div>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-blue-400'
      >
        Selanjutnya
        <ChevronRight className='h-4 w-4' />
      </button>
    </div>
  );
};
