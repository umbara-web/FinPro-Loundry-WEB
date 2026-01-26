'use client';

import { OrderDateFilter } from './order-date-filter';
import { OrderSort } from './order-sort';

export function OrderFilterActions() {
  return (
    <div className='flex gap-2'>
      <OrderDateFilter />
      <OrderSort />
    </div>
  );
}
