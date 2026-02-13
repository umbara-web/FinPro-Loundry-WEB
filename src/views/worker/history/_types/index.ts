export interface WorkerJobHistory {
  id: string;
  orderId: string;
  orderNumber: string;
  taskType: 'WASHING' | 'IRONING' | 'PACKING';
  customerName: string;
  itemCount: number;
  completedAt: string;
}

export interface DateRange {
  from: Date;
  to: Date;
}
