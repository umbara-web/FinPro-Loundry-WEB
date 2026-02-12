
"use client";

import { RefreshCw } from "lucide-react";
import { useAttendance } from "./use-attendance";
import { SummaryCards } from "./components/summary-cards";
import { FilterBar } from "./components/filter-bar";
import { AttendanceTable } from "./components/attendance-table";

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
  } = useAttendance();

  return (
    <div className="min-h-full bg-[#101922] px-4 py-6 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Laporan Kehadiran</h1>
            <p className="text-sm text-[#8fadcc] mt-1">
              Pantau kehadiran staff outlet Anda
            </p>
          </div>
          <button
            onClick={refetch}
            className="flex items-center gap-2 rounded-lg bg-[#182634] border border-[#223649] px-4 py-2 text-sm font-medium text-[#8fadcc] hover:text-white hover:border-[#0a7ff5]/50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

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
