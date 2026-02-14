import { api as axiosInstance } from './axios-instance';
import { OrderListResponse, OrderQueryParams } from '@/src/types/order';
import { pickupApi } from './pickup-api';

export const getOrders = async (
  params: OrderQueryParams
): Promise<OrderListResponse> => {
  const { data } = await axiosInstance.get('/orders', { params });
  return data;
};

export const getOrderDetail = async (orderId: string) => {
  // Since we're now returning pickup requests as orders, fetch from pickup API
  const pickup = (await pickupApi.getPickupById(orderId)) as any;
  if (!pickup) return null;

  // Map to order format
  return {
    id: pickup.id,
    order_id: pickup.order_id || pickup.order?.[0]?.id || '',
    pickup_request_id: pickup.id,
    outlet_id: pickup.outlet?.id || '',
    outlet_admin_id: '',
    total_weight: pickup.order?.[0]?.total_weight || 0,
    price_total: pickup.order?.[0]?.price_total || 0,
    status: mapPickupStatusToOrderStatus(
      pickup.status,
      pickup.order?.[0]?.status,
      pickup.order?.[0]?.paid_at
    ),
    paid_at: pickup.order?.[0]?.paid_at || null,
    created_at:
      pickup.createdAt || pickup.created_at || pickup.order?.[0]?.created_at,
    updated_at:
      pickup.updatedAt || pickup.updated_at || pickup.order?.[0]?.updated_at,
    pickup_request: {
      id: pickup.id,
      customer_address: pickup.customer_address,
      created_at: pickup.createdAt || pickup.created_at,
    },
    order_item: pickup.order?.[0]?.order_item || [],
    driver_task: pickup.driver ? [{ driver: pickup.driver }] : [],
    payment: pickup.order?.[0]?.payment || [],
  };
};

function mapPickupStatusToOrderStatus(
  pickupStatus: string,
  currentOrderStatus?: string,
  paidAt?: string | null
): string {
  // If already paid, force status to PAID if it's currently lagging
  if (
    paidAt &&
    (currentOrderStatus === 'CREATED' ||
      currentOrderStatus === 'WAITING_PAYMENT' ||
      !currentOrderStatus)
  ) {
    return 'PAID';
  }
  if (currentOrderStatus && currentOrderStatus !== 'CREATED') {
    return currentOrderStatus;
  }

  const statusMapping: { [key: string]: string } = {
    WAITING_DRIVER: 'CREATED',
    DRIVER_ASSIGNED: 'CREATED',
    PICKED_UP: 'CREATED', // Still in driver's hands, so technically created/pickup phase
    ARRIVED_OUTLET: 'WAITING_PAYMENT', // Default next step if order status is still CREATED
    CANCELLED: 'CANCELLED',
  };
  return statusMapping[pickupStatus] || 'CREATED';
}

export const payOrder = async (orderId: string, paymentMethod: string) => {
  const response = await axiosInstance.post('/payments/create', {
    orderId,
    paymentMethod,
  });
  return response.data;
};

export const confirmOrder = async (orderId: string) => {
  const response = await axiosInstance.post(`/orders/${orderId}/confirm`);
  return response.data;
};

export interface OrderStats {
  all: number;
  ONGOING: number;
  DELIVERY: number;
  COMPLETED: number;
  CANCELLED: number;
}

export const getOrderStats = async (): Promise<{ data: OrderStats }> => {
  const { data } = await axiosInstance.get('/orders/stats');
  return data;
};
