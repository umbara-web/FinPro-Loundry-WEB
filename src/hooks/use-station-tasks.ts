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
  worker_id: string | null;
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

interface StationTasksApiResponse {
  data: {
    pool: StationTaskResponse[];
    mine: StationTaskResponse[];
  };
}

// Transform API response to frontend StationTask type
function transformTask(apiTask: StationTaskResponse): StationTask {
  try {
    const order = apiTask.order;
    if (!order) {
      console.error('Task missing order data:', apiTask);
      throw new Error('Task missing order data');
    }

    const customer = order.pickup_request?.customer;
    
    if (!customer) {
      console.warn('Task missing customer data:', apiTask);
    }

    return {
      id: apiTask.id,
      orderId: apiTask.order_id,
      invoiceNumber: `INV-${order.id?.slice(0, 4).toUpperCase() || '????'}`,
      customerName: customer?.name || 'Unknown Customer',
      customerAvatar: customer?.profile_picture_url,
      weight: order.total_weight || 0,
      serviceType: apiTask.task_type === 'WASHING' ? 'Regular' : apiTask.task_type,
      status: apiTask.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : 
              apiTask.status === 'NEED_BYPASS' ? 'NEED_BYPASS' : 'WAITING',
      estimatedTime: apiTask.started_at ? new Date(apiTask.started_at).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }) : '--:--',
      items: order.order_item?.map((item) => ({
        id: item.laundry_item?.id || item.id,
        name: item.laundry_item?.name || 'Unknown',
        qty: item.qty,
      })) || [],
    };
  } catch (error) {
    console.error('Error transforming task:', error, apiTask);
    return {
      id: apiTask.id,
      orderId: apiTask.order_id,
      invoiceNumber: 'ERROR',
      customerName: 'Data Error',
      weight: 0,
      serviceType: 'Unknown',
      status: 'WAITING',
      estimatedTime: '--:--',
      items: [],
    } as StationTask;
  }
}

// API functions
async function fetchStationTasks(stationType: StationType): Promise<{ pool: StationTask[]; mine: StationTask[] }> {
  const response = await api.get<StationTasksApiResponse>(`/worker/station/tasks?station=${stationType}`);
  
  return {
    pool: response.data.data.pool.map(transformTask),
    mine: response.data.data.mine.map(transformTask),
  };
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

async function claimStationTask(taskId: string): Promise<{ message: string }> {
  const response = await api.post(`/worker/station/tasks/${taskId}/claim`);
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
    refetchInterval: 30000,
    staleTime: 10000,
  });
};

export const useClaimTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { taskId: string; stationType: StationType }) => {
      return claimStationTask(data.taskId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['station-tasks', variables.stationType],
      });
      toast.success('Tugas berhasil diambil!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Gagal mengambil tugas. Mungkin sudah diambil orang lain.');
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { taskId: string; stationType: StationType; itemCounts: ItemCountData }) => {
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
