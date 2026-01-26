import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/src/lib/api/order-api';
import { OrderQueryParams } from '@/src/types/order';

export const useGetOrders = (params: OrderQueryParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => getOrders(params),
    placeholderData: (previousData) => previousData,
  });
};
