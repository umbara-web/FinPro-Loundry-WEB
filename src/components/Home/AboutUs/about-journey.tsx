'use client';

import * as React from 'react';

export function AboutJourney() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='border-l-4 border-blue-500 pl-4'>
        <h2 className='text-[28px] leading-tight font-bold text-black dark:text-white'>
          Perjalanan Kami
        </h2>
        <p className='text-slate-500 dark:text-slate-400'>
          Dari ide sederhana di garasi hingga layanan di seluruh kota.
        </p>
      </div>
      <div className='relative ml-2 flex flex-col gap-8 md:ml-0'>
        {/* Timeline Line */}
        <div className='absolute top-2 bottom-2 left-4 w-0.5 bg-slate-200 md:left-1/2 md:-ml-0.5 dark:bg-slate-700' />
        {/* Milestone 1 */}
        <div className='relative flex flex-col items-start gap-6 md:flex-row md:items-center'>
          <div className='flex-1 md:pr-12 md:text-right'>
            <h3 className='text-xl font-bold text-black dark:text-white'>
              Didirikan di Bandung
            </h3>
            <p className='mb-1 font-bold text-blue-500'>2020</p>
            <p className='text-sm text-slate-500 dark:text-slate-400'>
              Fresh Laundry dimulai dengan misi sederhana: menyelesaikan masalah
              cucian bagi para profesional yang sibuk.
            </p>
          </div>
          <div className='absolute left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-blue-500 md:left-1/2 dark:border-slate-900' />
          <div className='hidden flex-1 md:block' /> {/* Spacer */}
        </div>
        {/* Milestone 2 */}
        <div className='relative flex flex-col items-start gap-6 md:flex-row md:items-center'>
          <div className='hidden flex-1 md:block' /> {/* Spacer */}
          <div className='absolute left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-blue-500 bg-white md:left-1/2 dark:bg-slate-800' />
          <div className='flex-1 pl-12 md:pl-12'>
            <h3 className='text-xl font-bold text-black dark:text-white'>
              Ekspansi & Peluncuran Aplikasi Website
            </h3>
            <p className='mb-1 font-bold text-blue-500'>2021</p>
            <p className='text-sm text-slate-500 dark:text-slate-400'>
              Kami meluncurkan aplikasi Website kami dan memperluas armada kami
              untuk mencakup kelima wilayah tersebut.
            </p>
          </div>
        </div>
        {/* Milestone 3 */}
        <div className='relative flex flex-col items-start gap-6 md:flex-row md:items-center'>
          <div className='flex-1 pl-12 md:pr-12 md:pl-0 md:text-right'>
            <h3 className='text-xl font-bold text-black dark:text-white'>
              1 Juta Laundry Telah Dibersihkan
            </h3>
            <p className='mb-1 font-bold text-blue-500'>2023</p>
            <p className='text-sm text-slate-500 dark:text-slate-400'>
              Sebuah pencapaian besar! Kami merayakannya dengan menyumbangkan
              10.000 kali pencucian ke tempat penampungan lokal.
            </p>
          </div>
          <div className='absolute left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-blue-500 bg-white md:left-1/2 dark:bg-slate-800' />
          <div className='hidden flex-1 md:block' /> {/* Spacer */}
        </div>
      </div>
    </div>
  );
}
