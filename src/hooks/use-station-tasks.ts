'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { StationType, StationTask, ItemCountData } from '@/src/types/station';

import { workerService } from '../services/worker.service';

// React Query Hooks

export const useStationTasks = (stationType: StationType) => {
  return useQuery({
    queryKey: ['station-tasks', stationType],
    queryFn: () => workerService.getStationTasks(stationType),
    refetchInterval: 30000,
    staleTime: 10000,
  });
};

export const useClaimTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { taskId: string; stationType: StationType }) => {
      return workerService.claimTask(data.taskId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['station-tasks', variables.stationType],
      });
      toast.success('Tugas berhasil diambil!');
    },
    onError: (error: Error) => {
      toast.error(
        error.message ||
          'Gagal mengambil tugas. Mungkin sudah diambil orang lain.'
      );
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      taskId: string;
      stationType: StationType;
      itemCounts: ItemCountData;
    }) => {
      const items = Object.entries(data.itemCounts)
        .filter(([_, qty]) => qty > 0)
        .map(([laundry_item_id, qty]) => ({
          laundry_item_id,
          qty,
        }));

      return workerService.processTask({ taskId: data.taskId, items });
    },
    onSuccess: (result, variables) => {
      if (result.code === 'MISMATCH') {
        toast.warning('Quantity mismatch! Silakan request bypass.');
      } else {
        queryClient.invalidateQueries({
          queryKey: ['station-tasks', variables.stationType],
        });
        toast.success('Task berhasil diselesaikan!');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Gagal menyelesaikan task');
    },
  });
};

export const useBypassRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      taskId: string;
      stationType: StationType;
      reason: string;
    }) => {
      return workerService.requestBypass({
        taskId: data.taskId,
        reason: data.reason,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['station-tasks'] });
      toast.success('Permintaan bypass berhasil dikirim!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Gagal mengirim permintaan bypass');
    },
  });
};
