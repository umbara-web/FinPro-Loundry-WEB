import { api as axiosInstance } from './axios-instance';

export interface Payment {
  id: string;
  order_id: string;
  method?: string;
  amount?: number;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED' | 'REFUNDED';
  payment_ref?: string;
  paid_at?: string;
  payment_img_url?: string;
  created_at: string;
  updated_at: string;
  order: {
    id: string;
    pickup_request: {
      id: string;
      customer_address: {
        address: string;
        city: string;
      };
    };
  };
}

export interface PaymentListResponse {
  data: Payment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaymentQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export const getPayments = async (
  params: PaymentQueryParams
): Promise<PaymentListResponse> => {
  const { data } = await axiosInstance.get('/payments', { params });
  return data;
};

export interface PaymentStats {
  all: number;
  PENDING: number;
  PAID: number;
  FAILED_GROUP: number;
}

export const getPaymentStats = async (): Promise<{ data: PaymentStats }> => {
  const { data } = await axiosInstance.get('/payments/stats');
  return data;
};
