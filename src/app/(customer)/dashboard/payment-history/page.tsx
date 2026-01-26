'use client';

import { PaymentHistoryHeader } from '@/src/components/dashboard/payment/payment-history/payment-history-header';
import { OrderList } from '@/src/components/dashboard/orders/order-list';
import { OrderPagination } from '@/src/components/dashboard/orders/order-pagination';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/src/lib/api/order-api';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from '@/src/hooks/use-debounce';
import { normalizeSearchTerm } from '@/src/lib/utils/search';
import { Wallet } from 'lucide-react';

export default function PaymentHistoryPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const status = searchParams.get('status') || 'all';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'created_at';
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
  const debouncedSearch = useDebounce(search, 500);
  const normalizedSearch = normalizeSearchTerm(debouncedSearch);

  const { data, isLoading } = useQuery({
    queryKey: [
      'payment-history-page',
      page,
      status,
      normalizedSearch,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getOrders({
        page,
        limit: 10,
        status: status === 'all' ? undefined : status,
        search: normalizedSearch || undefined,
        sortBy,
        sortOrder,
      }),
  });

  return (
    <div className='container mx-auto flex h-[calc(100vh-6rem)] max-w-7xl flex-col px-6 py-8'>
      <div className='mb-6 flex flex-col gap-4'>
        <h1 className='text-3xl font-bold tracking-tight'>
          Riwayat Pembayaran
        </h1>
        <p className='text-muted-foreground'>
          Kelola dan lihat status pembayaran pesanan Anda.
        </p>
      </div>

      <div className='flex min-h-0 flex-1 flex-col gap-6'>
        <PaymentHistoryHeader />

        <div className='flex-1 overflow-y-auto'>
          <OrderList
            orders={data?.data || []}
            isLoading={isLoading}
            emptyMessage='Tidak ada riwayat Pembayaran saat ini'
            emptyIcon={Wallet}
          />
        </div>

        {data?.meta && (
          <OrderPagination
            currentPage={data.meta.page}
            totalPages={data.meta.totalPages}
          />
        )}
      </div>
    </div>
  );
}
