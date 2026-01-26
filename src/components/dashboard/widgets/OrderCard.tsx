'use client';

import { Truck } from 'lucide-react';
import { getStatusConfig } from './active-orders-config';
import { ProgressSection } from './ProgressSection';

interface OrderCardProps {
  order: any;
}

export function OrderCard({ order }: OrderCardProps) {
  const config = getStatusConfig(order.status);
  const totalItems =
    order.order_item?.reduce((acc: number, item: any) => acc + item.qty, 0) ||
    0;

  return (
    <div className='dark:bg-surface-dark bg-surface-light rounded-xl border border-slate-200 p-6 shadow-sm transition-shadow hover:shadow-md dark:border-[#324d67]'>
      <OrderCardHeader order={order} config={config} totalItems={totalItems} />
      <ProgressSection config={config} />
      <DriverInfo config={config} />
    </div>
  );
}

function OrderCardHeader({
  order,
  config,
  totalItems,
}: {
  order: any;
  config: any;
  totalItems: number;
}) {
  return (
    <div className='mb-4 flex flex-col items-start justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center dark:border-[#324d67]'>
      <OrderDetails
        orderId={order.id}
        config={config}
        totalItems={totalItems}
        order={order}
      />
      <EstimatedTime createdAt={order.created_at} />
    </div>
  );
}

function OrderDetails({
  orderId,
  config,
  totalItems,
  order,
}: {
  orderId: string;
  config: any;
  totalItems: number;
  order: any;
}) {
  return (
    <div>
      <div className='mb-1 flex items-center gap-3'>
        <h4 className='text-lg font-bold text-slate-900 dark:text-white'>
          #{orderId.slice(0, 8)}
        </h4>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${config.colorClass}`}
        >
          {config.label}
        </span>
      </div>
      <p className='text-sm text-slate-500 dark:text-[#92adc9]'>
        {totalItems} Item • {order.total_weight || 0}kg • Rp{' '}
        {order.price_total?.toLocaleString('id-ID') || 0}
      </p>
    </div>
  );
}

function EstimatedTime({ createdAt }: { createdAt: string }) {
  const estimatedDate = new Date(
    new Date(createdAt).getTime() + 2 * 24 * 60 * 60 * 1000
  );
  return (
    <div className='text-right'>
      <p className='text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-[#92adc9]'>
        Estimasi Selesai
      </p>
      <p className='font-semibold text-slate-900 dark:text-white'>
        {estimatedDate.toLocaleDateString('id-ID', {
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  );
}

function DriverInfo({ config }: { config: any }) {
  if (config.step !== 1 && config.step !== 4) return null;
  const message =
    config.step === 1
      ? 'Menunggu kurir menjemput pesanan Anda.'
      : 'Kurir sedang mengantar pesanan ke lokasi Anda.';

  return (
    <div className='mt-4 flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-[#324d67] dark:bg-[#111a22]'>
      <Truck className={config.truckColor} />
      <p className='text-sm text-slate-600 dark:text-slate-300'>{message}</p>
    </div>
  );
}
