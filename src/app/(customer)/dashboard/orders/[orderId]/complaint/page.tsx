'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { ComplaintForm } from '@/src/components/dashboard/complaint';
import { getOrderDetail } from '@/src/lib/api/order-api';
import { getComplaintByOrderId } from '@/src/lib/api/complaint-api';
import { getComplaintTypeLabel } from '@/src/components/dashboard/complaint';
import Link from 'next/link';

export default function ComplaintPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);

  const { data: order, isLoading: isLoadingOrder } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetail(orderId),
  });

  const { data: existingComplaint, isLoading: isLoadingComplaint } = useQuery({
    queryKey: ['complaint', 'order', orderId],
    queryFn: () => getComplaintByOrderId(orderId),
  });

  const isLoading = isLoadingOrder || isLoadingComplaint;

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader2 className='text-primary h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (!order) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-4 p-8'>
        <p className='text-red-500'>Pesanan tidak ditemukan</p>
        <Link href='/dashboard/orders' className='text-primary hover:underline'>
          Kembali ke Daftar Pesanan
        </Link>
      </div>
    );
  }

  // Check if order is eligible for complaint
  const isEligible = ['DELIVERED', 'COMPLETED'].includes(order.status);

  if (!isEligible) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center'>
        <div className='text-6xl'>⚠️</div>
        <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
          Tidak Dapat Mengajukan Komplain
        </h1>
        <p className='max-w-md text-gray-500 dark:text-gray-400'>
          Komplain hanya dapat diajukan untuk pesanan yang sudah dikirim atau
          selesai. Status pesanan saat ini: <strong>{order.status}</strong>
        </p>
        <Link
          href={`/dashboard/orders/${orderId}`}
          className='text-primary hover:underline'
        >
          Kembali ke Detail Pesanan
        </Link>
      </div>
    );
  }

  // Check if already has active complaint
  if (
    existingComplaint &&
    ['OPEN', 'IN_REVIEW'].includes(existingComplaint.status)
  ) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center'>
        <div className='text-6xl'>📝</div>
        <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
          Komplain Sudah Ada
        </h1>
        <p className='max-w-md text-gray-500 dark:text-gray-400'>
          Anda sudah memiliki komplain aktif untuk pesanan ini.
        </p>
        <div className='rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Jenis:{' '}
            <strong>{getComplaintTypeLabel(existingComplaint.type)}</strong>
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Status: <strong>{existingComplaint.status}</strong>
          </p>
        </div>
        <Link
          href={`/dashboard/orders/${orderId}`}
          className='text-primary hover:underline'
        >
          Kembali ke Detail Pesanan
        </Link>
      </div>
    );
  }

  return (
    <div className='bg-background-light dark:bg-background-dark min-h-screen p-4 md:p-8'>
      <div className='mx-auto max-w-2xl'>
        <ComplaintForm orderId={orderId} orderNumber={order.id.slice(0, 8)} />
      </div>
    </div>
  );
}
