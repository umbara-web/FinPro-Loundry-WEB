'use client';

import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import { ActiveJob } from '@/src/types/driver';

interface ActiveJobCardProps {
  activeJob: ActiveJob;
}

export function ActiveJobCard({ activeJob }: ActiveJobCardProps) {
  return (
    <Link
      href={
        activeJob.type === 'PICKUP'
          ? `/driver-pickup/${activeJob.id}`
          : `/driver-delivery/${activeJob.id}`
      }
      className='flex items-stretch justify-between gap-4 rounded-xl border-l-4 border-blue-600 bg-white p-5 shadow-lg transition-all hover:bg-slate-50 dark:border-blue-500 dark:bg-slate-800 dark:hover:bg-slate-700'
    >
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
          <span className='rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase dark:bg-blue-500/20 dark:text-blue-500'>
            Sedang Berjalan
          </span>
          <span className='text-xs text-slate-500 dark:text-slate-400'>
            #{activeJob.orderNumber || activeJob.id.slice(-4)}
          </span>
        </div>
        <p className='text-lg font-bold text-slate-900 dark:text-white'>
          {activeJob.type === 'PICKUP' ? 'Jemput' : 'Antar'} -{' '}
          {activeJob.customer.name}
        </p>
        <div className='flex items-center gap-1 text-slate-500 dark:text-slate-400'>
          <MapPin className='h-4 w-4' />
          <p className='text-sm'>{activeJob.address.address}</p>
        </div>
        <div className='mt-1 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-500'>
          Lanjutkan Tugas
          <ChevronRight className='h-5 w-5' />
        </div>
      </div>
    </Link>
  );
}
