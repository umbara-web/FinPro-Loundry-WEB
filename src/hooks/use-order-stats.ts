import { useQuery } from '@tanstack/react-query';
import { getOrderStats } from '@/src/lib/api/order-api';

export function useOrderStats() {
  return useQuery({
    queryKey: ['order-stats'],
    queryFn: () => getOrderStats(),
    // Refetch often since order status changes frequently
    refetchInterval: 30000,
  });
}
