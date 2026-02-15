'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { getOrders } from '@/src/lib/api/order-api';
import { useDebounce } from '@/src/hooks/use-debounce';
import { normalizeSearchTerm } from '@/src/lib/utils/search';
import { PaymentSummaryCards } from '@/src/components/dashboard/payment/payment-history/payment-summary-cards';
import { PaymentFilters } from '@/src/components/dashboard/payment/payment-history/payment-filters';
import { PaymentTable } from '@/src/components/dashboard/payment/payment-history/payment-table';
import { PaymentTablePagination } from '@/src/components/dashboard/payment/payment-history/payment-table-pagination';
import { QRTrackingBanner } from '@/src/components/dashboard/payment/payment-history/qr-tracking-banner';

const ITEMS_PER_PAGE = 5;

export default function PaymentHistoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get URL params
  const page = Number(searchParams.get('page')) || 1;
  const urlStatus = searchParams.get('status') || 'all';
  const urlSearch = searchParams.get('search') || '';
  const urlDateFrom = searchParams.get('dateFrom') || '';
  const urlDateTo = searchParams.get('dateTo') || '';
  const sortBy = searchParams.get('sortBy') || 'created_at';
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';

  // Local state for filters
  const [localSearch, setLocalSearch] = useState(urlSearch);
  const [localStatus, setLocalStatus] = useState(urlStatus);
  const [localDateFrom, setLocalDateFrom] = useState(urlDateFrom);
  const [localDateTo, setLocalDateTo] = useState(urlDateTo);

  const debouncedSearch = useDebounce(localSearch, 500);
  const normalizedSearch = normalizeSearchTerm(debouncedSearch);

  // Auto-search: sync debounced search value to URL
  useEffect(() => {
    const currentUrlSearch = searchParams.get('search') || '';
    if (normalizedSearch !== currentUrlSearch) {
      updateURL({
        search: normalizedSearch || undefined,
        page: '1',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedSearch]);

  // Auto-apply status change to URL
  useEffect(() => {
    const currentUrlStatus = searchParams.get('status') || 'all';
    if (localStatus !== currentUrlStatus) {
      updateURL({
        status: localStatus === 'all' ? undefined : localStatus,
        page: '1',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStatus]);

  // Fetch orders (paginated for table display)
  const { data, isLoading } = useQuery({
    queryKey: [
      'payment-history',
      page,
      urlStatus,
      urlSearch,
      urlDateFrom,
      urlDateTo,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getOrders({
        page,
        limit: ITEMS_PER_PAGE,
        status: urlStatus === 'all' ? undefined : urlStatus,
        search: urlSearch || undefined,
        dateFrom: urlDateFrom ? new Date(urlDateFrom) : undefined,
        dateTo: urlDateTo ? new Date(urlDateTo) : undefined,
        sortBy: sortBy === 'transaction_id' ? 'created_at' : sortBy,
        sortOrder,
      }),
  });

  const orders = data?.data || [];
  const meta = data?.meta;

  // Fetch ALL orders (no pagination) for summary stats calculation
  const { data: allData } = useQuery({
    queryKey: ['payment-history-all'],
    queryFn: () => getOrders({ page: 1, limit: 9999 }),
  });
  const allOrders = allData?.data || [];

  // Calculate summary stats from ALL orders (not just current page)
  const summaryStats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let totalSpending = 0;
    let successfulTransactions = 0;
    const methodCounts: Record<string, number> = {};

    allOrders.forEach((order) => {
      const orderDate = new Date(order.created_at);
      const isCurrentMonth =
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear;

      if (isCurrentMonth) {
        totalSpending += order.price_total || 0;
      }

      // Count successful payments based on Payment_Status enum
      const payments = order.payment || [];
      const isPaid = payments.some((p: any) => p.status === 'PAID');

      if (isPaid) {
        successfulTransactions++;
      }

      const method = order.payment?.[0]?.method || 'Transfer Bank';
      methodCounts[method] = (methodCounts[method] || 0) + 1;
    });

    // Find most used method
    let favoriteMethod = 'Transfer Bank';
    let maxCount = 0;
    Object.entries(methodCounts).forEach(([method, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favoriteMethod = method;
      }
    });

    return { totalSpending, successfulTransactions, favoriteMethod };
  }, [allOrders]);

  // Build stable order number mapping: oldest order = 001, newest = highest
  const orderNumberMap = useMemo(() => {
    const sorted = [...allOrders].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    const map: Record<string, number> = {};
    sorted.forEach((order, i) => {
      map[order.id] = i + 1;
    });
    return map;
  }, [allOrders]);

  // URL update helper
  const updateURL = (params: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === 'all') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // Handler functions
  const handleResetFilters = () => {
    setLocalSearch('');
    setLocalStatus('all');
    setLocalDateFrom('');
    setLocalDateTo('');
    router.push(pathname);
  };

  const handleSort = (field: string) => {
    const newOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc';
    updateURL({ sortBy: field, sortOrder: newOrder });
  };

  // Map frontend sort fields to backend fields
  const getBackendSortBy = (field: string) => {
    if (field === 'transaction_id') return 'created_at';
    return field;
  };

  const handlePageChange = (newPage: number) => {
    updateURL({ page: newPage.toString() });
  };

  return (
    <div className='container mx-auto h-full max-w-7xl overflow-y-auto p-4 md:p-6'>
      {/* Summary Cards - sticky header */}
      <div className='bg-background-light dark:bg-background-dark sticky top-0 z-10 pt-0 pb-2'>
        <PaymentSummaryCards
          totalSpending={summaryStats.totalSpending}
          successfulTransactions={summaryStats.successfulTransactions}
          favoriteMethod={summaryStats.favoriteMethod}
        />
      </div>

      {/* Filters */}
      <div className='bg-background-light dark:bg-background-dark sticky top-16 z-10 mt-4 md:mt-4'>
        <PaymentFilters
          search={localSearch}
          onSearchChange={setLocalSearch}
          status={localStatus}
          onStatusChange={setLocalStatus}
          dateFrom={localDateFrom}
          dateTo={localDateTo}
          onDateFromChange={setLocalDateFrom}
          onDateToChange={setLocalDateTo}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Table with Pagination */}
      <div className='mt-4 overflow-hidden rounded-2xl border border-slate-200 shadow-sm md:mt-4 dark:border-slate-700'>
        <PaymentTable
          orders={orders}
          isLoading={isLoading}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          orderNumberMap={orderNumberMap}
        />

        {meta && meta.totalPages > 1 && (
          <PaymentTablePagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            totalItems={meta.total}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* QR Tracking Banner */}
      <QRTrackingBanner />
    </div>
  );
}
