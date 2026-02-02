'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/src/lib/api/axios-instance';
import { StationType, StationTask, ItemCountData } from '@/src/types/station';

// Types for API responses
interface StationTaskResponse {
  id: string;
  order_id: string;
  task_type: 'WASHING' | 'IRONING' | 'PACKING';
  worker_id: string;
  started_at: string;
  finished_at: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'NEED_BYPASS' | 'COMPLETED';
  order: {
    id: string;
    total_weight: number;
    pickup_request: {
      customer: {
        name: string;
        profile_picture_url?: string;
      };
    };
    order_item: Array<{
      id: string;
      qty: number;
      laundry_item: {
        id: string;
        name: string;
      };
    }>;
  };
  bypass_request: Array<{
    id: string;
    status: string;
  }>;
}

// Transform API response to frontend StationTask type
function transformTask(apiTask: StationTaskResponse): StationTask {
  const order = apiTask.order;
  const customer = order.pickup_request?.customer;

  return {
    id: apiTask.id,
    orderId: apiTask.order_id,
    invoiceNumber: `INV-${order.id.slice(0, 4).toUpperCase()}`,
    customerName: customer?.name || 'Unknown Customer',
    customerAvatar: customer?.profile_picture_url,
    weight: order.total_weight,
    serviceType: apiTask.task_type === 'WASHING' ? 'Regular' : apiTask.task_type,
    status: apiTask.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : 'WAITING',
    estimatedTime: new Date(apiTask.started_at).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

// API functions
async function fetchStationTasks(stationType: StationType): Promise<StationTask[]> {
  const response = await api.get<{ data: StationTaskResponse[] }>('/worker/station/tasks');
  
  // Filter by station type and transform
  const tasks = response.data.data
    .filter((task) => task.task_type === stationType)
    .map(transformTask);

  return tasks;
}

interface ProcessTaskData {
  taskId: string;
  items: Array<{ laundry_item_id: string; qty: number }>;
}

async function processStationTask(data: ProcessTaskData): Promise<{ message: string; code?: string }> {
  const response = await api.post(`/worker/station/tasks/${data.taskId}/process`, {
    items: data.items,
  });
  return response.data;
}

interface BypassRequestData {
  taskId: string;
  reason: string;
}

async function requestBypass(data: BypassRequestData): Promise<{ message: string }> {
  const response = await api.post(`/worker/station/tasks/${data.taskId}/bypass`, {
    reason: data.reason,
  });
  return response.data;
}

// React Query Hooks

export const useStationTasks = (stationType: StationType) => {
  return useQuery({
    queryKey: ['station-tasks', stationType],
    queryFn: () => fetchStationTasks(stationType),
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { taskId: string; stationType: StationType; itemCounts: ItemCountData }) => {
      // Transform itemCounts to API format
      const items = Object.entries(data.itemCounts)
        .filter(([_, qty]) => qty > 0)
        .map(([laundry_item_id, qty]) => ({
          laundry_item_id,
          qty,
        }));

      return processStationTask({ taskId: data.taskId, items });
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
    mutationFn: (data: { taskId: string; stationType: StationType; reason: string }) => {
      return requestBypass({
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
