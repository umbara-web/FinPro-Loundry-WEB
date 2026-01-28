'use client';

import { CheckCircle, Save } from 'lucide-react';
import clsx from 'clsx';

interface ActionBarProps {
  progress: number; // 0-100
  progressLabel: string;
  onSaveDraft?: () => void;
  onComplete: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export function ActionBar({
  progress,
  progressLabel,
  onSaveDraft,
  onComplete,
  isLoading = false,
  isDisabled = false,
}: ActionBarProps) {
  return (
    <div
      className={clsx(
        'absolute bottom-0 z-20 flex w-full items-center justify-between border-t p-6',
        'border-[--color-station-border] bg-[--color-station-surface]',
        'shadow-[0_-10px_40px_rgba(0,0,0,0.4)]'
      )}
    >
      {/* Progress Indicator */}
      <div className="flex flex-col">
        <span className="text-sm text-[--color-station-text-muted]">
          Progress
        </span>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-[--color-station-bg]">
            <div
              className={clsx(
                'h-full rounded-full transition-all duration-300',
                progress >= 100
                  ? 'bg-[--color-station-green]'
                  : 'bg-[--color-station-yellow]'
              )}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="text-xs font-bold text-white">{progressLabel}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {/* Save Draft Button */}
        {onSaveDraft && (
          <button
            onClick={onSaveDraft}
            disabled={isLoading}
            className={clsx(
              'hidden h-12 items-center justify-center gap-2 rounded-lg border px-6 font-medium transition-colors sm:flex',
              'border-[--color-station-border] bg-transparent text-white',
              'hover:bg-[--color-station-border]',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            <Save className="h-4 w-4" />
            Simpan Draft
          </button>
        )}

        {/* Complete Button */}
        <button
          onClick={onComplete}
          disabled={isLoading || isDisabled}
          className={clsx(
            'flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-lg px-8 text-base font-bold transition-all',
            'bg-[--color-station-primary] text-white shadow-lg shadow-blue-500/25',
            'hover:scale-[1.02] hover:bg-blue-600 active:scale-95',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
          )}
        >
          {isLoading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5" />
              Selesai
            </>
          )}
        </button>
      </div>
    </div>
  );
}
