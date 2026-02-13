import { useState, useEffect } from 'react';
import type { TimePreset } from '@/src/types/staff-attendance';
import { getDateRangeFromPreset } from '@/src/types/staff-attendance';
import { WorkerJobHistory, DateRange } from '../_types';

export const useWorkerHistory = () => {
  const [jobs, setJobs] = useState<WorkerJobHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [selectedPreset, setSelectedPreset] = useState<TimePreset>('THIS_WEEK');
  const [date, setDate] = useState<DateRange | undefined>(
    getDateRangeFromPreset('THIS_WEEK') ?? undefined
  );
  const [taskType, setTaskType] = useState<string>('ALL');

  const handlePresetChange = (preset: TimePreset) => {
    setPage(1);
    setSelectedPreset(preset);
    if (preset !== 'CUSTOM') {
      const range = getDateRangeFromPreset(preset);
      if (range) setDate(range);
    }
  };

  const handleCustomDateChange = (range: DateRange | undefined) => {
    setPage(1);
    setSelectedPreset('CUSTOM');
    if (range?.to) {
      const endOfDay = new Date(range.to);
      endOfDay.setHours(23, 59, 59, 999);
      setDate({ ...range, to: endOfDay });
    } else {
      setDate(range);
    }
  };

  const handleTaskTypeChange = (value: string) => {
    setPage(1);
    setTaskType(value);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '10',
        });

        if (date?.from) params.append('startDate', date.from.toISOString());
        if (date?.to) params.append('endDate', date.to.toISOString());
        if (taskType !== 'ALL') params.append('taskType', taskType);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/worker/history?${params.toString()}`,
          { credentials: 'include' }
        );
        if (res.ok) {
          const result = await res.json();
          setJobs(result.data || []);
          setTotalPages(result.meta?.totalPages || 1);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [page, date, taskType]);

  return {
    jobs,
    loading,
    page,
    totalPages,
    setPage,
    selectedPreset,
    date,
    taskType,
    handlePresetChange,
    handleCustomDateChange,
    handleTaskTypeChange,
  };
};
