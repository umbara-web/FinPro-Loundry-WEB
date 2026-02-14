'use client';

import { Order } from '@/src/types/order';
import { TableHeader, PaymentRow } from './payment-table-components';
import { LoadingState, EmptyState } from './payment-table-ui-components';

interface PaymentTableProps {
  orders: Order[];
  isLoading?: boolean;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export function PaymentTable({
  orders,
  isLoading,
  sortBy,
  sortOrder,
  onSort,
}: PaymentTableProps) {
  if (isLoading) return <LoadingState />;
  if (orders.length === 0) return <EmptyState />;

  return (
    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#101922]'>
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse text-left'>
          <TableHeader sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
          <tbody className='divide-y divide-slate-200 dark:divide-slate-700'>
            {orders.map((order, index) => (
              <PaymentRow key={order.id} order={order} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
