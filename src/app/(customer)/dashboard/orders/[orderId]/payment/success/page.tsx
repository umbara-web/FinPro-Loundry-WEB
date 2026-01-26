'use client';

import { use } from 'react';
import Link from 'next/link';

export default function PaymentSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  return (
    <div className='bg-background-light dark:bg-background-dark flex min-h-screen items-center justify-center p-4'>
      <div className='dark:bg-surface-dark w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-700'>
        <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20'>
          <span className='material-symbols-outlined text-4xl text-green-600'>
            check_circle
          </span>
        </div>

        <h1 className='mb-2 text-2xl font-bold'>Pembayaran Berhasil!</h1>
        <p className='mb-8 text-slate-500 dark:text-slate-400'>
          Terima kasih, pembayaran Anda untuk pesanan telah kami terima.
        </p>

        <div className='flex flex-col gap-3'>
          <Link
            href={`/customer/orders/${orderId}`}
            className='bg-primary hover:bg-primary/90 w-full rounded-lg py-3 font-bold text-white'
          >
            Lihat Detail Pesanan
          </Link>
          <Link
            href='/customer/dashboard'
            className='w-full rounded-lg bg-slate-100 py-3 font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
