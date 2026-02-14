'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
  dashboardPath?: string;
  profilePath?: string;
}

export function AttendanceHistoryView({
  basePath = '/worker-attendance',
  dashboardPath = '/worker-dashboard',
  profilePath = '/worker-profile',
}: AttendanceHistoryViewProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { data: historyData, isLoading } = useAttendanceHistory();
  const [currentPage, setCurrentPage] = useState(1);

  const allRecords: FullAttendanceRecord[] = useMemo(() => {
    return (historyData?.data || []).map((record) => {
      const checkInDate = new Date(record.check_in_at);
      const checkOutDate = record.check_out_at
        ? new Date(record.check_out_at)
        : null;

      const formattedDate = checkInDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const dayName = checkInDate.toLocaleDateString('id-ID', {
        weekday: 'long',
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

      const isLate =
        checkInDate.getHours() >= 8 && checkInDate.getMinutes() > 0;

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

  const stats = useMemo(() => {
    const total = allRecords.length;
    const onTime = allRecords.filter((r) => r.status === 'on_time').length;
    const late = allRecords.filter((r) => r.status === 'late').length;
    const overtime = allRecords.filter((r) => r.isOvertime).length;
    return { total, onTime, late, overtime };
  }, [allRecords]);

  const totalPages = Math.ceil(allRecords.length / ITEMS_PER_PAGE);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return allRecords.slice(start, end);
  }, [allRecords, currentPage]);

  const dateRange = useMemo(() => {
    if (allRecords.length === 0) {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { start, end };
    }

    const dates = (historyData?.data || []).map((r) => new Date(r.check_in_at));
    const start = new Date(Math.min(...dates.map((d) => d.getTime())));
    const end = new Date(Math.max(...dates.map((d) => d.getTime())));
    return { start, end };
  }, [allRecords, historyData]);

  const handleBack = () => {
    router.push(basePath);
  };

  return (
    <div className='flex h-full flex-col overflow-hidden bg-[#f6f7f8] dark:bg-[#101922]'>
      {/* Header (Back Button Only) */}
      <div className='flex-none px-6 py-4'>
        <button
          onClick={handleBack}
          className='-ml-2 flex items-center justify-center rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800'
        >
          <ArrowLeft className='h-5 w-5' />
          <span className='ml-2 font-medium'>Kembali</span>
        </button>
      </div>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto p-4 md:p-6 lg:p-8'>
        <div className='mx-auto w-full max-w-7xl space-y-6'>
          {/* Stats Section */}
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
            {/* Date Range Filter */}
            <div className='lg:col-span-4'>
              <DateRangeFilter
                startDate={dateRange.start}
                endDate={dateRange.end}
              />
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:col-span-8'>
              <AttendanceStatsCard
                label='Total Hadir'
                value={stats.total}
                unit='Hari'
                variant='default'
              />
              <AttendanceStatsCard
                label='Tepat Waktu'
                value={stats.onTime}
                variant='success'
              />
              <AttendanceStatsCard
                label='Terlambat'
                value={stats.late}
                variant='danger'
              />
              <AttendanceStatsCard
                label='Lembur'
                value={stats.overtime}
                variant='primary'
              />
            </div>
          </div>

          {/* Full Attendance Table */}
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

          {/* Footer */}
          <div className='mt-8 pb-20 text-center md:pb-0'>
            <p className='text-xs text-slate-500 dark:text-slate-500'>
              Laundry Web App © 2024
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        basePath={basePath}
        dashboardPath={dashboardPath}
        profilePath={profilePath}
      />
    </div>
  );
}
