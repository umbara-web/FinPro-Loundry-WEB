'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceApi } from '@/src/lib/api/attendance-api';
import { toast } from 'sonner';

export const useAttendanceStatus = () => {
  return useQuery({
    queryKey: ['attendance', 'status'],
    queryFn: () => attendanceApi.getStatus(),
    refetchInterval: 30000, // Refetch every 30 seconds for live updates
  });
};

export const useAttendanceHistory = () => {
  return useQuery({
    queryKey: ['attendance', 'history'],
    queryFn: () => attendanceApi.getHistory(),
  });
};

export const useClockIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => attendanceApi.clockIn(),
    onSuccess: () => {
      toast.success('Successfully clocked in!');
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to clock in';
      toast.error(message);
    },
  });
};

export const useClockOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => attendanceApi.clockOut(),
    onSuccess: () => {
      toast.success('Successfully clocked out!');
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to clock out';
      toast.error(message);
    },
  });
};
