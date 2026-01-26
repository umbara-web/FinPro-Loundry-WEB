import { useQuery } from '@tanstack/react-query';
import { getPaymentStats } from '@/src/lib/api/payment-api';

export function usePaymentStats() {
  return useQuery({
    queryKey: ['payment-stats'],
    queryFn: () => getPaymentStats(),
    // Refetch somewhat frequently as payments can update externally
    refetchInterval: 30000,
  });
}
