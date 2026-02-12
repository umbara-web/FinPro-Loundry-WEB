'use client';

import { ArrowRight } from 'lucide-react';
import { AttendanceStatusBadge, AttendanceStatusVariant } from './attendance-status-badge';

export interface AttendanceHistoryRecord {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: 'on_time' | 'late';
  isOvertime: boolean;
}

interface AttendanceHistoryTableProps {
  records: AttendanceHistoryRecord[];
  isLoading: boolean;
  maxRows?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export function AttendanceHistoryTable({
  records,
  isLoading,
  maxRows = 5,
  showViewAll = true,
  onViewAll,
}: AttendanceHistoryTableProps) {
  const displayRecords = records.slice(0, maxRows);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="h-7 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]">
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-4 pb-4">
        <h2 className="text-slate-900 dark:text-white text-xl md:text-[22px] font-bold tracking-tight">
          Riwayat Kehadiran Terakhir
        </h2>
        {showViewAll && onViewAll && (
          <button
            onClick={onViewAll}
            className="text-blue-600 dark:text-blue-500 text-sm font-semibold flex items-center gap-1 hover:underline"
          >
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Masuk
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Pulang
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-slate-500 dark:text-slate-400"
                  >
                    Belum ada riwayat kehadiran
                  </td>
                </tr>
              ) : (
                displayRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {record.date}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {record.checkInTime}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {record.checkOutTime || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <AttendanceStatusBadge variant={record.status} />
                        {record.isOvertime && (
                          <AttendanceStatusBadge variant="overtime" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
