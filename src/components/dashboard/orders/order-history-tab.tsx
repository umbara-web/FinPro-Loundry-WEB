'use client';

import { OrderHistoryHeader } from './order-history-header';
import { OrderList } from './order-list';
import { OrderPagination } from './order-pagination';
import { useOrdersQuery } from '@/src/hooks/use-orders-query';

export function OrderHistoryTab() {
  const { data, isLoading } = useOrdersQuery();

  return (
    <div className='flex h-full flex-col'>
      <div className='mb-6 space-y-4'>
        <OrderHistoryHeader />
      </div>

      <div className='flex-1 overflow-y-auto pr-4'>
        <OrderList orders={data?.data || []} isLoading={isLoading} />
      </div>

      <OrderPagination
        currentPage={data?.meta?.page || 1}
        totalPages={data?.meta?.totalPages || 1}
      />
    </div>
  );
}
