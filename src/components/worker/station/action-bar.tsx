'use client';

import { CheckCircle, Save, AlertTriangle, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface ActionBarProps {
  currentCount: number;
  targetCount: number;
  hasMismatch?: boolean;
  onSaveDraft?: () => void;
  onResetAll?: () => void;
  onComplete: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: 'primary' | 'warning';
  actionLabel?: string;
  message?: ReactNode;
}

export function ActionBar({
  currentCount,
  targetCount,
  hasMismatch = false,
  onSaveDraft,
  onResetAll,
  onComplete,
  isLoading = false,
  isDisabled = false,
  variant = 'primary',
  actionLabel,
  message,
}: ActionBarProps) {
  const isWarning = variant === 'warning';
  const buttonLabel = actionLabel || (isWarning ? 'Request Bypass' : 'Selesai');

  const totalScale = Math.max(currentCount, targetCount, 1);
  const validPercentage =
    (Math.min(currentCount, targetCount) / totalScale) * 100;
  const excessPercentage =
    (Math.max(0, currentCount - targetCount) / totalScale) * 100;

  const isComplete =
    currentCount === targetCount && targetCount > 0 && !hasMismatch;
  const isExcess = currentCount > targetCount;
  const progressLabel = isComplete
    ? 'Complete!'
    : isExcess
      ? `Lebih ${currentCount - targetCount} item`
      : `${currentCount} / ${targetCount}`;

  return (
    <div
      className={clsx(
        'absolute bottom-0 z-20 flex w-full flex-col border-t p-4 md:p-6',
        'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800',
        'shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.4)]'
      )}
    >
      {/* Alert Message Row (if present) */}
      {message && (
        <div
          className={clsx(
            'mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
            isWarning
              ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
              : 'bg-red-500/10 text-red-600 dark:text-red-400'
          )}
        >
          <AlertTriangle className='h-4 w-4 shrink-0' />
          <span>{message}</span>
        </div>
      )}

      {/* Main Row: Progress + Buttons */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        {/* Progress Indicator */}
        <div className='flex w-full flex-col md:w-auto'>
          <span className='text-sm text-slate-500 dark:text-slate-400'>
            Progress
          </span>
          <div className='mt-1 flex items-center gap-2'>
            <div className='flex h-2 flex-1 overflow-hidden rounded-full bg-slate-100 md:w-32 dark:bg-slate-700'>
              {/* Valid segment */}
              <div
                className={clsx(
                  'h-full transition-all duration-300',
                  isComplete
                    ? 'bg-emerald-500'
                    : 'bg-blue-600'
                )}
                style={{ width: `${validPercentage}%` }}
              />
              {/* Excess segment */}
              {excessPercentage > 0 && (
                <div
                  className='h-full bg-red-500 transition-all duration-300'
                  style={{ width: `${excessPercentage}%` }}
                />
              )}
            </div>
            <span
              className={clsx(
                'text-xs font-bold whitespace-nowrap',
                isExcess ? 'text-red-500 dark:text-red-400' : 'text-slate-900 dark:text-white'
              )}
            >
              {progressLabel}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex w-full gap-3 md:w-auto'>
          {/* Reset All Button */}
          {onResetAll && (
            <button
              onClick={onResetAll}
              disabled={isLoading || currentCount === 0}
              className={clsx(
                'flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border px-4 font-medium transition-colors md:flex-none',
                'border-slate-200 bg-transparent dark:border-slate-700',
                currentCount === 0
                  ? 'cursor-not-allowed text-slate-300 dark:text-slate-600'
                  : 'text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
              title='Reset semua item ke 0'
            >
              <RotateCcw className='h-4 w-4' />
              <span className='hidden sm:inline'>Reset</span>
            </button>
          )}

          {/* Save Draft Button */}
          {onSaveDraft && (
            <button
              onClick={onSaveDraft}
              disabled={isLoading}
              className={clsx(
                'hidden h-12 items-center justify-center gap-2 rounded-lg border px-6 font-medium transition-colors sm:flex',
                'border-slate-200 bg-transparent text-slate-700 dark:border-slate-700 dark:text-white',
                'hover:bg-slate-50 dark:hover:bg-slate-700',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              <Save className='h-4 w-4' />
              Simpan Draft
            </button>
          )}

          {/* Primary/Warning Action Button */}
          <button
            onClick={onComplete}
            disabled={isLoading || isDisabled}
            className={clsx(
              'flex h-12 min-w-0 flex-2 items-center justify-center gap-2 rounded-lg px-6 text-base font-bold transition-all md:min-w-40 md:flex-none',
              isWarning
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/25 hover:bg-yellow-300'
                : 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700',
              'hover:scale-[1.02] active:scale-95',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
            )}
          >
            {isLoading ? (
              <>
                <div className='h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent' />
                Processing...
              </>
            ) : (
              <>
                {isWarning ? (
                  <AlertTriangle className='h-5 w-5' />
                ) : (
                  <CheckCircle className='h-5 w-5' />
                )}
                <span className='truncate'>{buttonLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
