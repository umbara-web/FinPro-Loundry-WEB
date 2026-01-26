import { getPayments } from '@/src/lib/api/payment-api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export function usePaymentsQuery() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');

  return useQuery({
    queryKey: [
      'payments',
      page,
      status,
      search,
      sortBy,
      sortOrder,
      dateFrom,
      dateTo,
    ],
    queryFn: () =>
      getPayments({
        page,
        limit: 10,
        status: status === 'all' ? undefined : status || undefined,
        search: search || undefined,
        sortBy: searchParams.get('sortBy') || 'created_at',
        sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
        dateFrom: searchParams.get('dateFrom')
          ? new Date(searchParams.get('dateFrom')!)
          : undefined,
        dateTo: searchParams.get('dateTo')
          ? new Date(searchParams.get('dateTo')!)
          : undefined,
      }),
  });
}
