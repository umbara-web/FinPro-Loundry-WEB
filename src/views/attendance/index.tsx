'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { useAttendanceHistory } from '@/src/hooks/use-attendance';
import {
  RealTimeClock,
  AttendanceActionCard,
  AttendanceHistoryTable,
  MobileBottomNav,
  AttendanceHistoryRecord,
} from '@/src/components/shared/attendance';

interface AttendanceViewProps {
  basePath?: string;
  backPath?: string;
  profilePath?: string;
}

export function AttendanceView({
  basePath = '/worker-attendance',
  backPath,
  profilePath = '/worker-profile',
}: AttendanceViewProps) {
  const router = useRouter();
  const { user } = useAuth();

  const {
    data: historyData,
    isLoading: historyLoading,
    isError,
    refetch,
  } = useAttendanceHistory();

  const displayRecords: AttendanceHistoryRecord[] = (
    historyData?.data || []
  ).map((record) => {
    const checkInDate = new Date(record.check_in_at);
    const checkOutDate = record.check_out_at
      ? new Date(record.check_out_at)
      : null;

    const formattedDate = checkInDate.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const formattedCheckIn = checkInDate.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const formattedCheckOut = checkOutDate
      ? checkOutDate.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      : null;

    const isLate = checkInDate.getHours() >= 8 && checkInDate.getMinutes() > 0;

    const isOvertime = checkOutDate
      ? checkOutDate.getHours() >= 17 && checkOutDate.getMinutes() > 0
      : false;

    return {
      id: record.id,
      date: formattedDate,
      checkInTime: formattedCheckIn,
      checkOutTime: formattedCheckOut,
      status: isLate ? 'late' : 'on_time',
      isOvertime,
    } as AttendanceHistoryRecord;
  });

  const handleViewAllHistory = () => {
    router.push(`${basePath}/history`);
  };

  const userName = user?.name?.split(' ')[0] || 'Karyawan';

  return (
    <div className='flex h-full flex-col overflow-hidden bg-slate-50 dark:bg-[#101922]'>
      {/* Main Content - Scrollable */}
      <main className='flex-1 overflow-y-auto p-4 md:p-6 lg:p-8'>
        <div className='mx-auto w-full max-w-5xl space-y-6'>
          {/* Real-time Clock */}
          <RealTimeClock />

          {/* Action Card */}
          <AttendanceActionCard userName={userName} />

          {/* Attendance History */}
          {isError ? (
            <div className='flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-8 dark:border-red-900/20 dark:bg-red-900/10'>
              <p className='mb-4 font-medium text-red-600 dark:text-red-400'>
                Gagal memuat riwayat absensi
              </p>
              <button
                onClick={() => refetch()}
                className='rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30'
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <AttendanceHistoryTable
              records={displayRecords}
              isLoading={historyLoading}
              maxRows={5}
              showViewAll={true}
              onViewAll={handleViewAllHistory}
            />
          )}

          {/* Footer */}
          <div className='mt-8 text-center'>
            <p className='text-xs text-slate-500 dark:text-slate-400'>
              Laundry Web App © 2024
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        basePath={basePath}
        dashboardPath={backPath}
        profilePath={profilePath}
      />
    </div>
  );
}
