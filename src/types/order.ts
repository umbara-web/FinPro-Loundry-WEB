export enum OrderStatus {
  CREATED = 'CREATED',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  PAID = 'PAID',
  IN_WASHING = 'IN_WASHING',
  IN_IRONING = 'IN_IRONING',
  IN_PACKING = 'IN_PACKING',
  READY_FOR_DELIVERY = 'READY_FOR_DELIVERY',
  ON_DELIVERY = 'ON_DELIVERY',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

export interface LaundryItem {
  id: string;
  name: string;
  price?: number;
}

export interface OrderItem {
  id: string;
  order_id: string;
  laundry_item_id: string;
  qty: number;
  price?: number;
  itemName?: string;
  laundry_item: LaundryItem;
}

export interface CustomerAddress {
  id: string;
  address: string;
  city: string;
  postal_code: string;
  recipient_name?: string;
  recipient_phone?: string;
}

export interface PickupRequest {
  id: string;
  customer_address: CustomerAddress;
  created_at?: string;
}

export interface Driver {
  id: string;
  name: string;
  // Add other driver fields if needed
}

export interface DriverTask {
  id: string;
  driver: Driver;
}

export interface Order {
  id: string;
  order_id?: string; // Real Order ID from DB
  pickup_request_id: string;
  outlet_id: string;
  outlet_admin_id: string;
  total_weight: number;
  price_total: number;
  status: OrderStatus;
  paid_at?: string;
  created_at: string;
  updated_at: string;
  pickup_request: PickupRequest;
  order_item: OrderItem[];
  driver_task: DriverTask[];
  payment?: any[];
}

export interface OrderListResponse {
  data: Order[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface OrderQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
