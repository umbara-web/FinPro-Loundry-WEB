'use client';

import { Scale, Shirt } from 'lucide-react';
import { StationTask } from '@/src/types/station';
import clsx from 'clsx';

interface TaskQueueCardProps {
  task: StationTask;
  isActive: boolean;
  onClick: () => void;
  isPoolTask?: boolean;
}

export function TaskQueueCard({
  task,
  isActive,
  onClick,
  isPoolTask = false,
}: TaskQueueCardProps) {
  const isInProgress = task.status === 'IN_PROGRESS';
  const isNeedBypass = task.status === 'NEED_BYPASS';
  const isBypassRejected = isNeedBypass && task.bypassStatus === 'REJECTED';
  const isBypassPending = isNeedBypass && task.bypassStatus === 'PENDING';

  const getBadgeStyle = () => {
    if (isBypassRejected)
      return 'border-red-500/20 bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-300';
    if (isBypassPending)
      return 'border-orange-500/20 bg-orange-50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300';
    if (isInProgress)
      return 'border-blue-500/20 bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300';
    return 'border-yellow-500/20 bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400';
  };

  const getBadgeLabel = () => {
    if (isBypassRejected) return 'Bypass Ditolak';
    if (isBypassPending) return 'Menunggu Bypass';
    if (isInProgress) return 'Sedang Diproses';
    return 'Menunggu';
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'group cursor-pointer rounded-xl border p-4 transition-all duration-300',
        isActive
          ? 'border-blue-500 bg-blue-500 shadow-lg shadow-blue-500/20 dark:bg-blue-600'
          : 'border-slate-200 bg-white hover:border-blue-500/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500/30 dark:hover:bg-slate-700/50'
      )}
    >
      {/* Header: Status Badge & Estimated Time */}
      <div className='mb-3 flex items-start justify-between'>
        <span
          className={clsx(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold',
            isActive
              ? 'border-white/20 bg-white/20 text-white'
              : getBadgeStyle()
          )}
        >
          {(isInProgress || isBypassPending) && (
            <span
              className={clsx(
                'h-1.5 w-1.5 animate-pulse rounded-full',
                isBypassPending
                  ? 'bg-orange-600 dark:bg-orange-400'
                  : 'bg-blue-600 dark:bg-blue-400'
              )}
            />
          )}
          {isBypassRejected && (
            <span className='h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400' />
          )}
          {getBadgeLabel()}
        </span>
        <span
          className={clsx(
            'text-xs',
            isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
          )}
        >
          Est: {task.estimatedTime}
        </span>
      </div>

      {/* Customer Info */}
      <div className='flex items-center gap-4'>
        {/* Avatar */}
        {task.customerAvatar ? (
          <div
            className={clsx(
              'h-12 w-12 shrink-0 rounded-full bg-slate-200 bg-cover bg-center dark:bg-slate-700',
              isActive && 'border-2 border-white/30'
            )}
            style={{ backgroundImage: `url('${task.customerAvatar}')` }}
          />
        ) : (
          <div
            className={clsx(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold',
              isActive
                ? 'bg-white/20 text-white'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
            )}
          >
            {task.customerName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
        )}
        <div>
          <h3
            className={clsx(
              'text-base font-bold',
              isActive ? 'text-white' : 'text-slate-900 dark:text-white'
            )}
          >
            #{task.invoiceNumber}
          </h3>
          <p
            className={clsx(
              'text-sm',
              isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
            )}
          >
            {task.customerName}
          </p>
        </div>
      </div>

      {/* Details: Weight & Service Type */}
      <div className='mt-4 flex items-center gap-3 text-sm'>
        <div
          className={clsx(
            'flex items-center gap-1.5 rounded-lg px-3 py-1.5',
            isActive
              ? 'bg-white/10 text-white'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300'
          )}
        >
          <Scale
            className={clsx(
              'h-4 w-4',
              isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
            )}
          />
          <span className='font-medium'>{task.weight} kg</span>
        </div>

        <div
          className={clsx(
            'flex items-center gap-1.5 rounded-lg px-3 py-1.5',
            isActive
              ? 'bg-white/10 text-white'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300'
          )}
        >
          <Shirt
            className={clsx(
              'h-4 w-4',
              isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
            )}
          />
          <span className='font-medium'>{task.serviceType}</span>
        </div>
      </div>
    </div>
  );
}
