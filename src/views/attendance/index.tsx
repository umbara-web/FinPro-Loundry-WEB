'use client';

import { ArrowLeft } from 'lucide-react';

import Link from 'next/link';
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
  profilePath = '/worker-profile'
}: AttendanceViewProps) {
  const router = useRouter();
  const { user } = useAuth();

  const { data: historyData, isLoading: historyLoading } = useAttendanceHistory();

  // Transform API data to display format
  const displayRecords: AttendanceHistoryRecord[] = (historyData?.data || []).map(
    (record) => {
      const checkInDate = new Date(record.check_in_at);
      const checkOutDate = record.check_out_at ? new Date(record.check_out_at) : null;

      // Format date: "Jumat, 21 Mei 2024"
      const formattedDate = checkInDate.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      // Format time: "07:55"
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

      // Determine if late (after 08:00)
      const isLate = checkInDate.getHours() >= 8 && checkInDate.getMinutes() > 0;

      // Determine if overtime (checkout after 17:00)
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
    }
  );

  const handleViewAllHistory = () => {
    router.push(`${basePath}/history`);
  };

  const userName = user?.name?.split(' ')[0] || 'Karyawan';

  return (
    <div className="flex h-full flex-col bg-[#f6f7f8] dark:bg-[#101922] overflow-hidden">
      {/* Simple Header for navigation context */}
      <header className="flex-none border-b border-slate-200 dark:border-[#233648] bg-white dark:bg-[#101922] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {backPath && (
              <button
                onClick={() => router.push(backPath)}
                className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
              >
                <ArrowLeft className="size-5" />
              </button>
            )}
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Absensi Kehadiran
            </h2>
          </div>

          <Link href={profilePath} className="group flex items-center gap-4 cursor-pointer">
            <div className="hidden sm:block text-right group-hover:opacity-80 transition-opacity">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                {user?.role || 'User'}
              </p>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#137fec]/20 bg-slate-200 dark:bg-slate-700 group-hover:border-[#137fec] transition-colors"
              style={{
                backgroundImage: user?.profile_picture_url
                  ? `url(${user.profile_picture_url})`
                  : undefined,
              }}
            />
          </Link>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          {/* Real-time Clock */}
          <RealTimeClock />

          {/* Action Card */}
          <AttendanceActionCard userName={userName} />

          {/* Attendance History */}
          <AttendanceHistoryTable
            records={displayRecords}
            isLoading={historyLoading}
            maxRows={5}
            showViewAll={true}
            onViewAll={handleViewAllHistory}
          />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 dark:text-slate-500 text-xs">
              Laundry Web App © 2024
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav basePath={basePath} dashboardPath={backPath} profilePath={profilePath} />
    </div>
  );
}
