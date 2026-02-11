// Driver-specific types for the Driver Management feature

export type PickupStatus =
  | 'WAITING_DRIVER'
  | 'DRIVER_ASSIGNED'
  | 'ON_THE_WAY'
  | 'ARRIVED'
  | 'PICKED_UP'
  | 'ARRIVED_OUTLET'
  | 'CANCELLED';

export type DeliveryStatus =
  | 'ACCEPTED'
  | 'ON_THE_WAY'
  | 'ARRIVED'
  | 'DELIVERED'
  | 'DONE';

export interface CustomerInfo {
  name: string;
  phone?: string;
}

export interface CustomerAddress {
  id: string;
  address: string;
  city?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface AvailablePickupRequest {
  id: string;
  customer: CustomerInfo;
  customer_address: CustomerAddress;
  schedulled_pickup_at: string;
  notes?: string;
  status: PickupStatus;
  created_at: string;
  distance?: number; // in km, if calculated
}

export interface AvailableDeliveryRequest {
  id: string;
  order_number?: string;
  pickup_request: {
    customer: CustomerInfo;
    customer_address: CustomerAddress;
  };
  total_weight: number;
  status: string;
  distance?: number;
}

export interface ActiveJob {
  id: string;
  type: 'PICKUP' | 'DELIVERY';
  status: PickupStatus | DeliveryStatus;
  customer: CustomerInfo;
  address: CustomerAddress;
  orderNumber?: string;
  notes?: string;
  estimatedTime?: number; // in minutes
  distance?: number; // in km
}

export interface DriverJobHistory {
  id: string;
  type: 'PICKUP' | 'DELIVERY';
  order_number: string;
  customer_name: string;
  address: string;
  completed_at: string;
  status: 'SELESAI' | 'DIBATALKAN';
}
