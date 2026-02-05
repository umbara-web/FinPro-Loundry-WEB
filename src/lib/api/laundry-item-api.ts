import { api as axiosInstance } from './axios-instance';
import { LaundryItem } from '@/src/components/dashboard/pickup/pickup-constants';

export const laundryItemApi = {
  getAll: async (): Promise<LaundryItem[]> => {
    const response = await axiosInstance.get('/laundry-items');
    return response.data.data;
  },
};
