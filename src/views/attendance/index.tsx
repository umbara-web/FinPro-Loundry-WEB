'use client';

import { ArrowLeft } from 'lucide-react';

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
}

export function AttendanceView({ basePath = '/worker-attendance', backPath }: AttendanceViewProps) {
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
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-[#233648] bg-[#f6f7f8]/80 dark:bg-[#101922]/80 backdrop-blur-md px-4 md:px-10 lg:px-40 py-3">
        <div className="flex items-center justify-between max-w-[960px] mx-auto">
          <div className="flex items-center gap-4 text-[#137fec]">
            {backPath && (
               <button 
                 onClick={() => router.push(backPath)} 
                 className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
               >
                 <ArrowLeft className="size-5" />
               </button>
            )}
            <div className="size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
              Absensi Kehadiran
            </h2>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                {user?.role || 'Worker'}
              </p>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#137fec]/20 bg-slate-200 dark:bg-slate-700"
              style={{
                backgroundImage: user?.profile_picture_url ? `url(${user.profile_picture_url})` : undefined,
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 md:px-10 lg:px-40">
        <div className="w-full max-w-[960px]">
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
          <div className="mt-12 text-center">
            <p className="text-slate-500 dark:text-slate-500 text-xs">
              Laundry Web App © 2024
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
