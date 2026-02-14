'use client';

import { LogIn, LogOut, Info } from 'lucide-react';
import {
  useAttendanceStatus,
  useClockIn,
  useClockOut,
} from '@/src/hooks/use-attendance';
import { AttendanceStatusBadge } from './attendance-status-badge';
import clsx from 'clsx';

interface AttendanceActionCardProps {
  userName: string;
}

export function AttendanceActionCard({ userName }: AttendanceActionCardProps) {
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
      <div className='mb-10 w-full'>
        <div className='flex animate-pulse flex-col items-stretch justify-start overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#1e293b]'>
          <div className='h-48 bg-slate-100 dark:bg-slate-800' />
        </div>
      </div>
    );
  }

  return (
    <div className='mb-10 w-full'>
      <div className='flex flex-col items-stretch justify-start overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#1e293b]'>
        <div className='flex flex-col md:flex-row'>
          {/* Left Decoration/Info Area */}
          <div className='flex w-full flex-col items-center justify-center border-b border-slate-200 bg-blue-50 p-8 text-center md:w-1/3 md:border-r md:border-b-0 dark:border-slate-800 dark:bg-blue-900/20'>
            <div className='mb-4 flex size-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30'>
              <Info className='h-8 w-8 text-blue-600 dark:text-blue-500' />
            </div>
            <h3 className='mb-1 text-lg font-bold text-slate-900 dark:text-white'>
              Status Shift
            </h3>
            <p className='text-sm text-slate-600 dark:text-[#92adc9]'>
              Shift: {status?.shiftStart || '--:--'} -{' '}
              {status?.shiftEnd || '--:--'}
            </p>
            <p className='text-sm text-slate-600 dark:text-[#92adc9]'>
              Lokasi: {status?.station || 'Unknown'}
            </p>
          </div>

          {/* Right Interaction Area */}
          <div className='flex flex-1 flex-col justify-center p-8'>
            <div className='flex flex-col justify-between gap-6 xl:flex-row xl:items-center'>
              <div className='space-y-2'>
                <div className='mb-2'>
                  <AttendanceStatusBadge
                    variant={isClockedIn ? 'checked_in' : 'not_checked'}
                    pulse={!isClockedIn}
                  />
                </div>
                <h2 className='text-2xl leading-tight font-bold text-slate-900 dark:text-white'>
                  Halo, {userName}!
                </h2>
                <p className='text-base font-normal text-slate-600 dark:text-[#92adc9]'>
                  {isClockedIn
                    ? 'Anda sudah melakukan absensi masuk. Jangan lupa untuk absen pulang sebelum meninggalkan lokasi.'
                    : 'Anda belum melakukan absensi masuk untuk hari ini. Silakan tekan tombol di samping untuk memulai shift Anda.'}
                </p>
              </div>

              <div className='flex flex-col gap-3 sm:flex-row'>
                <button
                  onClick={handleClockAction}
                  disabled={clockIn.isPending || clockOut.isPending}
                  className={clsx(
                    'flex h-14 min-w-[160px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg px-8 text-base font-bold text-white shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
                    isClockedIn
                      ? 'bg-red-500 shadow-red-500/25 hover:bg-red-600'
                      : 'bg-blue-600 shadow-blue-600/25 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500'
                  )}
                >
                  {isClockedIn ? (
                    <>
                      <LogOut className='h-6 w-6' />
                      <span className='truncate'>Absen Pulang</span>
                    </>
                  ) : (
                    <>
                      <LogIn className='h-6 w-6' />
                      <span className='truncate'>Absen Masuk</span>
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
