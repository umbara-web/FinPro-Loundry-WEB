'use client';

import { AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

interface ValidationAlertProps {
  title: string;
  message: string;
  onBypassRequest?: () => void;
  isLoading?: boolean;
}

export function ValidationAlert({
  title,
  message,
  onBypassRequest,
  isLoading = false,
}: ValidationAlertProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-start justify-between gap-4 rounded-xl border p-4 sm:flex-row sm:items-center',
        'border-red-400 bg-[var(--color-station-red)]',
        'shadow-[0_0_20px_rgba(239,68,68,0.2)]'
      )}
    >
      {/* Alert Content */}
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-white/20 p-2 text-white">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-base font-bold text-white">{title}</h4>
          <p className="mt-0.5 text-sm text-white/90">{message}</p>
        </div>
      </div>

      {/* Bypass Button */}
      {onBypassRequest && (
        <button
          onClick={onBypassRequest}
          disabled={isLoading}
          className={clsx(
            'shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition-colors',
            'bg-white text-[var(--color-station-red)] hover:bg-red-50',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {isLoading ? 'Loading...' : 'Request Bypass'}
        </button>
      )}
    </div>
  );
}
