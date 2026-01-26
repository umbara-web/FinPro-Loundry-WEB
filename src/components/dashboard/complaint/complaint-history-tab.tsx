'use client';

import { ComplaintHistoryFilters } from './complaint-history-filters';
import { useQuery } from '@tanstack/react-query';
import { getComplaints } from '@/src/lib/api/complaint-api';
import { useState } from 'react';
import { useDebounce } from '@/src/hooks/use-debounce';
import { normalizeSearchTerm } from '@/src/lib/utils/search';
import { OrderPagination } from '@/src/components/dashboard/orders/order-pagination';
import { ComplaintList } from './complaint-list';

export function ComplaintHistoryTab() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const limit = 10;

  const debouncedSearch = useDebounce(search, 500);
  const normalizedSearch = normalizeSearchTerm(debouncedSearch);

  const { data, isLoading } = useQuery({
    queryKey: ['complaints', page, normalizedSearch, status],
    queryFn: () =>
      getComplaints({
        page,
        limit,
        status: status === 'all' ? undefined : (status as any),
        sortBy: 'created_at',
        sortOrder: 'desc',
        search: normalizedSearch || undefined,
      }),
  });

  const complaints = data?.data || [];
  const meta = data?.meta;

  return (
    <div className='flex h-full flex-col gap-6'>
      <div className='flex items-center gap-3 border-l-4 border-blue-500 pl-4'>
        <h2 className='text-xl font-bold text-slate-900 dark:text-white'>
          Riwayat Komplain
        </h2>
      </div>

      <ComplaintHistoryFilters
        searchPromise={search}
        setSearch={(val) => {
          setSearch(val);
          setPage(1);
        }}
        statusFilter={status}
        setStatusFilter={(val) => {
          setStatus(val);
          setPage(1);
        }}
      />

      <div className='flex-1 overflow-y-auto'>
        <ComplaintList complaints={complaints} isLoading={isLoading} />
      </div>

      {meta && (
        <div className='border-t border-slate-200 p-4 dark:border-[#233648]'>
          <OrderPagination currentPage={page} totalPages={meta.totalPages} />
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    OPEN: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    IN_REVIEW:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    RESOLVED:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const label = status.replace(/_/g, ' ');

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        styles[status] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {label}
    </span>
  );
}
