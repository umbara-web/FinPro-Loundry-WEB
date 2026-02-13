import { AvailablePickupRequest } from '@/src/types/driver';

export interface PickupDetail {
  id: string;
  customer: {
    name: string;
    phone?: string;
  };
  customer_address: {
    address: string;
    city?: string;
    postal_code?: string;
    lat?: string;
    long?: string;
  };
  outlet?: {
    name: string;
    address: string;
    lat: string;
    long: string;
  };
  notes?: string;
  status: string;
  schedulled_pickup_at?: string;
}

export type PickupStep = 'ON_THE_WAY' | 'PICKED_UP' | 'ARRIVED_OUTLET';
