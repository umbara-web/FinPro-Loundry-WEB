'use client';

import { use } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getOrderDetail, confirmOrder } from '@/src/lib/api/order-api';
import Link from 'next/link';
import { OrderStatusBadge } from '@/src/components/dashboard/orders/order-status-badge';
import { OrderTimeline } from '@/src/components/dashboard/orders/order-timeline';
import { OrderItemsList } from '@/src/components/dashboard/orders/order-items-list';
import { OrderSummary } from '@/src/components/dashboard/orders/order-summary';

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
    mutationFn: () => confirmOrder(orderId),
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
    <div className='bg-background-light dark:bg-background-dark min-h-screen p-4 md:p-8'>
      <div className='mx-auto flex max-w-4xl flex-col gap-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <Link
              href='/customer/orders'
              className='text-primary mb-2 flex items-center gap-1 text-sm hover:underline'
            >
              <span className='material-symbols-outlined text-sm'>
                arrow_back
              </span>
              Kembali ke Pesanan
            </Link>
            <h1 className='text-2xl font-bold'>Detail Pesanan</h1>
            <p className='text-sm text-slate-500'>#{order.id.slice(0, 8)}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {/* Left: Detail Info */}
          <div className='flex flex-col gap-6 md:col-span-2'>
            <OrderTimeline
              status={order.status}
              updatedAt={order.updated_at}
              createdAt={order.created_at}
            />
            <OrderItemsList items={order.order_item} />
          </div>

          {/* Right: Actions & Summary */}
          <OrderSummary
            order={order}
            isConfirming={isConfirming}
            onConfirm={() => confirm()}
          />
        </div>
      </div>
    </div>
  );
}
