'use client';

import { use } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getOrderDetail } from '@/src/lib/api/order-api';
import { formatCurrency, formatDate } from '@/src/lib/utils/format';
import {
  MdCheckCircle,
  MdReceiptLong,
  MdPayments,
  MdSchedule,
  MdLocalShipping,
  MdHelp,
  MdDownload,
} from 'react-icons/md';

export default function PaymentSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetail(orderId),
  });

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='flex min-h-screen items-center justify-center text-red-500'>
        Order not found
      </div>
    );
  }

  return (
    <div className='bg-background-light dark:bg-background-dark font-display flex grow flex-col items-center justify-center p-4 py-12 text-[#111418] antialiased dark:text-white'>
      <div className='animate-fade-in flex w-full max-w-[600px] flex-col items-center'>
        {/* Success Icon */}
        <div className='group relative mb-6'>
          <div className='bg-primary/20 absolute inset-0 scale-75 rounded-full blur-xl transition-transform duration-500 group-hover:scale-110'></div>
          <div className='bg-surface-light dark:bg-surface-dark relative rounded-full p-2'>
            <div className='dark:bg-primary/20 flex items-center justify-center rounded-full bg-green-500/10 p-6'>
              <MdCheckCircle className='text-[64px] text-[#137fec]' />
            </div>
          </div>
        </div>

        {/* Headlines */}
        <div className='mb-8 px-4 text-center'>
          <h1 className='mb-3 text-3xl font-bold tracking-tight text-[#111418] md:text-4xl dark:text-white'>
            Pembayaran Berhasil!
          </h1>
          <p className='mx-auto max-w-[480px] text-base leading-relaxed text-[#637588] dark:text-[#93adc8]'>
            Terima kasih, pembayaran Anda untuk pesanan laundry telah kami
            terima. Kami akan segera memproses pesanan Anda.
          </p>
        </div>

        {/* Receipt Card */}
        <div className='bg-surface-light dark:bg-surface-dark mb-8 w-full overflow-hidden rounded-xl border border-[#e5e7eb] shadow-lg dark:border-[#2a3b4d]'>
          {/* Header of Receipt */}
          <div className='flex flex-col items-center border-b border-[#e5e7eb] bg-[#f8f9fa] p-6 dark:border-[#2a3b4d] dark:bg-[#15202b]'>
            <span className='mb-2 text-sm font-medium tracking-wider text-[#637588] uppercase dark:text-[#93adc8]'>
              Total Pembayaran
            </span>
            <h2 className='text-primary text-4xl font-bold tracking-tight dark:text-white'>
              {formatCurrency(order.price_total)}
            </h2>
          </div>

          {/* Details List */}
          <div className='space-y-5 p-6'>
            <div className='group flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-[#f0f2f4] p-2 text-[#637588] dark:bg-[#233648] dark:text-[#93adc8]'>
                  <MdReceiptLong className='text-[20px]' />
                </div>
                <span className='font-medium text-[#637588] dark:text-[#93adc8]'>
                  ID Pesanan
                </span>
              </div>
              <span className='text-primary font-mono font-semibold dark:text-white'>
                #
                {order.order_id?.slice(0, 8) ||
                  order.pickup_request_id.slice(0, 8)}
              </span>
            </div>

            <div className='group flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-[#f0f2f4] p-2 text-[#637588] dark:bg-[#233648] dark:text-[#93adc8]'>
                  <MdPayments className='text-[20px]' />
                </div>
                <span className='font-medium text-[#637588] dark:text-[#93adc8]'>
                  Metode
                </span>
              </div>
              <span className='text-primary font-semibold dark:text-white'>
                {order.payment && order.payment[0] && order.payment[0].method
                  ? order.payment[0].method.replace(/_/g, ' ')
                  : 'QRIS (Gopay)'}
              </span>
            </div>

            <div className='group flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-[#f0f2f4] p-2 text-[#637588] dark:bg-[#233648] dark:text-[#93adc8]'>
                  <MdSchedule className='text-[20px]' />
                </div>
                <span className='font-medium text-[#637588] dark:text-[#93adc8]'>
                  Waktu
                </span>
              </div>
              <span className='text-primary font-semibold dark:text-white'>
                {formatDate(order.created_at)}
              </span>
            </div>
          </div>

          {/* Dashed Divider */}
          <div className='relative my-1 h-px w-full'>
            <div className='absolute top-0 left-0 h-full w-full border-t border-dashed border-[#e5e7eb] dark:border-[#2a3b4d]'></div>
            <div className='bg-background-light dark:bg-background-dark absolute -top-3 -left-3 size-6 rounded-full'></div>
            <div className='bg-background-light dark:bg-background-dark absolute -top-3 -right-3 size-6 rounded-full'></div>
          </div>

          {/* Footer of Receipt */}
          <div className='flex items-center justify-between p-6 pt-4 text-xs text-[#637588] dark:text-[#93adc8]'>
            <span>
              Status:{' '}
              <span className='ml-1 font-bold text-green-500'>LUNAS</span>
            </span>
            <button className='hover:text-primary flex items-center gap-1 transition-colors'>
              Unduh Invoice
              <MdDownload className='text-[14px]' />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className='flex w-full flex-col gap-3'>
          <Link
            href={`/dashboard/orders/${orderId}`}
            className='bg-primary flex h-12 w-full items-center justify-center gap-2 rounded-lg text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#0f67be]'
          >
            <MdLocalShipping className='text-[20px]' />
            Lacak Pesanan
          </Link>
          <Link
            href='/dashboard'
            className='text-primary flex h-12 w-full items-center justify-center rounded-lg border border-[#dce0e5] bg-transparent text-sm font-bold tracking-wide transition-colors hover:bg-[#e5e7eb] dark:border-[#2a3b4d] dark:text-white dark:hover:bg-[#233648]'
          >
            Kembali ke Beranda
          </Link>
        </div>

        {/* Help Link */}
        <div className='mt-8'>
          <a
            href='#'
            className='text-primary hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors dark:text-[#93adc8]'
          >
            <MdHelp className='text-[18px]' />
            Butuh bantuan dengan pesanan ini?
          </a>
        </div>
      </div>
    </div>
  );
}
