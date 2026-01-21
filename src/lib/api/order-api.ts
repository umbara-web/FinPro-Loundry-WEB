import { api as axiosInstance } from './axios-instance';
import { OrderListResponse, OrderQueryParams } from '@/src/types/order';

export const getOrders = async (
  params: OrderQueryParams
): Promise<OrderListResponse> => {
  const { data } = await axiosInstance.get('/orders', { params });
  return data;
};

export const getOrderDetail = async (orderId: string) => {
  const { data } = await axiosInstance.get('/orders', {
    params: { search: orderId },
  });
  if (data && data.data && data.data.length > 0) {
    return data.data[0];
  }
  return null;
};

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
