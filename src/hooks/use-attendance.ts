'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from '@/src/services/attendance.service';
import { toast } from 'sonner';

export const useAttendanceStatus = () => {
  return useQuery({
    queryKey: ['attendance', 'status'],
    queryFn: () => attendanceService.getStatus(),
    refetchInterval: 30000, // Refetch every 30 seconds for live updates
  });
};

export const useAttendanceHistory = () => {
  return useQuery({
    queryKey: ['attendance', 'history'],
    queryFn: () => attendanceService.getHistory(),
  });
};

export const useClockIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => attendanceService.clockIn(),
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
    mutationFn: () => attendanceService.clockOut(),
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
