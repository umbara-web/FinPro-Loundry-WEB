'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { useAttendanceHistory } from '@/src/hooks/use-attendance';
import {
  MobileBottomNav,
  AttendanceStatsCard,
  DateRangeFilter,
  Pagination,
  FullAttendanceTable,
  FullAttendanceRecord,
} from '@/src/components/shared/attendance';

const ITEMS_PER_PAGE = 5;

interface AttendanceHistoryViewProps {
  basePath?: string;
}

export function AttendanceHistoryView({ basePath = '/worker-attendance' }: AttendanceHistoryViewProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { data: historyData, isLoading } = useAttendanceHistory();
  const [currentPage, setCurrentPage] = useState(1);

  // Transform API data to display format
  const allRecords: FullAttendanceRecord[] = useMemo(() => {
    return (historyData?.data || []).map((record) => {
      const checkInDate = new Date(record.check_in_at);
      const checkOutDate = record.check_out_at ? new Date(record.check_out_at) : null;

      // Format date: "24 Mei 2024"
      const formattedDate = checkInDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      // Get day name: "Senin"
      const dayName = checkInDate.toLocaleDateString('id-ID', {
        weekday: 'long',
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
        dayName,
        checkInTime: formattedCheckIn,
        checkOutTime: formattedCheckOut,
        location: record.outlet?.name || 'Outlet Utama',
        status: isLate ? 'late' : 'on_time',
        isOvertime,
      } as FullAttendanceRecord;
    });
  }, [historyData]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = allRecords.length;
    const onTime = allRecords.filter((r) => r.status === 'on_time').length;
    const late = allRecords.filter((r) => r.status === 'late').length;
    const overtime = allRecords.filter((r) => r.isOvertime).length;
    return { total, onTime, late, overtime };
  }, [allRecords]);

  // Pagination
  const totalPages = Math.ceil(allRecords.length / ITEMS_PER_PAGE);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return allRecords.slice(start, end);
  }, [allRecords, currentPage]);

  // Date range (from first to last record, or current month)
  const dateRange = useMemo(() => {
    if (allRecords.length === 0) {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { start, end };
    }
    // Get dates from records
    const dates = (historyData?.data || []).map((r) => new Date(r.check_in_at));
    const start = new Date(Math.min(...dates.map((d) => d.getTime())));
    const end = new Date(Math.max(...dates.map((d) => d.getTime())));
    return { start, end };
  }, [allRecords, historyData]);

  const handleBack = () => {
    router.push(basePath);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-[#233648] bg-[#f6f7f8]/80 dark:bg-[#101922]/80 backdrop-blur-md px-4 md:px-10 lg:px-40 py-3">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center text-slate-600 dark:text-slate-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
              Riwayat Kehadiran Lengkap
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
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
                backgroundImage: user?.profile_picture_url
                  ? `url(${user.profile_picture_url})`
                  : undefined,
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 md:px-10 lg:px-40">
        <div className="w-full max-w-[1200px]">
          {/* Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Date Range Filter */}
            <div className="lg:col-span-4">
              <DateRangeFilter
                startDate={dateRange.start}
                endDate={dateRange.end}
              />
            </div>

            {/* Stats Cards */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <AttendanceStatsCard
                label="Total Hadir"
                value={stats.total}
                unit="Hari"
                variant="default"
              />
              <AttendanceStatsCard
                label="Tepat Waktu"
                value={stats.onTime}
                variant="success"
              />
              <AttendanceStatsCard
                label="Terlambat"
                value={stats.late}
                variant="danger"
              />
              <AttendanceStatsCard
                label="Lembur"
                value={stats.overtime}
                variant="primary"
              />
            </div>
          </div>

          {/* Full Attendance Table */}
          <div className="w-full">
            <FullAttendanceTable
              records={paginatedRecords}
              isLoading={isLoading}
            />

            {/* Pagination */}
            {!isLoading && allRecords.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={allRecords.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

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
