'use client';

import { OrderFilterActions } from '@/src/components/dashboard/orders/order-filter-actions';
import { OrderSearch } from '@/src/components/dashboard/orders/order-search';
import { PaymentStatusTabs } from './payment-status-tabs';

export function PaymentHistoryHeader() {
  return (
    <div className='sticky top-0 z-10 space-y-4 bg-[#101922] pb-4 backdrop-blur-md'>
      <div className='flex items-center justify-between'>
        <OrderSearch />
        <OrderFilterActions />
      </div>
      <PaymentStatusTabs />
    </div>
  );
}
