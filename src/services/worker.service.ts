import { api } from '@/src/lib/api/axios-instance';
import { StationType, StationTask } from '@/src/types/station';

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
      serviceType:
        apiTask.task_type === 'WASHING' ? 'Regular' : apiTask.task_type,
      status:
        apiTask.status === 'IN_PROGRESS'
          ? 'IN_PROGRESS'
          : apiTask.status === 'NEED_BYPASS'
            ? 'NEED_BYPASS'
            : 'WAITING',
      estimatedTime: apiTask.started_at
        ? new Date(apiTask.started_at).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '--:--',
      items:
        order.order_item?.map((item) => ({
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

interface ProcessTaskData {
  taskId: string;
  items: Array<{ laundry_item_id: string; qty: number }>;
}

interface BypassRequestData {
  taskId: string;
  reason: string;
}

export const workerService = {
  getStationTasks: async (
    stationType: StationType
  ): Promise<{ pool: StationTask[]; mine: StationTask[] }> => {
    const response = await api.get<StationTasksApiResponse>(
      `/worker/station/tasks?station=${stationType}`
    );

    return {
      pool: response.data.data.pool.map(transformTask),
      mine: response.data.data.mine.map(transformTask),
    };
  },

  processTask: async (
    data: ProcessTaskData
  ): Promise<{ message: string; code?: string }> => {
    const response = await api.post(
      `/worker/station/tasks/${data.taskId}/process`,
      {
        items: data.items,
      }
    );
    return response.data;
  },

  claimTask: async (taskId: string): Promise<{ message: string }> => {
    const response = await api.post(`/worker/station/tasks/${taskId}/claim`);
    return response.data;
  },

  requestBypass: async (
    data: BypassRequestData
  ): Promise<{ message: string }> => {
    const response = await api.post(
      `/worker/station/tasks/${data.taskId}/bypass`,
      {
        reason: data.reason,
      }
    );
    return response.data;
  },
};
