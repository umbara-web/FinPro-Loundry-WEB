import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PickupDetailHeaderProps {
  pickupId: string;
}

export const PickupDetailHeader = ({ pickupId }: PickupDetailHeaderProps) => {
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-10 dark:border-slate-800 dark:bg-[#101922]'>
      <div className='flex items-center gap-4'>
        <Link
          href='/driver-dashboard'
          className='flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        >
          <ArrowLeft className='h-5 w-5' />
          <span className='text-sm font-medium'>Dashboard</span>
        </Link>
        <div className='mx-2 h-4 w-px bg-slate-200 dark:bg-slate-700' />
        <h2 className='text-lg font-bold text-slate-900 dark:text-white'>
          Pickup #{pickupId.slice(-4).toUpperCase()}
        </h2>
      </div>
    </header>
  );
};
