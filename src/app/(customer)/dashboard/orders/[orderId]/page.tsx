'use client';

import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getOrderDetail, confirmOrder } from '@/src/lib/api/order-api';
import { OrderStatusBadge } from '@/src/components/dashboard/orders/order-status-badge';
import { Order, OrderStatus } from '@/src/types/order';
import { OrderTimeline } from '@/src/components/dashboard/orders/order-timeline';
import { OrderItemsList } from '@/src/components/dashboard/orders/order-items-list';
import { OrderSummary } from '@/src/components/dashboard/orders/order-summary';
import { OrderShippingInfo } from '@/src/components/dashboard/orders/order-shipping-info';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { MdHelp } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import { Button } from '@/src/components/ui/button';

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const queryClient = useQueryClient();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetail(orderId),
  });

  const { mutate: confirm, isPending: isConfirming } = useMutation({
    mutationFn: () => {
      if (!order?.order_id) throw new Error('Order ID validation failed');
      return confirmOrder(order.order_id);
    },
    onSuccess: () => {
      toast.success('Pesanan berhasil dikonfirmasi');
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Gagal konfirmasi pesanan');
    },
  });

  if (isLoading)
    return <div className='p-8 text-center'>Loading details...</div>;
  if (error || !order)
    return (
      <div className='p-8 text-center text-red-500'>
        Gagal memuat detail pesanan.
      </div>
    );

  return (
    <div className='bg-background h-full overflow-y-auto p-4 md:p-8'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8'>
        {/* Header */}
        <header className='bg-background/80 border-border sticky top-0 z-10 flex items-center justify-between border-b px-2 py-6 backdrop-blur-md md:px-0 md:py-6'>
          <div className='flex items-center gap-6'>
            <Button
              onClick={() => window.history.back()}
              className='border-border flex size-10 cursor-pointer items-center justify-center rounded-xl border bg-slate-200 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700'
            >
              <FaArrowCircleLeft className='text-primary h-6 w-6 dark:text-white' />
            </Button>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-3'>
                <h1 className='text-2xl font-bold tracking-tight'>
                  Detail Pesanan #{order.id.slice(0, 8).toUpperCase()}
                </h1>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className='text-muted-foreground text-sm'>
                Dipesan pada{' '}
                {(() => {
                  const dateStr =
                    order.created_at ||
                    (order.pickup_request as any)?.created_at;
                  if (!dateStr) return '-';
                  const date = new Date(dateStr);
                  if (isNaN(date.getTime())) return '-';
                  return `${date.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })} • ${date.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })} WIB`;
                })()}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <Button
              variant='outline'
              className='border-border flex cursor-pointer items-center gap-2 rounded-lg border bg-slate-200 px-6 py-3 text-sm font-semibold transition-all hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700'
            >
              <MdHelp className='text-primary h-6 w-6 dark:text-white' />
              Bantuan
            </Button>
            <Button
              variant='default'
              className='flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-900'
            >
              <FiDownload className='h-6 w-6 text-white' />
              Unduh Invoice
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12'>
          {/* Left Column (Items & Summary) */}
          <div className='col-span-12 space-y-10 lg:col-span-8'>
            <OrderItemsList items={order.order_item} />

            {/* Summary Section (Internal Grid) */}
            <OrderSummary
              order={order as unknown as Order}
              isConfirming={isConfirming}
              onConfirm={() => confirm()}
            />
          </div>

          {/* Right Column (Timeline & Info) */}
          <div className='col-span-12 space-y-8 lg:col-span-4'>
            <OrderTimeline
              status={order.status}
              updatedAt={order.updated_at}
              createdAt={order.created_at}
            />
            <OrderShippingInfo order={order as unknown as Order} />
          </div>
        </div>
      </div>
    </div>
  );
}
