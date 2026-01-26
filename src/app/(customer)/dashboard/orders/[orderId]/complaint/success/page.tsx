'use client';

import { use } from 'react';
import Link from 'next/link';
import { CheckCircle, Home, FileText } from 'lucide-react';

export default function ComplaintSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);

  return (
    <div className='bg-background-light dark:bg-background-dark flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md text-center'>
        {/* Success Icon */}
        <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20'>
          <CheckCircle className='h-12 w-12 text-green-500' />
        </div>

        {/* Title */}
        <h1 className='mb-2 text-2xl font-black text-gray-900 dark:text-white'>
          Komplain Berhasil Dikirim!
        </h1>

        {/* Description */}
        <p className='mb-8 text-gray-500 dark:text-gray-400'>
          Terima kasih telah mengirimkan komplain. Tim kami akan segera
          memproses dan menghubungi Anda dalam 1-3 hari kerja.
        </p>

        {/* Info Card */}
        <div className='mb-8 rounded-xl border border-gray-200 bg-white p-4 text-left dark:border-gray-700 dark:bg-gray-800'>
          <h3 className='mb-3 font-bold text-gray-900 dark:text-white'>
            Langkah Selanjutnya:
          </h3>
          <ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
            <li className='flex items-start gap-2'>
              <span className='text-green-500'>✓</span>
              Tim kami akan mereview komplain Anda
            </li>
            <li className='flex items-start gap-2'>
              <span className='text-green-500'>✓</span>
              Anda akan dihubungi untuk konfirmasi jika diperlukan
            </li>
            <li className='flex items-start gap-2'>
              <span className='text-green-500'>✓</span>
              Notifikasi akan dikirim saat ada update
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col gap-3'>
          <Link
            href={`/customer/orders/${orderId}`}
            className='flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
          >
            <FileText className='h-5 w-5' />
            Lihat Detail Pesanan
          </Link>
          <Link
            href='/dashboard'
            className='bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white transition-colors'
          >
            <Home className='h-5 w-5' />
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
