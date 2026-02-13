'use client';

import { RefreshCw, AlertCircle } from 'lucide-react';
import { useAttendanceReport } from '@/src/hooks/use-staff-attendance-report';
import { SummaryCards } from '@/src/components/staff-attendance/summary-cards';
import { FilterBar } from '@/src/components/staff-attendance/filter-bar';
import { AttendanceTable } from '@/src/components/staff-attendance/attendance-table';

export default function StaffAttendanceView() {
  const {
    records,
    isLoading,
    date,
    setDate,
    staffType,
    setStaffType,
    refetch,
    stats,
    error,
  } = useAttendanceReport();

  return (
    <div className='min-h-full bg-slate-50 px-4 py-6 md:px-10 dark:bg-[#101922]'>
      <div className='mx-auto max-w-300'>
        {/* Header */}
        <div className='mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-slate-900 dark:text-white'>
              Laporan Kehadiran
            </h1>
            <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
              Pantau kehadiran staff outlet Anda
            </p>
          </div>
          <button
            onClick={refetch}
            className='flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:border-blue-500/50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-[#0a7ff5]/50 dark:hover:text-white'
          >
            <RefreshCw className='h-4 w-4' />
            Refresh
          </button>
        </div>

        {error && (
          <div className='mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400'>
            <div className='flex items-center gap-2'>
              <AlertCircle className='h-5 w-5' />
              <p className='text-sm font-medium'>{error}</p>
            </div>
          </div>
        )}

        <SummaryCards
          total={stats.total}
          present={stats.present}
          late={stats.late}
          absent={stats.absent}
        />

        <FilterBar
          date={date}
          onDateChange={setDate}
          staffType={staffType}
          onStaffTypeChange={setStaffType}
        />

        <AttendanceTable records={records} isLoading={isLoading} />
      </div>
    </div>
  );
}
