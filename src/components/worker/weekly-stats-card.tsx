'use client';

import { CalendarRange } from 'lucide-react';
import { useAttendanceStatus } from '@/src/hooks/use-attendance';

export function WeeklyStatsCard() {
  const { data: statusData, isLoading } = useAttendanceStatus();
  const weeklyHours = statusData?.data?.weeklyHours || 0;
  const targetHours = 40;
  const percentComplete = Math.min((weeklyHours / targetHours) * 100, 100);

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#233648] p-5 shadow-sm border border-slate-100 dark:border-slate-800 animate-pulse">
        <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-[#233648] p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
          <CalendarRange className="h-5 w-5" />
        </div>
        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
          Weekly Total
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">
          {weeklyHours}
        </span>
        <span className="text-sm font-medium text-slate-500">hrs</span>
      </div>
      <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
        <div
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${percentComplete}%` }}
        ></div>
      </div>
    </div>
  );
}
