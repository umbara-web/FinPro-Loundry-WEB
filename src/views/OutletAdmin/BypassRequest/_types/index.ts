export interface BypassRequestItem {
  id: string;
  name: string;
  qty: number;
  expectedQty: number;
}

export interface BypassRequest {
  id: string;
  taskId: string;
  workerName: string;
  workerAvatar?: string;
  station: 'WASHING' | 'IRONING' | 'PACKING';
  reason: string;
  createdAt: string;
  items: BypassRequestItem[];
}

export interface BypassRequestResponse {
  data: BypassRequest[];
}

export interface BypassActionResponse {
  message: string;
}
