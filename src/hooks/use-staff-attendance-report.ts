'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '@/src/lib/api/axios-instance';
import { toast } from 'sonner';
import type {
  AttendanceRecord,
  TimePreset,
} from '@/src/types/staff-attendance';
import { getDateRangeFromPreset } from '@/src/types/staff-attendance';

export interface DateRange {
  from: Date;
  to: Date;
}

export function useAttendanceReport() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<TimePreset>('THIS_WEEK');
  const [date, setDate] = useState<DateRange | undefined>(
    getDateRangeFromPreset('THIS_WEEK') ?? undefined
  );
  const [staffType, setStaffType] = useState<string>('ALL');
  const [error, setError] = useState<string | null>(null);

  const handlePresetChange = useCallback((preset: TimePreset) => {
    setSelectedPreset(preset);
    if (preset !== 'CUSTOM') {
      const range = getDateRangeFromPreset(preset);
      if (range) setDate(range);
    }
  }, []);

  const handleCustomDateChange = useCallback((range: DateRange | undefined) => {
    setSelectedPreset('CUSTOM');
    setDate(range);
  }, []);

  const fetchAttendance = useCallback(async () => {
    if (!date?.from || !date?.to) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/outlet-admin/attendance-report', {
        params: {
          startDate: date.from.toISOString(),
          endDate: date.to.toISOString(),
          staffType: staffType === 'ALL' ? undefined : staffType,
        },
      });
      setRecords(response.data.data);
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.message || 'Gagal memuat laporan absensi';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [date, staffType]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const stats = useMemo(
    () => ({
      total: records.length,
      present: records.filter((r) => r.status === 'PRESENT').length,
      late: records.filter((r) => r.status === 'LATE').length,
      absent: records.filter((r) => r.status === 'ABSENT').length,
    }),
    [records]
  );

  return {
    records,
    isLoading,
    date,
    setDate: handleCustomDateChange,
    staffType,
    setStaffType,
    selectedPreset,
    handlePresetChange,
    refetch: fetchAttendance,
    stats,
    error,
  };
}
