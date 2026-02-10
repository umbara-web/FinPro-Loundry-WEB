'use client';

import { QrCode } from 'lucide-react';

export function QRTrackingBanner() {
  return (
    <div className='mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl border border-blue-500/20 bg-linear-to-r from-blue-500/10 to-transparent p-6 md:flex-row md:gap-8 md:p-8'>
      <div className='flex flex-col items-center gap-6 sm:flex-row sm:gap-8'>
        {/* QR Icon */}
        <div className='shrink-0 rounded-2xl border border-blue-500/30 bg-blue-500/20 p-4 shadow-xl shadow-blue-500/5 md:p-5'>
          <QrCode className='h-10 w-10 text-blue-500 md:h-12 md:w-12' />
        </div>

        {/* Text Content */}
        <div className='text-center sm:text-left'>
          <h4 className='mb-2 text-lg font-bold text-slate-900 md:text-xl dark:text-white'>
            Lacak Pesanan Lebih Mudah
          </h4>
          <p className='max-w-lg text-sm leading-relaxed text-slate-500 dark:text-slate-400'>
            Setiap invoice digital kini dilengkapi dengan Kode QR untuk
            pelacakan status laundry secara instan melalui smartphone Anda.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button className='w-full cursor-pointer rounded-2xl bg-blue-500 px-6 py-3 text-sm font-bold whitespace-nowrap text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-600 active:scale-95 sm:w-auto md:px-8 md:py-3.5'>
        Pelajari Caranya
      </button>
    </div>
  );
}
