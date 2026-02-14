import { Calendar } from 'lucide-react';

interface DateRangeFilterProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange?: (date: Date) => void;
  onEndDateChange?: (date: Date) => void;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export function DateRangeFilter({ startDate, endDate }: DateRangeFilterProps) {
  return (
    <div className='flex h-full flex-col justify-center rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#1e293b]'>
      <label className='mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400'>
        Periode Waktu
      </label>
      <div className='flex items-center gap-2 text-sm'>
        <div className='flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900/50'>
          <Calendar className='h-4 w-4 text-slate-400' />
          <span className='text-slate-700 dark:text-slate-300'>
            {formatDate(startDate)}
          </span>
        </div>
        <span className='text-slate-400'>-</span>
        <div className='flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900/50'>
          <Calendar className='h-4 w-4 text-slate-400' />
          <span className='text-slate-700 dark:text-slate-300'>
            {formatDate(endDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
