export interface DeliveryDetail {
  id: string;
  order_id: string;
  order: {
    id: string;
    order_number?: string;
    pickup_request?: {
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
    };
  };
  total_weight?: number;
  notes?: string;
  status: string;
  distance?: number;
}

export type DeliveryStep = 'IN_PROGRESS' | 'DONE';

export interface StepConfig {
  key: DeliveryStep;
  label: string;
  icon: React.ReactNode;
}
