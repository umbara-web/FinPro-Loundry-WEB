'use client';

import { Edit, Home, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@/src/context/WalletContext';

export function AddressWidget() {
  const { primaryAddress } = useWallet();

  return (
    <div className='dark:bg-lp-surface-dark bg-lp-surface-light overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-[#324d67]'>
      <AddressHeader />
      <MapPreview />
      <AddressContent address={primaryAddress} />
    </div>
  );
}

function AddressHeader() {
  return (
    <div className='flex items-center justify-between border-b border-slate-100 p-4 dark:border-[#324d67]'>
      <h3 className='text-base font-bold text-slate-900 dark:text-white'>
        Alamat Utama
      </h3>
      <Link
        href='/dashboard/addresses'
        className='hover:bg-primary/10 text-primary rounded p-1.5 transition-colors'
      >
        <Edit className='h-5 w-5' />
      </Link>
    </div>
  );
}

function MapPreview() {
  return (
    <div className='relative h-28 w-full overflow-hidden bg-slate-200'>
      <img
        alt='Map view'
        className='h-full w-full object-cover opacity-80'
        src='https://lh3.googleusercontent.com/aida-public/AB6AXuDJaunu3EO3fLMX7ygFpCWGSQ8bj-tNAJYe97wH4cTgN9g2yR1EfdVx0FmA4eKbHZE4QPQkizUBtS3N4NH7NZxX8Blzv5DDy9vbTy41ja18ahiqWbUapxmv2fLceyy8fcKwduduASXSFrMezgzOxgAaOCDjto-cW-lPNjWfa_QUjl4O7BnTR6PoW0I8RsQDfHRJ0hh-NNOSDsgjSdOE34lwtFSaoQIBm3UxtaG5oVzLLj_yHtMhbLmFdicIoE-lkdGYxkWRmoCgPvs'
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <MapPin className='h-9 w-9 fill-red-500 text-red-500 drop-shadow-lg' />
      </div>
    </div>
  );
}

interface Address {
  label: string;
  fullAddress: string;
  city: string;
  postalCode: string;
}

function AddressContent({ address }: { address: Address | null }) {
  if (!address) {
    return (
      <div className='p-4 text-center text-sm text-slate-500 dark:text-slate-400'>
        Belum ada alamat utama.
        <Link
          href='/dashboard/addresses'
          className='mt-2 block text-blue-500 hover:underline'
        >
          Atur Alamat
        </Link>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <div className='flex items-start gap-3'>
        <div className='rounded-lg bg-slate-100 p-2 text-slate-600 dark:bg-[#111a22] dark:text-slate-400'>
          <Home className='h-5 w-5' />
        </div>
        <div>
          <p className='text-sm font-bold text-slate-900 dark:text-white'>
            {address.label}
          </p>
          <p className='mt-1 text-xs leading-relaxed text-slate-500 dark:text-[#92adc9]'>
            {address.fullAddress}
            <br />
            {address.city}, {address.postalCode}
          </p>
        </div>
      </div>
    </div>
  );
}
