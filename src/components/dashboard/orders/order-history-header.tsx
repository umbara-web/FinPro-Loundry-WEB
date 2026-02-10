'use client';

import { OrderHistoryFilter } from './order-history-filter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function OrderHistoryHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      // Reset page when filtering
      params.set('page', '1');

      // Prevent redundant push
      if (params.toString() !== searchParams.toString()) {
        router.push(pathname + '?' + params.toString());
      }
    },
    [pathname, router, searchParams]
  );

  const handleStatusChange = useCallback(
    (status: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (status) {
        params.set('status', status);
      } else {
        params.delete('status');
      }
      // Reset page when filtering
      params.set('page', '1');

      if (params.toString() !== searchParams.toString()) {
        router.push(pathname + '?' + params.toString());
      }
    },
    [pathname, router, searchParams]
  );

  const handleSortChange = useCallback(
    (sortBy: string, sortOrder: 'asc' | 'desc') => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sortBy', sortBy);
      params.set('sortOrder', sortOrder);
      // Reset page when sorting
      params.set('page', '1');

      if (params.toString() !== searchParams.toString()) {
        router.push(pathname + '?' + params.toString());
      }
    },
    [pathname, router, searchParams]
  );

  const handleDateChange = useCallback(
    (dateFrom: Date | undefined, dateTo: Date | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (dateFrom) {
        params.set('dateFrom', dateFrom.toISOString());
      } else {
        params.delete('dateFrom');
      }

      if (dateTo) {
        params.set('dateTo', dateTo.toISOString());
      } else {
        params.delete('dateTo');
      }
      // Reset page
      params.set('page', '1');

      if (params.toString() !== searchParams.toString()) {
        router.push(pathname + '?' + params.toString());
      }
    },
    [pathname, router, searchParams]
  );

  const currentSearch = searchParams.get('search') || '';
  const currentStatus = searchParams.get('status') || '';
  const currentSortBy = searchParams.get('sortBy') || 'created_at';
  const currentSortOrder =
    (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
  const currentDateFrom = searchParams.get('dateFrom')
    ? new Date(searchParams.get('dateFrom')!)
    : undefined;
  const currentDateTo = searchParams.get('dateTo')
    ? new Date(searchParams.get('dateTo')!)
    : undefined;

  return (
    <div className='dark:bg-station-bg sticky top-0 z-10 space-y-4 rounded-2xl border border-slate-300 backdrop-blur-md dark:border-slate-700'>
      <OrderHistoryFilter
        currentSearch={currentSearch}
        currentStatus={currentStatus}
        currentSortBy={currentSortBy}
        currentSortOrder={currentSortOrder}
        currentDateFrom={currentDateFrom}
        currentDateTo={currentDateTo}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        onDateChange={handleDateChange}
      />
    </div>
  );
}
