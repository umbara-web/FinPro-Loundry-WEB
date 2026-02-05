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

export function TaskQueueCard({ task, isActive, onClick, isPoolTask = false }: TaskQueueCardProps) {
  const isInProgress = task.status === 'IN_PROGRESS';

  return (
    <div
      onClick={onClick}
      className={clsx(
        'cursor-pointer rounded-xl border p-4 transition-all',
        'bg-[var(--color-station-surface)]',
        isActive
          ? 'border-[var(--color-station-primary)]/50 shadow-[0_0_15px_rgba(10,127,245,0.15)]'
          : 'border-transparent opacity-80 hover:border-[var(--color-station-border-hover)] hover:opacity-100'
      )}
    >
      {/* Header: Status Badge & Estimated Time */}
      <div className="mb-3 flex items-start justify-between">
        <span
          className={clsx(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold',
            isInProgress
              ? 'border-[var(--color-station-blue)]/20 bg-[var(--color-station-blue)]/20 text-[var(--color-station-blue)]'
              : 'border-[var(--color-station-yellow)]/20 bg-[var(--color-station-yellow)]/10 text-[var(--color-station-yellow)]'
          )}
        >
          {isInProgress && (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-station-blue)]" />
          )}
          {isInProgress ? 'Sedang Diproses' : 'Menunggu'}
        </span>
        <span className="text-xs text-[var(--color-station-text-muted)]">
          Est: {task.estimatedTime}
        </span>
      </div>

      {/* Customer Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        {task.customerAvatar ? (
          <div
            className={clsx(
              'h-12 w-12 shrink-0 rounded-full bg-slate-700 bg-cover bg-center',
              isActive && 'border-2 border-[var(--color-station-primary)]/30'
            )}
            style={{ backgroundImage: `url('${task.customerAvatar}')` }}
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-700 text-lg font-bold text-white">
            {task.customerName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-white">
            #{task.invoiceNumber}
          </h3>
          <p className="text-sm text-[var(--color-station-text-muted)]">
            {task.customerName}
          </p>
        </div>
      </div>

      {/* Details: Weight & Service Type */}
      <div className="mt-4 flex items-center gap-4 text-sm text-[var(--color-station-text-muted)]">
        <div
          className={clsx(
            'flex items-center gap-1.5',
            isActive && 'rounded-lg bg-[var(--color-station-bg)] px-3 py-1.5'
          )}
        >
          <Scale className="h-4 w-4" />
          <span className={clsx(isActive && 'font-medium text-white')}>
            {task.weight} kg
          </span>
        </div>
        {isActive && (
          <div className="flex items-center gap-1.5 rounded-lg bg-[var(--color-station-bg)] px-3 py-1.5">
            <Shirt className="h-4 w-4" />
            <span className="font-medium text-white">{task.serviceType}</span>
          </div>
        )}
      </div>
    </div>
  );
}
