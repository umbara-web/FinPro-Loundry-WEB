import { api } from '@/src/lib/api/axios-instance';
import {
  AvailablePickupRequest,
  AvailableDeliveryRequest,
  ActiveJob,
  DriverJobHistory,
} from '@/src/types/driver';

export const driverService = {
  getAvailablePickups: async (): Promise<{
    data: AvailablePickupRequest[];
  }> => {
    const { data } = await api.get('/driver/pickups');
    return data;
  },

  getAvailableDeliveries: async (): Promise<{
    data: AvailableDeliveryRequest[];
  }> => {
    const { data } = await api.get('/driver/deliveries');
    return data;
  },

  getActiveJob: async (): Promise<{ data: any }> => {
    const { data } = await api.get('/driver/active-job');
    return data;
  },

  getDriverHistory: async (params?: {
    page?: number;
    limit?: number;
    date?: string;
  }): Promise<{ data: DriverJobHistory[]; meta?: any }> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.date) queryParams.append('date', params.date);

    const { data } = await api.get(`/driver/history?${queryParams.toString()}`);
    return data;
  },

  getPickupById: async (pickupId: string): Promise<{ data: any }> => {
    const { data } = await api.get(`/driver/pickups/${pickupId}`);
    return data;
  },

  getDeliveryById: async (taskId: string): Promise<{ data: any }> => {
    const { data } = await api.get(`/driver/deliveries/${taskId}`);
    return data;
  },

  acceptPickup: async (requestId: string): Promise<{ message: string }> => {
    const { data } = await api.post(`/driver/pickups/${requestId}/accept`);
    return data;
  },

  acceptDelivery: async (
    orderId: string
  ): Promise<{ data: { id: string }; message: string }> => {
    const { data } = await api.post(`/driver/deliveries/${orderId}/accept`);
    return data;
  },

  updatePickupStatus: async (
    pickupId: string,
    status: string
  ): Promise<{ message: string }> => {
    const { data } = await api.patch(`/driver/pickups/${pickupId}/status`, {
      status,
    });
    return data;
  },

  updateDeliveryStatus: async (
    taskId: string,
    status: string
  ): Promise<{ message: string }> => {
    const { data } = await api.patch(`/driver/deliveries/${taskId}/status`, {
      status,
    });
    return data;
  },
};
