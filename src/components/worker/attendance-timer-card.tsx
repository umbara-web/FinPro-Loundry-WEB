'use client';

import { useState, useEffect } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { useAttendanceStatus, useClockIn, useClockOut } from '@/src/hooks/use-attendance';
import clsx from 'clsx';

export function AttendanceTimerCard() {
  const { data: statusData, isLoading } = useAttendanceStatus();
  const clockIn = useClockIn();
  const clockOut = useClockOut();
  const [elapsedTime, setElapsedTime] = useState(0);

  const status = statusData?.data;
  const isClockedIn = status?.isClockedIn || false;

  // Calculate elapsed time
  useEffect(() => {
    if (!status?.checkInTime || !isClockedIn) {
      setElapsedTime(0);
      return;
    }

    const checkInDate = new Date(status.checkInTime);
    const updateTimer = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - checkInDate.getTime()) / 1000);
      setElapsedTime(diff);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [status?.checkInTime, isClockedIn]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatLastShift = (dateStr: string | null) => {
    if (!dateStr) return 'No previous shift';
    const date = new Date(dateStr);
    return `Last shift ended at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  };

  const handleClockAction = () => {
    if (isClockedIn) {
      clockOut.mutate();
    } else {
      clockIn.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-[#151a1f] p-6 lg:p-8 shadow-sm border border-slate-100 dark:border-slate-800 animate-pulse">
        <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-[#151a1f] p-6 lg:p-8 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
      {/* Background Decoration */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/5 group-hover:bg-teal-500/10 transition-colors duration-500 blur-3xl"></div>
      
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 h-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={clsx(
                'px-2.5 py-0.5 rounded-full border text-xs font-bold uppercase tracking-wider',
                isClockedIn
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              )}
            >
              Status: {isClockedIn ? 'On Duty' : 'Off Duty'}
            </div>
          </div>
          <div className="font-mono text-5xl sm:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white tabular-nums">
            {formatTime(elapsedTime)}
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Shift duration recorded
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <button
            onClick={handleClockAction}
            disabled={clockIn.isPending || clockOut.isPending}
            className={clsx(
              'flex items-center justify-center gap-3 w-full sm:w-48 h-16 rounded-xl shadow-lg font-bold text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
              isClockedIn
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25'
                : 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/25'
            )}
          >
            {isClockedIn ? (
              <>
                <LogOut className="h-7 w-7" />
                Check Out
              </>
            ) : (
              <>
                <LogIn className="h-7 w-7" />
                Check In
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            {formatLastShift(status?.lastShiftEnd || null)}
          </p>
        </div>
      </div>
    </div>
  );
}
