'use client';

import { PaymentHistoryPagination } from '@/src/components/dashboard/payment/payment-history/payment-history-pagination';
import { PaymentHistoryFilters } from '@/src/components/dashboard/payment/payment-history/payment-history-filters';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/src/lib/api/order-api';
import { useState } from 'react';
import { useDebounce } from '@/src/hooks/use-debounce';
import { normalizeSearchTerm } from '@/src/lib/utils/search';
import { OrderList } from '@/src/components/dashboard/orders/order-list';
import { Wallet } from 'lucide-react';

export function PaymentHistoryTab() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const limit = 10;

  const debouncedSearch = useDebounce(search, 500);
  const normalizedSearch = normalizeSearchTerm(debouncedSearch);

  const { data, isLoading } = useQuery({
    queryKey: ['payment-history', page, normalizedSearch, status],
    queryFn: () =>
      getOrders({
        page,
        limit,
        status: status === 'all' ? undefined : status, // Fixed to send undefined if all
        search: normalizedSearch || undefined,
        sortBy: 'created_at',
        sortOrder: 'desc',
      }),
  });

  const orders = data?.data || [];
  const meta = data?.meta;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-3 border-l-4 border-blue-500 pl-4'>
        <h2 className='text-xl font-bold text-slate-900 dark:text-white'>
          Riwayat Pembayaran
        </h2>
      </div>

      <PaymentHistoryFilters
        searchPromise={search}
        setSearch={setSearch}
        statusFilter={status}
        setStatusFilter={setStatus}
      />

      <div className='flex-1 overflow-y-auto'>
        <OrderList
          orders={orders}
          isLoading={isLoading}
          emptyMessage='Tidak ada riwayat Pembayaran saat ini'
          emptyIcon={Wallet}
        />
      </div>

      {meta && (
        <div className='border-t border-slate-200 p-4 dark:border-[#233648]'>
          <PaymentHistoryPagination
            page={page}
            totalPages={meta.totalPages}
            setPage={setPage}
            totalItems={meta.total}
            limit={limit}
          />
        </div>
      )}
    </div>
  );
}
