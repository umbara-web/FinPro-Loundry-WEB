'use client';

import Link from 'next/link';

export function AboutCTA() {
  return (
    <div className='w-full bg-slate-100 px-4 py-20 dark:bg-slate-900'>
      <div className='mx-auto flex max-w-240 flex-col items-center justify-between gap-8 rounded-2xl bg-blue-500 p-10 text-white shadow-lg md:flex-row'>
        <div className='flex max-w-lg flex-col gap-2'>
          <h2 className='text-3xl font-black tracking-tight'>
            Siap memulai babak baru?
          </h2>
          <p className='text-lg text-blue-100'>
            Bergabunglah dengan ribuan pelanggan yang puas dan dapatkan diskon
            10% untuk pesanan pertama Anda.
          </p>
        </div>
        <Link href='/auth/login'>
          <button className='cursor-pointer rounded-lg bg-white px-8 py-4 text-base font-bold whitespace-nowrap text-blue-500 shadow-sm transition-colors hover:scale-105 hover:bg-slate-300'>
            Jadwalkan Penjemputan Pertama
          </button>
        </Link>
      </div>
    </div>
  );
}
