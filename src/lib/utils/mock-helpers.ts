// utils/mock-helpers.ts

import { Order } from '@/src/types/order';

/**
 * Create mock order dengan default values
 */
export const createMockOrder = (overrides?: Partial<Order>): Order => {
  return {
    id: `ORD-${Date.now()}`,
    pickup_request_id: '',
    outlet_id: '',
    outlet_admin_id: null,
    total_weight: 0,
    total_price: 0,
    status: 'PENDING_PAYMENT',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    completed_at: null,
    ...overrides,
  } as Order;
};
