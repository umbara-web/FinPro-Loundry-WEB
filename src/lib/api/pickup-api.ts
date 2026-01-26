import { api as axiosInstance } from './axios-instance';
import {
  CreatePickupPayload,
  PickupRequest,
  NearestOutletResult,
} from '@/src/types/pickup';

export const pickupApi = {
  createPickup: async (data: CreatePickupPayload): Promise<PickupRequest> => {
    const response = await axiosInstance.post('/pickup', data);
    return response.data.data;
  },

  getMyPickups: async (): Promise<PickupRequest[]> => {
    const response = await axiosInstance.get('/pickup');
    return response.data.data;
  },

  getPickupById: async (id: string): Promise<PickupRequest> => {
    const response = await axiosInstance.get(`/pickup/${id}`);
    return response.data.data;
  },

  cancelPickup: async (id: string): Promise<PickupRequest> => {
    const response = await axiosInstance.put(`/pickup/${id}/cancel`);
    return response.data.data;
  },

  findNearestOutlet: async (
    lat: string,
    long: string
  ): Promise<NearestOutletResult> => {
    const response = await axiosInstance.get(
      `/pickup/nearest-outlet?lat=${lat}&long=${long}`
    );
    return response.data.data;
  },
};
