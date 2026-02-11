'use client';

import { LogIn, LogOut, Info } from 'lucide-react';
import { useAttendanceStatus, useClockIn, useClockOut } from '@/src/hooks/use-attendance';
import { AttendanceStatusBadge } from './attendance-status-badge';
import clsx from 'clsx';

interface AttendanceActionCardProps {
  userName: string;
}

export function AttendanceActionCard({
  userName,
}: AttendanceActionCardProps) {
  const { data: statusData, isLoading } = useAttendanceStatus();
  const clockIn = useClockIn();
  const clockOut = useClockOut();

  const status = statusData?.data;
  const isClockedIn = status?.isClockedIn || false;

  const handleClockAction = () => {
    if (isClockedIn) {
      clockOut.mutate();
    } else {
      clockIn.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full mb-10">
        <div className="flex flex-col items-stretch justify-start rounded-xl shadow-xl bg-white dark:bg-[#1e293b] overflow-hidden border border-slate-200 dark:border-slate-800 animate-pulse">
          <div className="h-48 bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-10">
      <div className="flex flex-col items-stretch justify-start rounded-xl shadow-xl bg-white dark:bg-[#1e293b] overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row">
          {/* Left Decoration/Info Area */}
          <div className="w-full md:w-1/3 bg-[#137fec]/10 dark:bg-[#137fec]/5 p-8 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <div className="size-16 rounded-full bg-[#137fec]/20 flex items-center justify-center mb-4">
              <Info className="text-[#137fec] w-8 h-8" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">
              Status Shift
            </h3>
            <p className="text-slate-600 dark:text-[#92adc9] text-sm">
              Shift: {status?.shiftStart || '--:--'} - {status?.shiftEnd || '--:--'}
            </p>
            <p className="text-slate-600 dark:text-[#92adc9] text-sm">
              Lokasi: {status?.station || 'Unknown'}
            </p>
          </div>

          {/* Right Interaction Area */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="mb-2">
                  <AttendanceStatusBadge
                    variant={isClockedIn ? 'checked_in' : 'not_checked'}
                    pulse={!isClockedIn}
                  />
                </div>
                <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
                  Halo, {userName}!
                </h2>
                <p className="text-slate-600 dark:text-[#92adc9] text-base font-normal">
                  {isClockedIn
                    ? 'Anda sudah melakukan absensi masuk. Jangan lupa untuk absen pulang sebelum meninggalkan lokasi.'
                    : 'Anda belum melakukan absensi masuk untuk hari ini. Silakan tekan tombol di samping untuk memulai shift Anda.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleClockAction}
                  disabled={clockIn.isPending || clockOut.isPending}
                  className={clsx(
                    'flex min-w-[160px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-14 px-8 text-white text-base font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
                    isClockedIn
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-500/25'
                      : 'bg-[#137fec] hover:bg-blue-600 shadow-[#137fec]/25'
                  )}
                >
                  {isClockedIn ? (
                    <>
                      <LogOut className="h-6 w-6" />
                      <span className="truncate">Absen Pulang</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-6 w-6" />
                      <span className="truncate">Absen Masuk</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
