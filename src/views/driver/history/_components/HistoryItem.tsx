import { useRouter } from 'next/navigation';
import { ChevronRight, Truck, Package } from 'lucide-react';
import clsx from 'clsx';
import { DriverJobHistory } from '@/src/types/driver';
import { formatDate } from '../_utils';

interface HistoryItemProps {
  job: DriverJobHistory;
}

export const HistoryItem = ({ job }: HistoryItemProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(
          job.type === 'PICKUP'
            ? `/driver-pickup/${job.id}`
            : `/driver-delivery/${job.id}`
        )
      }
      className='group grid cursor-pointer grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-500/50 dark:border-slate-700 dark:bg-[#1a2632]'
    >
      <div
        className={clsx(
          'flex h-12 w-12 items-center justify-center rounded-full',
          job.type === 'DELIVERY'
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
            : 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'
        )}
      >
        {job.type === 'DELIVERY' ? (
          <Truck className='h-5 w-5' />
        ) : (
          <Package className='h-5 w-5' />
        )}
      </div>
      <div className='flex min-w-0 flex-col'>
        <div className='flex items-center gap-2'>
          <h3 className='text-lg font-bold'>#{job.order_number}</h3>
          <span
            className={clsx(
              'rounded px-2 py-0.5 text-[10px] font-black tracking-widest uppercase',
              job.type === 'DELIVERY'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
            )}
          >
            {job.type === 'DELIVERY' ? 'Antar' : 'Jemput'}
          </span>
        </div>
        <p className='truncate text-sm text-slate-500 dark:text-slate-400'>
          {job.customer_name} - {job.address}
        </p>
      </div>

      <div className='flex flex-col items-end'>
        <p className='text-xs font-medium tracking-tighter text-slate-500 uppercase dark:text-slate-400'>
          Waktu Selesai
        </p>
        <p className='text-sm font-semibold whitespace-nowrap text-slate-900 dark:text-slate-200'>
          {formatDate(job.completed_at)}
        </p>
      </div>

      <div className='flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-600 dark:text-emerald-400'>
        <span className='h-2 w-2 rounded-full bg-emerald-500' />
        <span className='text-xs font-bold tracking-wider uppercase'>
          {job.status}
        </span>
      </div>

      <ChevronRight className='h-5 w-5 text-slate-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-500' />
    </div>
  );
};
