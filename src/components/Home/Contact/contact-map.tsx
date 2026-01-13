'use client';

import { MapPin } from 'lucide-react';
import Image from 'next/image';

export function ContactMap() {
  return (
    <div className='relative flex h-75 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
      <Image
        src='https://lh3.googleusercontent.com/aida-public/AB6AXuB49VaS-NuswEXCD9sQdKZE15fwOne-0L0ZtCw8bGVB-zG375_C-Svp1Fvwq_PPlr4Cf0wT7wVB38ARN_nQVAA62iZoUZADdExt4N4Tq-SZKkvDHXr6ZBP1bV88A16D8XOImMpDFSbKY3NEmRygMMXsAI3OKvHsgDAXbvwYSTogCWYKYGxRwxHG064t64EKOyzPI8cwda0tdVSifEw1yMC6jCwJpkh9pugkGvgKDDpi10M814Owpjg9ZqzpfiOIqxNRiFNEfWshL1Y'
        alt='Map of service area covering greater metropolitan downtown'
        className='h-full w-full rounded-lg object-cover opacity-80'
        width={800}
        height={300}
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='flex flex-col items-center rounded-lg bg-white px-6 py-3 shadow-lg backdrop-blur-md dark:bg-slate-800/90'>
          <MapPin className='text-primary mb-1 text-3xl' />
          <p className='text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400'>
            Main Office
          </p>
          <p className='text-sm font-bold text-slate-900 dark:text-white'>
            123 Laundry Lane, Metro City
          </p>
        </div>
      </div>
      <div className='absolute right-4 bottom-4 left-4 rounded-lg border border-slate-200 bg-white/90 px-4 py-2 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/90'>
        <p className='text-center text-xs font-medium text-slate-600 dark:text-slate-300'>
          Serving the Greater Metro Area within 15 miles
        </p>
      </div>
    </div>
  );
}
