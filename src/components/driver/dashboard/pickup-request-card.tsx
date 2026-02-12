'use client';

import Link from 'next/link';
import { Package, Navigation, User, MapPin } from 'lucide-react';
import { AvailablePickupRequest } from '@/src/types/driver';

interface PickupRequestCardProps {
  pickup: AvailablePickupRequest;
  onAccept: (id: string) => void;
}

export function PickupRequestCard({
  pickup,
  onAccept,
}: PickupRequestCardProps) {
  return (
    <div className='flex flex-col gap-4 rounded-xl border border-transparent bg-[#182634] p-5 shadow-sm transition-all hover:border-[#0a7ff5]/50'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <div className='rounded-lg bg-orange-500/10 p-2'>
            <Package className='h-5 w-5 text-orange-500' />
          </div>
          <div>
            <p className='font-bold text-white'>
              Jemput - {pickup.notes || 'Laundry'}
            </p>
            <p className='text-xs text-[#8fadcc]'>
              #{pickup.id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
        {pickup.distance && (
          <div className='flex items-center gap-1 text-sm font-bold text-[#0a7ff5]'>
            <Navigation className='h-4 w-4' />
            {pickup.distance} km
          </div>
        )}
      </div>
      <div className='space-y-2'>
        <div className='flex items-center gap-2 text-sm text-[#8fadcc]'>
          <User className='h-4 w-4' />
          <span>{pickup.customer?.name || 'Pelanggan'}</span>
        </div>
        <div className='flex items-center gap-2 text-sm text-[#8fadcc]'>
          <MapPin className='h-4 w-4' />
          <span className='truncate'>
            {pickup.customer_address?.address || 'Alamat'}
          </span>
        </div>
      </div>
      <div className='flex gap-2 pt-2'>
        <button
          onClick={() => onAccept(pickup.id)}
          className='flex-1 rounded-lg bg-[#0a7ff5] py-2 text-sm font-bold text-white transition-colors hover:bg-[#0a7ff5]/90'
        >
          Terima Request
        </button>
        <Link
          href={`/driver-pickup/${pickup.id}`}
          className='rounded-lg bg-[#223649] px-3 py-2 text-sm font-bold text-white'
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
