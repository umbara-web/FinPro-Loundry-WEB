import Link from 'next/link';
import { ChevronRight, Package } from 'lucide-react';
import clsx from 'clsx';
import { WorkerJobHistory } from '../_types';
import {
  formatDate,
  getTaskTypeLabel,
  getTaskTypeColor,
} from '../_utils/formatters';

interface HistoryItemProps {
  job: WorkerJobHistory;
}

export const HistoryItem = ({ job }: HistoryItemProps) => {
  return (
    <Link
      href={`/worker-history/${job.id}`}
      className='group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-500/50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500/50'
    >
      <div className='flex min-w-70 items-center gap-4'>
        <div
          className={clsx(
            'flex h-12 w-12 items-center justify-center rounded-full',
            getTaskTypeColor(job.taskType)
          )}
        >
          <Package className='h-5 w-5' />
        </div>
        <div className='flex flex-col'>
          <div className='flex items-center gap-2'>
            <h3 className='text-lg font-bold'>#{job.orderNumber}</h3>
            <span
              className={clsx(
                'rounded px-2 py-0.5 text-[10px] font-black tracking-widest uppercase',
                getTaskTypeColor(job.taskType)
              )}
            >
              {getTaskTypeLabel(job.taskType)}
            </span>
          </div>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            {job.customerName} - {job.itemCount} item
          </p>
        </div>
      </div>

      <div className='flex flex-col items-start md:items-center'>
        <p className='text-xs font-medium tracking-tighter text-slate-500 uppercase dark:text-slate-400'>
          Waktu Selesai
        </p>
        <p className='text-sm font-semibold text-slate-900 dark:text-slate-200'>
          {formatDate(job.completedAt)}
        </p>
      </div>

      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'>
          <span className='h-2 w-2 rounded-full bg-emerald-500' />
          <span className='text-xs font-bold tracking-wider uppercase'>
            Selesai
          </span>
        </div>
        <button className='text-slate-400 transition-colors hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400'>
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>
    </Link>
  );
};
