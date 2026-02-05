'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/lib/api/axios-instance';

// Types
export interface LaundryItem {
  id: string;
  name: string;
}

// API function
async function fetchLaundryItems(): Promise<LaundryItem[]> {
  const response = await api.get<{ data: LaundryItem[] }>('/master/laundry-items');
  return response.data.data;
}

// Hook
export const useLaundryItems = () => {
  return useQuery({
    queryKey: ['laundry-items'],
    queryFn: fetchLaundryItems,
    staleTime: 1000 * 60 * 60, // 1 hour - master data rarely changes
  });
};
