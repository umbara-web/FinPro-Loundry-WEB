import Link from 'next/link';
import { Package, MapPin, User, Navigation } from 'lucide-react';
import { AvailablePickupRequest } from '@/src/types/driver';

interface PickupCardProps {
  pickup: AvailablePickupRequest;
  onAccept: (id: string) => void;
}

export const PickupCard = ({ pickup, onAccept }: PickupCardProps) => {
  return (
    <div className='flex flex-col gap-4 rounded-xl border border-transparent bg-white p-5 shadow-sm transition-all hover:border-blue-500/50 dark:bg-slate-800'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <div className='rounded-lg bg-orange-100 p-3 dark:bg-orange-500/10'>
            <Package className='h-6 w-6 text-orange-600 dark:text-orange-500' />
          </div>
          <div>
            <p className='text-lg font-bold text-slate-900 dark:text-white'>
              Jemput - {pickup.notes || 'Laundry'}
            </p>
            <p className='text-sm text-slate-500 dark:text-slate-400'>
              #{pickup.id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
        {pickup.distance && (
          <div className='flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-500'>
            <Navigation className='h-4 w-4' />
            {pickup.distance} km
          </div>
        )}
      </div>

      <div className='space-y-2'>
        <div className='flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400'>
          <User className='h-4 w-4' />
          <span>{pickup.customer?.name || 'Pelanggan'}</span>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400'>
          <MapPin className='h-4 w-4' />
          <span>{pickup.customer_address?.address || 'Alamat'}</span>
        </div>
      </div>

      <div className='flex gap-2 pt-2'>
        <button
          onClick={() => onAccept(pickup.id)}
          className='flex-1 rounded-lg bg-blue-600 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500'
        >
          Terima Request
        </button>
        <Link
          href={`/driver-pickup/${pickup.id}`}
          className='rounded-lg bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
        >
          Detail
        </Link>
      </div>
    </div>
  );
};
