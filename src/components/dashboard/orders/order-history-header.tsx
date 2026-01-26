'use client';

import { OrderFilterActions } from './order-filter-actions';
import { OrderSearch } from './order-search';
import { OrderStatusTabs } from './order-status-tabs';

export function OrderHistoryHeader() {
  return (
    <div className='sticky top-0 z-10 space-y-4 bg-[#101922] pb-4 backdrop-blur-md'>
      <div className='flex items-center justify-between'>
        <OrderSearch />
        <OrderFilterActions />
      </div>
      <OrderStatusTabs />
    </div>
  );
}
