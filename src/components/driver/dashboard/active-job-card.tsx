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
      className='flex items-stretch justify-between gap-4 rounded-xl border-l-4 border-[#0a7ff5] bg-[#182634] p-5 shadow-lg transition-all hover:bg-[#1d2d3d]'
    >
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
          <span className='rounded-full bg-[#0a7ff5]/20 px-2 py-0.5 text-[10px] font-bold text-[#0a7ff5] uppercase'>
            Sedang Berjalan
          </span>
          <span className='text-xs text-[#8fadcc]'>
            #{activeJob.orderNumber || activeJob.id.slice(-4)}
          </span>
        </div>
        <p className='text-lg font-bold text-white'>
          {activeJob.type === 'PICKUP' ? 'Jemput' : 'Antar'} -{' '}
          {activeJob.customer.name}
        </p>
        <div className='flex items-center gap-1 text-[#8fadcc]'>
          <MapPin className='h-4 w-4' />
          <p className='text-sm'>{activeJob.address.address}</p>
        </div>
        <div className='mt-1 flex items-center gap-2 text-sm font-bold text-[#0a7ff5]'>
          Lanjutkan Tugas
          <ChevronRight className='h-5 w-5' />
        </div>
      </div>
    </Link>
  );
}
