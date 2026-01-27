'use client';

import { Timer, TrendingDown, TrendingUp } from 'lucide-react';
import { useAttendanceStatus } from '@/src/hooks/use-attendance';

export function OvertimeCard() {
  const { data: statusData, isLoading } = useAttendanceStatus();
  const overtime = statusData?.data?.overtime || 0;
  const isWithinLimits = overtime <= 5;

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#151a1f] p-5 shadow-sm border border-slate-100 dark:border-slate-800 animate-pulse">
        <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-[#151a1f] p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
          <Timer className="h-5 w-5" />
        </div>
        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
          Overtime
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">
          {overtime}
        </span>
        <span className="text-sm font-medium text-slate-500">hrs</span>
      </div>
      <p
        className={`text-xs font-medium mt-1 flex items-center gap-1 ${
          isWithinLimits
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}
      >
        {isWithinLimits ? (
          <>
            <TrendingDown className="h-3.5 w-3.5" />
            Within limits
          </>
        ) : (
          <>
            <TrendingUp className="h-3.5 w-3.5" />
            Exceeds limit
          </>
        )}
      </p>
    </div>
  );
}
