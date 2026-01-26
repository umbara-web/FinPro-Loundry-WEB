'use client';

import { OrderTabs } from '@/src/components/dashboard/orders/order-tabs';

export default function OrderPage() {
  return (
    <div className='container mx-auto mt-10 flex h-[calc(100vh-6rem)] max-w-7xl flex-col'>
      <OrderTabs />
    </div>
  );
}
