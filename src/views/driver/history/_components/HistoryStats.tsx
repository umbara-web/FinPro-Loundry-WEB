import { Package } from 'lucide-react';

interface HistoryStatsProps {
  totalJobs: number;
}

export const HistoryStats = ({ totalJobs }: HistoryStatsProps) => {
  return (
    <div className='mb-8 flex flex-wrap gap-4'>
      <div className='flex min-w-50 flex-1 flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-transparent'>
        <div className='flex items-center gap-2 text-slate-500 dark:text-slate-400'>
          <Package className='h-5 w-5' />
          <p className='text-sm font-medium'>Pekerjaan Selesai</p>
        </div>
        <p className='text-3xl font-bold tracking-tight'>{totalJobs}</p>
      </div>
    </div>
  );
};
