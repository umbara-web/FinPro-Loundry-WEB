'use client';

import { AddressListSection } from '@/src/components/dashboard/address/address-list-section';
import { Address } from '@/src/types/address';
import { Plus, MapPin } from 'lucide-react';
import Link from 'next/link';

interface PickupAddressStepProps {
  selectedAddressId?: string;
  onSelect: (address: Address) => void;
}

export function PickupAddressStep({
  selectedAddressId,
  onSelect,
}: PickupAddressStepProps) {
  return (
    <section>
      <div className='mb-4 flex items-center gap-3'>
        <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
          <MapPin className='h-6 w-6' />
        </div>
        <h2 className='text-xl font-bold text-black dark:text-white'>
          1. Lokasi Penjemputan
        </h2>
      </div>

      <div className='space-y-4'>
        <AddressListSection
          showActions={false}
          onSelect={onSelect}
          selectedId={selectedAddressId}
          layout='grid'
        />

        <Link
          href='/dashboard/addresses'
          className='group flex min-h-14 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-transparent p-4 text-gray-500 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 dark:hover:text-blue-400'
        >
          <div className='flex items-center gap-2'>
            <div className='flex size-8 items-center justify-center rounded-full bg-slate-200 transition-transform group-hover:scale-110 dark:bg-slate-800'>
              <Plus className='h-4 w-4' />
            </div>
            <span className='text-sm font-medium'>
              Kelola Alamat / Tambah Baru
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
