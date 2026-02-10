'use client';

import { useState, useMemo } from 'react';
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

  // Fetch orders
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
        sortBy,
        sortOrder,
      }),
  });

  const orders = data?.data || [];
  const meta = data?.meta;

  // Calculate summary stats from orders
  const summaryStats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let totalSpending = 0;
    let successfulTransactions = 0;
    const methodCounts: Record<string, number> = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.created_at);
      const isCurrentMonth =
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear;

      if (isCurrentMonth) {
        totalSpending += order.price_total || 0;
      }

      // Count successful payments based on Payment_Status enum
      const paymentStatus = order.payment?.[0]?.status;
      if (paymentStatus === 'PAID') {
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
  }, [orders]);

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
  const handleFilter = () => {
    // Normalize search for case-insensitive matching
    const normalized = normalizeSearchTerm(localSearch);
    updateURL({
      search: normalized || undefined,
      status: localStatus === 'all' ? undefined : localStatus,
      dateFrom: localDateFrom || undefined,
      dateTo: localDateTo || undefined,
      page: '1',
    });
  };

  const handleClearFilters = () => {
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

  const handlePageChange = (newPage: number) => {
    updateURL({ page: newPage.toString() });
  };

  return (
    <div className='container mx-auto h-full max-w-7xl overflow-y-auto p-6 md:p-8'>
      {/* Summary Cards */}
      <PaymentSummaryCards
        totalSpending={summaryStats.totalSpending}
        successfulTransactions={summaryStats.successfulTransactions}
        favoriteMethod={summaryStats.favoriteMethod}
      />

      {/* Filters */}
      <div className='mt-6 md:mt-8'>
        <PaymentFilters
          search={localSearch}
          onSearchChange={setLocalSearch}
          status={localStatus}
          onStatusChange={setLocalStatus}
          dateFrom={localDateFrom}
          dateTo={localDateTo}
          onDateFromChange={setLocalDateFrom}
          onDateToChange={setLocalDateTo}
          onFilter={handleFilter}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Table with Pagination */}
      <div className='mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm md:mt-8 dark:border-slate-700'>
        <PaymentTable
          orders={orders}
          isLoading={isLoading}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
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
